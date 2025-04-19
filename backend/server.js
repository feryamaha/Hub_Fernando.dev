require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const axios = require('axios');
const winston = require('winston');
const apiKeyManager = require('./services/apiKeyManager');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

const app = express();
const port = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 900000,
  max: process.env.RATE_LIMIT_MAX_REQUESTS || 100,
  message: { error: 'Muitas requisições, por favor tente novamente mais tarde.' }
});
app.use(limiter);

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info('Requisição HTTP', {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration,
      ip: req.ip,
      userAgent: req.get('user-agent')
    });
  });
  next();
});

app.get('/api/search', async (req, res) => {
  try {
    const { query, type } = req.query;
    console.log('Recebida requisição:', { query, type });
    if (!query || !type) return res.status(400).json({ error: 'Parâmetros query e type são obrigatórios' });
    if (!['google', 'youtube'].includes(type)) return res.status(400).json({ error: 'Tipo de busca inválido' });

    const apiKeyData = await apiKeyManager.getApiKey(type);
    console.log('Chave API usada:', apiKeyData.key, 'Service:', type, 'CX:', apiKeyData.cx);

    let results;
    if (type === 'google') {
      results = await searchGoogle(query, apiKeyData.key, apiKeyData.cx);
    } else {
      results = await searchYouTube(query, apiKeyData.key);
    }

    await apiKeyManager.logApiUsage(
      apiKeyData.id,
      `/api/search?type=${type}`,
      res.statusCode,
      Date.now() - req.startTime,
      { query, type },
      { resultsCount: results.length },
      req.ip,
      req.get('user-agent')
    );

    res.json(results);
  } catch (error) {
    console.error('Erro na busca:', { message: error.message, apiError: error.response?.data, service: req.query.type });
    res.status(500).json({ error: 'Erro ao realizar a busca', details: process.env.NODE_ENV === 'development' ? (error.response?.data || error.message) : undefined });
  }
});

async function searchGoogle(query, apiKey, cx) {
  console.log('Parâmetros Google:', { key: apiKey, cx, query });
  try {
    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: { key: apiKey, cx, q: query, num: 10 }
    });
    return response.data.items.map(item => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
      type: 'webpage'
    }));
  } catch (error) {
    console.error('Erro Google:', error.response?.data || error.message);
    throw error;
  }
}

async function searchYouTube(query, apiKey) {
  console.log('Parâmetros YouTube:', { key: apiKey, query });
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: { key: apiKey, part: 'snippet', maxResults: 10, type: 'video', q: query }
    });
    return response.data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      channel: item.snippet.channelTitle,
      timestamp: item.snippet.publishedAt,
      thumbnail: item.snippet.thumbnails?.high?.url,
      type: 'video'
    }));
  } catch (error) {
    console.error('Erro YouTube:', error.response?.data || error.message);
    throw error;
  }
}

async function startServer() {
  try {
    await apiKeyManager.initialize();
    app.listen(port, () => {
      logger.info(`Servidor rodando na porta ${port}`);
      console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    logger.error('Erro ao iniciar o servidor:', error.message);
    process.exit(1);
  }
}

startServer();
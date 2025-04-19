const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configuração da API do YouTube
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

// Validação da API key
const validateApiKey = () => {
  if (!YOUTUBE_API_KEY) {
    throw new Error('A chave da API do YouTube não está configurada no servidor.');
  }
  
  const keyFormat = /^[A-Za-z0-9_-]{39}$/;
  if (!keyFormat.test(YOUTUBE_API_KEY)) {
    throw new Error('O formato da chave da API do YouTube é inválido.');
  }
};

// Rota de busca de vídeos
app.get('/api/youtube/search', async (req, res) => {
  try {
    validateApiKey();
    
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Parâmetro de busca não fornecido' });
    }

    const searchParams = new URLSearchParams({
      part: 'snippet',
      maxResults: 10,
      type: 'video',
      key: YOUTUBE_API_KEY,
      q: q.trim(),
    });

    const response = await axios.get(`${YOUTUBE_API_URL}/search?${searchParams}`);
    res.json(response.data);
  } catch (error) {
    console.error('Erro na busca de vídeos:', error);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.error?.message || 'Erro ao buscar vídeos'
    });
  }
});

// Rota para detalhes dos vídeos
app.get('/api/youtube/videos', async (req, res) => {
  try {
    validateApiKey();
    
    const { ids } = req.query;
    if (!ids) {
      return res.status(400).json({ error: 'IDs dos vídeos não fornecidos' });
    }

    const params = new URLSearchParams({
      part: 'snippet,contentDetails,statistics',
      id: ids,
      key: YOUTUBE_API_KEY,
    });

    const response = await axios.get(`${YOUTUBE_API_URL}/videos?${params}`);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar detalhes dos vídeos:', error);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.error?.message || 'Erro ao buscar detalhes dos vídeos'
    });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
}); 
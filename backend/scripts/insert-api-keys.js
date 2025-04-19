// Arquivo: backend/scripts/insert-api-keys.js

require('dotenv').config();
const { Pool } = require('pg');
const winston = require('winston');

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

async function insertApiKeys() {
  const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    ssl: { rejectUnauthorized: false }
  });

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Limpar chaves existentes
    await client.query('DELETE FROM api_management.api_keys WHERE service IN ($1, $2)', ['google', 'youtube']);
    logger.info('Chaves existentes removidas');

    // Inserir chave do Google
    if (process.env.GOOGLE_API_KEY) {
      const result = await client.query(
        `INSERT INTO api_management.api_keys 
        (service, key_encrypted, quota_limit, cx, metadata) 
        VALUES ($1, api_management.encrypt_key($2, $3), $4, $5, $6)
        RETURNING id`,
        [
          'google',
          process.env.GOOGLE_API_KEY,
          process.env.ENCRYPTION_KEY,
          100,
          process.env.GOOGLE_SEARCH_ENGINE_ID,
          { search_engine_id: process.env.GOOGLE_SEARCH_ENGINE_ID }
        ]
      );
      await client.query(
        `INSERT INTO api_management.api_quotas 
        (api_key_id, quota_type, quota_limit, reset_time, period)
        VALUES ($1, 'daily', $2, CURRENT_DATE + interval '1 day', 'daily')`,
        [result.rows[0].id, 100]
      );
      logger.info('Chave do Google inserida com sucesso');
    }

    // Inserir chave do YouTube
    if (process.env.YOUTUBE_API_KEY) {
      const result = await client.query(
        `INSERT INTO api_management.api_keys 
        (service, key_encrypted, quota_limit, cx, metadata) 
        VALUES ($1, api_management.encrypt_key($2, $3), $4, $5, $6)
        RETURNING id`,
        ['youtube', process.env.YOUTUBE_API_KEY, process.env.ENCRYPTION_KEY, 10000, null, {}]
      );
      await client.query(
        `INSERT INTO api_management.api_quotas 
        (api_key_id, quota_type, quota_limit, reset_time, period)
        VALUES ($1, 'daily', $2, CURRENT_DATE + interval '1 day', 'daily')`,
        [result.rows[0].id, 10000]
      );
      logger.info('Chave do YouTube inserida com sucesso');
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Erro ao inserir chaves API', { error: error.message });
    throw error;
  } finally {
    client.release();
    pool.end();
  }
}

insertApiKeys().catch(error => {
  console.error('Erro:', error.message);
  process.exit(1);
});
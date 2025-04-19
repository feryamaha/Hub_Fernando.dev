// Arquivo: backend/config/database.js

const { Pool } = require('pg');
const winston = require('winston');

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  ssl: { rejectUnauthorized: false } // Para Neon
});

pool.connect((err, client, release) => {
  if (err) {
    winston.error('Erro ao conectar ao PostgreSQL', { error: err.message });
    process.exit(1);
  }
  winston.info('Conexão com PostgreSQL estabelecida');
  release();
});

module.exports = pool;
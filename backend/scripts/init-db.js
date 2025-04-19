// Arquivo: backend/scripts/init-db.js
require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
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

async function initializeDatabase() {
  const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: 'postgres',
    ssl: { rejectUnauthorized: false }
  });

  const client = await pool.connect();
  try {
    await client.query('CREATE DATABASE whff_db');
    logger.info('Banco de dados whff_db criado com sucesso');
  } catch (error) {
    if (error.code === '42P04') {
      logger.info('Banco de dados whff_db já existe');
    } else {
      logger.error('Erro ao criar banco de dados', { error: error.message });
      throw error;
    }
  } finally {
    client.release();
  }

  const dbPool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: 'whff_db',
    ssl: { rejectUnauthorized: false }
  });

  const dbClient = await dbPool.connect();
  try {
    const sqlScript = fs.readFileSync(path.join(__dirname, '../config/database.sql'), 'utf8');
    await dbClient.query(sqlScript);
    logger.info('Script SQL executado com sucesso');

    await dbClient.query(
      `DO $$ 
      BEGIN
        IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'whff_user') THEN
          CREATE USER whff_user WITH PASSWORD '${process.env.POSTGRES_PASSWORD}';
        END IF;
      END
      $$;`
    );
    logger.info('Usuário whff_user criado/verificado com sucesso');

    await dbClient.query('GRANT ALL PRIVILEGES ON SCHEMA api_management TO whff_user;');
    await dbClient.query('GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA api_management TO whff_user;');
    await dbClient.query('GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA api_management TO whff_user;');
  } catch (error) {
    logger.error('Erro ao executar script SQL', { error: error.message });
    throw error;
  } finally {
    dbClient.release();
    dbPool.end();
  }
}

async function main() {
  try {
    await initializeDatabase();
    logger.info('Inicialização do banco de dados concluída com sucesso');
    process.exit(0);
  } catch (error) {
    logger.error('Erro na inicialização', { error: error.message });
    process.exit(1);
  }
}

main();
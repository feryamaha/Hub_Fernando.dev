-- Arquivo: backend/config/database.sql

-- Criar banco de dados
CREATE DATABASE whff_db;

-- Conectar ao banco
\c whff_db;

-- Criar extensão para criptografia
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Criar schema para APIs
CREATE SCHEMA api_management;

-- Tabela para armazenamento seguro das chaves
CREATE TABLE api_management.api_keys (
    id SERIAL PRIMARY KEY,
    service VARCHAR(50) NOT NULL,
    key_encrypted TEXT NOT NULL,
    key_version INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_used TIMESTAMP,
    usage_count INTEGER DEFAULT 0,
    quota_limit INTEGER NOT NULL,
    quota_used INTEGER DEFAULT 0,
    rotation_interval INTEGER DEFAULT 30, -- dias
    next_rotation_date TIMESTAMP,
    metadata JSONB
);

-- Tabela para log de uso
CREATE TABLE api_management.api_usage_log (
    id SERIAL PRIMARY KEY,
    api_key_id INTEGER REFERENCES api_management.api_keys(id),
    endpoint VARCHAR(255) NOT NULL,
    status_code INTEGER NOT NULL,
    response_time INTEGER NOT NULL,
    request_body JSONB,
    response_body JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para monitoramento de quotas
CREATE TABLE api_management.api_quotas (
    id SERIAL PRIMARY KEY,
    api_key_id INTEGER REFERENCES api_management.api_keys(id),
    quota_type VARCHAR(50) NOT NULL,
    quota_limit INTEGER NOT NULL,
    quota_used INTEGER DEFAULT 0,
    reset_time TIMESTAMP NOT NULL,
    period VARCHAR(20) NOT NULL -- 'daily', 'monthly', etc
);

-- Tabela para histórico de rotação de chaves
CREATE TABLE api_management.key_rotation_history (
    id SERIAL PRIMARY KEY,
    api_key_id INTEGER REFERENCES api_management.api_keys(id),
    old_key_encrypted TEXT,
    new_key_encrypted TEXT,
    rotated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reason VARCHAR(255)
);

-- Função para criptografar chaves
CREATE OR REPLACE FUNCTION api_management.encrypt_key(key_text TEXT, encryption_key TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN pgp_sym_encrypt(key_text, encryption_key);
END;
$$ LANGUAGE plpgsql;

-- Função para descriptografar chaves
CREATE OR REPLACE FUNCTION api_management.decrypt_key(encrypted_key TEXT, encryption_key TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN pgp_sym_decrypt(encrypted_key::bytea, encryption_key);
END;
$$ LANGUAGE plpgsql;

-- Função para verificar quota
CREATE OR REPLACE FUNCTION api_management.check_quota(api_key_id INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
    quota_limit INTEGER;
    quota_used INTEGER;
BEGIN
    SELECT quota_limit, quota_used INTO quota_limit, quota_used
    FROM api_management.api_keys
    WHERE id = api_key_id;
    
    RETURN quota_used < quota_limit;
END;
$$ LANGUAGE plpgsql;

-- Função para atualizar uso
CREATE OR REPLACE FUNCTION api_management.update_usage(api_key_id INTEGER)
RETURNS VOID AS $$
BEGIN
    UPDATE api_management.api_keys
    SET 
        usage_count = usage_count + 1,
        quota_used = quota_used + 1,
        last_used = CURRENT_TIMESTAMP
    WHERE id = api_key_id;
END;
$$ LANGUAGE plpgsql;

-- Índices para performance
CREATE INDEX idx_api_keys_service ON api_management.api_keys(service);
CREATE INDEX idx_api_usage_log_api_key_id ON api_management.api_usage_log(api_key_id);
CREATE INDEX idx_api_usage_log_created_at ON api_management.api_usage_log(created_at);
CREATE INDEX idx_api_quotas_api_key_id ON api_management.api_quotas(api_key_id);

-- Permissões
GRANT USAGE ON SCHEMA api_management TO whff_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA api_management TO whff_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA api_management TO whff_user; 
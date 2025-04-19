const { Pool } = require('pg');
const winston = require('winston');

class ApiKeyManager {
    constructor() {
        this.pool = new Pool({
            host: process.env.POSTGRES_HOST,
            port: process.env.POSTGRES_PORT,
            database: process.env.POSTGRES_DB,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            ssl: { rejectUnauthorized: false }
        });
        this.encryptionKey = process.env.ENCRYPTION_KEY;
        if (!this.encryptionKey) {
            throw new Error('ENCRYPTION_KEY não definida no .env');
        }
    }

    async initialize() {
        try {
            await this.pool.query('SELECT 1');
            winston.info('Conexão com PostgreSQL estabelecida para ApiKeyManager');
        } catch (error) {
            winston.error('Erro ao conectar ao PostgreSQL', { error: error.message });
            throw error;
        }
    }

    async addApiKey(service, key, quotaLimit, cx = null, metadata = {}) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            const encryptedKey = await client.query(
                'SELECT api_management.encrypt_key($1, $2) as encrypted_key',
                [key, this.encryptionKey]
            );
            const result = await client.query(
                `INSERT INTO api_management.api_keys 
        (service, key_encrypted, quota_limit, cx, metadata, next_rotation_date) 
        VALUES ($1, $2, $3, $4, $5, CURRENT_DATE + interval '30 days')
        RETURNING id`,
                [service, encryptedKey.rows[0].encrypted_key, quotaLimit, cx, metadata]
            );
            await client.query(
                `INSERT INTO api_management.api_quotas 
        (api_key_id, quota_type, quota_limit, reset_time, period)
        VALUES ($1, 'daily', $2, CURRENT_DATE + interval '1 day', 'daily')`,
                [result.rows[0].id, quotaLimit]
            );
            await client.query('COMMIT');
            return result.rows[0].id;
        } catch (error) {
            await client.query('ROLLBACK');
            winston.error('Erro ao adicionar chave API', { error: error.message });
            throw error;
        } finally {
            client.release();
        }
    }

    async getApiKey(service) {
        const client = await this.pool.connect();
        try {
            const result = await client.query(
                `SELECT id, key_encrypted, quota_limit, quota_used, cx 
        FROM api_management.api_keys 
        WHERE service = $1 AND is_active = true 
        ORDER BY last_used ASC LIMIT 1`,
                [service]
            );
            if (result.rows.length === 0) {
                throw new Error(`Nenhuma chave ativa encontrada para o serviço: ${service}`);
            }
            const hasQuota = await this.checkQuota(result.rows[0].id);
            if (!hasQuota) {
                throw new Error('Quota excedida para esta chave');
            }
            const decryptedKey = await client.query(
                'SELECT api_management.decrypt_key($1, $2) as decrypted_key',
                [result.rows[0].key_encrypted, this.encryptionKey]
            );
            await this.updateUsage(result.rows[0].id);
            return {
                id: result.rows[0].id,
                key: decryptedKey.rows[0].decrypted_key,
                cx: result.rows[0].cx,
                quota: {
                    limit: result.rows[0].quota_limit,
                    used: result.rows[0].quota_used
                }
            };
        } catch (error) {
            winston.error('Erro ao obter chave API', { error: error.message });
            throw error;
        } finally {
            client.release();
        }
    }

    async checkQuota(apiKeyId) {
        const result = await this.pool.query(
            'SELECT api_management.check_quota($1) as has_quota',
            [apiKeyId]
        );
        return result.rows[0].has_quota;
    }

    async updateUsage(apiKeyId) {
        await this.pool.query('SELECT api_management.update_usage($1)', [apiKeyId]);
    }

    async logApiUsage(apiKeyId, endpoint, statusCode, responseTime, requestBody, responseBody, ip, userAgent) {
        await this.pool.query(
            `INSERT INTO api_management.api_usage_log 
      (api_key_id, endpoint, status_code, response_time, request_body, response_body, ip_address, user_agent)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [apiKeyId, endpoint, statusCode, responseTime, requestBody, responseBody, ip, userAgent]
        );
    }
}

module.exports = new ApiKeyManager();
import dotenv from 'dotenv';
import pg from 'pg';
import { fileURLToPath } from 'node:url';

dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)), quiet: true });

pg.types.setTypeParser(1082, (value) => value);

export const db = new pg.Pool({
  connectionString:
    process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/spendwise',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: true } : false,
  connectionTimeoutMillis: 5000,
});
db.on('error', (error) => console.error('Database connection error:', error.message));

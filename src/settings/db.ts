import dotenv from 'dotenv';
import pg from 'pg';
const { Pool } = pg;

dotenv.config();

const pool = new Pool ({
  connectionString: process.env.PGURL,
  port: parseInt(process.env.PGPORT || '5432'),
  ssl: {
    rejectUnauthorized: true,
  },
});

export default pool;
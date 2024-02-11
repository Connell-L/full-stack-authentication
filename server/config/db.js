import { configDotenv } from 'dotenv';
import pkg from 'pg';

const { Pool } = pkg;

configDotenv();

const {
  DB_USER,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  NODE_ENV,
  DATABASE_URL,
} = process.env;

const isProduction = NODE_ENV === 'production';

const connectionString = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

// Create a new [Pool](https://node-postgres.com/api/pool) instance
export const pool = new Pool({
  connectionString: isProduction ? DATABASE_URL : connectionString,
});

export const connectDb = async () => {
  try {
    const client = await pool.connect();
    console.log('Database connected');
    client.release();
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
};

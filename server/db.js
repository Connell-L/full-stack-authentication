const pkg = require('pg');
const { configDotenv } = require('dotenv');

configDotenv();

const { Pool } = pkg;

const { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, NODE_ENV, DATABASE_URL } = process.env;

const isProduction = NODE_ENV === 'production';

const connectionString = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

// Create a new Pool instance
const pool = new Pool({
    connectionString: isProduction ? DATABASE_URL : connectionString
});

const connectDb = async () => {
    try {
        const client = await pool.connect();
        // eslint-disable-next-line no-console
        console.log('Database connected');
        client.release();
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error connecting to database:', error);
        throw error;
    }
};

module.exports = {
    pool,
    connectDb
};

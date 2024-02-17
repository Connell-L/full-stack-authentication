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
        console.log('Connecting to database...');
        console.log('DB_USER:', DB_USER);
        console.log('DB_PASSWORD:', DB_PASSWORD);
        console.log('DB_HOST:', DB_HOST);
        console.log('DB_PORT:', DB_PORT);
        console.log('DB_NAME:', DB_NAME);
        const client = await pool.connect();
        console.log('Database connected');
        client.release();
    } catch (error) {
        console.error('Error connecting to database:', error);
        throw new Error('Error connecting to database');
    }
};

module.exports = {
    pool,
    connectDb
};

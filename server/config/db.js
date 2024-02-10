require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Function to connect to the database
const connectDb = async () => {
  const client = await pool.connect();
  return client;
};

// Function to save user data to the database
const saveUserData = async (name, email, password, refreshToken) => {
  const client = await connectDb();
  try {
    const insertQuery = `
      INSERT INTO authentication (name, email, password, refresh_token)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [email, password, refreshToken];
    const { rows } = await client.query(insertQuery, values);
    return rows[0];
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Call the function to create the authentication table
createAuthenticationTable();

// Function to create the authentication table if it doesn't exist
async function createAuthenticationTable() {
  try {
    // Check if the authentication table already exists
    const tableCheckQuery = `
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'authentication'
      );
    `;
    const { rows } = await pool.query(tableCheckQuery);
    const tableExists = rows[0].exists;

    if (!tableExists) {
      // Create the authentication table
      const createTableQuery = `
        CREATE TABLE authentication (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          refresh_token VARCHAR(255) NOT NULL
        );
      `;
      await pool.query(createTableQuery);
      console.log('Authentication table created successfully.');
    } else {
      console.log('Authentication table already exists.');
    }
  } catch (error) {
    console.error('Error creating authentication table:', error);
  }
}

module.exports = { connectDb, saveUserData };

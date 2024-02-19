const { pool } = require('../../db.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const InvalidPasswordError = require('../errors/InvalidPasswordError.js');
const UserNotFoundError = require('../errors/UserNotFoundError.js');
const { configDotenv } = require('dotenv');

configDotenv();

// Helper function to generate access token
async function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

// Function to handle user login
async function login(email, password) {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new UserNotFoundError();
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        throw new InvalidPasswordError();
    }

    // Generate access token
    const accessToken = await generateAccessToken({
        name: user.name,
        email: user.email
    });

    return accessToken;
}

// Function to handle transactions
async function withTransaction(callback) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Execute the callback function, passing the client
        const result = await callback(client);

        await client.query('COMMIT'); // Commit the transaction

        return result;
    } catch (error) {
        await client.query('ROLLBACK'); // Rollback the transaction if an error occurs
        throw error;
    } finally {
        client.release();
    }
}

// Function to register a user
async function register(name, email, password) {
    return withTransaction(async client => {
        const hashedPassword = await bcrypt.hash(password, 10);

        const { rows } = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        if (rows.length > 0) {
            throw new Error('Email already registered');
        }

        const { rows: insertedUser } = await client.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, hashedPassword]
        );

        return insertedUser[0];
    });
}

// Function to find a user by email
async function findUserByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0];
}

// Function to update user token
async function updateUserToken(email, accessToken) {
    await pool.query('UPDATE users SET token = $1 WHERE email = $2', [accessToken, email]);
}

// Function to get user by id
async function getUserById(id) {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0];
}

// Function to get all users
async function getAllUsers() {
    const { rows } = await pool.query('SELECT * FROM users');
    return rows;
}

module.exports = {
    register,
    findUserByEmail,
    updateUserToken,
    getUserById,
    getAllUsers,
    generateAccessToken,
    login
};

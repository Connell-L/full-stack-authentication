const userService = require('../services/userService.js');
const jwt = require('jsonwebtoken');
const { configDotenv } = require('dotenv');
const bcrypt = require('bcryptjs');

configDotenv();

// function to generate acess token
async function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

// Controller function for user registration
async function registerUser(req, res) {
    const { name, email, password } = req.body;

    // Check for empty fields
    if (!name || !email || !password) {
        return res.status(400).send('All fields are required');
    }

    try {
        // Attempt to register the user
        const newUser = await userService.registerUser(name, email, password);
        return newUser && res.status(201).send('User created successfully');
    } catch (error) {
        if (error.message === 'Email already registered') {
            return res.status(400).send('Email already registered');
        }

        // Handle other errors
        res.status(500).send('Invalid user data');
    }
}

// Controller function for user login
async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(400).send('User not found');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send('Invalid password');
        }

        // Generate access token
        const accessToken = await generateAccessToken({
            name: user.name,
            email: user.email
        });

        res.setHeader('Authorization', `Bearer ${accessToken}`);
        res.status(200).send('Login successful');
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error logging in user:', error);
        res.status(500).send('Internal server error');
    }
}

async function getUserById(req, res) {
    const id = req.params.id;
    try {
        // Extract JWT token from request header
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send('Unauthorized: Missing token');
        }

        jwt.verify(token.replace('Bearer ', ''), process.env.ACCESS_TOKEN_SECRET);

        // Add additional validation if needed, for example, check if the user ID in the token matches the requested ID

        const user = await userService.getUserById(id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error retrieving user by ID:', error);
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).send('Unauthorized: Invalid token');
        }
        res.status(500).send('Internal server error');
    }
}

async function getAllUsers(req, res) {
    try {
        // Extract JWT token from request header
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send('Unauthorized: Missing token');
        }

        jwt.verify(token.replace('Bearer ', ''), process.env.ACCESS_TOKEN_SECRET);

        // Add additional validation if needed

        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error retrieving all users:', error);
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).send('Unauthorized: Invalid token');
        }
        res.status(500).send('Internal server error');
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserById,
    getAllUsers
};

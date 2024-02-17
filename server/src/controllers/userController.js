const userService = require('../services/userService.js');
const jwt = require('jsonwebtoken');
const { configDotenv } = require('dotenv');
const bcrypt = require('bcryptjs');

configDotenv();

// function to generate acess token
async function generateAccessToken(user) {
    console.log('access token', process.env.ACCESS_TOKEN_SECRET);
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

// Controller function for user registration
async function registerUser(req, res) {
    console.log('Request body:', req.body); // Log the request body

    const { name, email, password } = req.body;

    // Check for empty fields
    if (!name || !email || !password) {
        return res.status(400).send('All fields are required');
    }

    try {
        // Attempt to register the user
        const newUser = await userService.registerUser(name, email, password);
        res.status(201).send('User created successfully');
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

        // Save the access token in the database
        await userService.updateUserToken(email, accessToken);

        res.json({ accessToken: accessToken });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Internal server error');
    }
}

// Controller function to get user by id (protected)
async function getUserById(req, res) {
    const id = req.params.id;
    try {
        const user = await userService.getUserById(id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send('Internal server error');
    }
}

// Controller function to get all users (protected)
async function getAllUsers(req, res) {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send('Internal server error');
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserById,
    getAllUsers
};

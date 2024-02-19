const userService = require('../services/userService.js');
const { configDotenv } = require('dotenv');
const verifyToken = require('../middleware/verifyToken.js');
const UserNotFoundError = require('../errors/UserNotFoundError.js');
const InvalidPasswordError = require('../errors/InvalidPasswordError.js');

configDotenv();

// Controller function for user registration
async function registerUser(req, res) {
    const { name, email, password } = req.body;

    // Check for empty fields
    if (!name || !email || !password) {
        return res.status(400).send('All fields are required');
    }

    try {
        // Attempt to register the user
        const newUser = await userService.register(name, email, password);
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
        const accessToken = await userService.login(email, password);

        res.setHeader('Authorization', `Bearer ${accessToken}`);
        res.status(200).send({
            message: 'Login successful',
            accessToken: accessToken
        });
    } catch (error) {
        if (error instanceof UserNotFoundError) {
            return res.status(404).send('User not found');
        } else if (error instanceof InvalidPasswordError) {
            return res.status(401).send('Unauthorized: Invalid credentials');
        }
        // eslint-disable-next-line no-console
        console.error('Error logging in user:', error);
        res.status(500).send('Internal server error');
    }
}

async function getUserById(req, res) {
    const id = req.params.id;
    try {
        // Verify JWT token
        verifyToken(req, res, async () => {
            const user = await userService.getUserById(id);
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.status(200).json(user);
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error retrieving user by ID:', error);
        res.status(500).send('Internal server error');
    }
}

async function getAllUsers(req, res) {
    try {
        // Verify JWT token
        verifyToken(req, res, async () => {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error retrieving all users:', error);
        res.status(500).send('Internal server error');
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserById,
    getAllUsers
};

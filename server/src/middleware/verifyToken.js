const jwt = require('jsonwebtoken');
const { configDotenv } = require('dotenv');
const UnauthorizedError = require('../errors/UnauthorizedError.js');

configDotenv();

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send('Unauthorized: Missing token');
    }

    try {
        jwt.verify(token.replace('Bearer ', ''), process.env.ACCESS_TOKEN_SECRET);
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            throw new UnauthorizedError('Unauthorized: Invalid token');
        }
        throw new Error('Internal server error');
    }
}

module.exports = verifyToken;

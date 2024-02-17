const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../../src/middleware/authentication');

// Create an instance of the Express application
const app = express();

// Mock environment variable
process.env.ACCESS_TOKEN_SECRET = '123';

// Setup a mock route to use the authenticateToken middleware
app.get('/protected-route', authenticateToken, (req, res) => {
    res.status(200).send('Protected route accessed');
});

// Test case for authenticateToken middleware
describe('authenticateToken middleware', () => {
    it('should return 401 if no token is provided', async () => {
        const res = await request(app).get('/protected-route');
        expect(res.status).toBe(401);
    });

    it('should return 403 if an invalid token is provided', async () => {
        // Generate a mock token with an invalid signature
        const token = jwt.sign({ userId: 1 }, 'invalid-secret', { expiresIn: '1h' });

        const res = await request(app).get('/protected-route').set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(403);
    });

    it('should call next() if a valid token is provided', async () => {
        // Generate a mock token with a valid signature
        const token = jwt.sign({ userId: 1 }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        const res = await request(app).get('/protected-route').set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.text).toBe('Protected route accessed');
    });
});

const { registerUser, loginUser, getUserById, getAllUsers } = require('../../src/controllers/userController');
const userService = require('../../src/services/userService');
const bcrypt = require('bcryptjs');

const testRequest = {
    body: {
        name: 'Test',
        email: 'test@example.com',
        password: 'password'
    }
};

const testResponse = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn()
};

const tokenRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]+$/;

describe('User Controller', () => {
    describe('registerUser', () => {
        it('should return 400 if any required field is missing', async () => {
            const req = { ...testRequest, body: { ...testRequest.body, password: '' } };
            const res = { ...testResponse };

            await registerUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith('All fields are required');
        });

        it('should return 400 if email is already registered', async () => {
            const req = { ...testRequest };
            const res = { ...testResponse };

            // Mock the registerUser function to simulate the email already registered scenario
            userService.registerUser = jest.fn().mockRejectedValue(new Error('Email already registered'));

            await registerUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith('Email already registered');
        });

        it('should return 201 if user is successfully registered', async () => {
            const req = { ...testRequest };
            const res = { ...testResponse };

            userService.registerUser = jest.fn().mockResolvedValue({ id: 1, name: 'Test', email: 'test@example.com' });

            await registerUser(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith('User created successfully');
        });
    });

    describe('loginUser', () => {
        it('should return 400 if user is not found', async () => {
            const req = { ...testRequest };
            const res = { ...testResponse };

            // Mock the userService.findUserByEmail function to return null
            userService.findUserByEmail = jest.fn().mockResolvedValue(null);

            await loginUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith('User not found');
        });

        it('should return 400 if password is invalid', async () => {
            const req = { ...testRequest };
            const res = { ...testResponse };

            // Mock the userService.findUserByEmail function to return a user
            userService.findUserByEmail = jest.fn().mockResolvedValue({ password: 'hashedPassword' });

            // Mock the bcrypt.compare function to return false
            bcrypt.compare = jest.fn().mockResolvedValue(false);

            await loginUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith('Invalid password');
        });

        it('should return 500 if an error occurs', async () => {
            const req = { ...testRequest };
            const res = { ...testResponse };

            // Mock the userService.findUserByEmail function to throw an error
            userService.findUserByEmail = jest.fn().mockRejectedValue(new Error('Internal server error'));

            await loginUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Internal server error');
        });

        it('should return access token if login is successful', async () => {
            const req = { ...testRequest };
            const res = { ...testResponse, json: jest.fn() };

            // Mock the userService.findUserByEmail function to return a user
            userService.findUserByEmail = jest
                .fn()
                .mockResolvedValue({ name: 'Test User', email: 'test@example.com', password: 'hashedPassword' });

            // Mock the bcrypt.compare function to return true
            bcrypt.compare = jest.fn().mockResolvedValue(true);

            await loginUser(req, res);

            // Verify that res.json was called with an access token
            expect(res.json).toHaveBeenCalled();

            // Verify that the access token matches the expected format using a regular expression
            expect(res.json.mock.calls[0][0].accessToken).toMatch(tokenRegex);
        });
    });

    describe('getUserById', () => {
        it('should return the user if ID is valid', async () => {
            // Mock the userService.getUserById function to return a user object
            userService.getUserById = jest
                .fn()
                .mockResolvedValue({ id: '1', name: 'Test User', email: 'test@example.com' });

            // Mock the req and res objects
            const req = { params: { id: '1' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            // Call the getUserById function with the mocked req and res objects
            await getUserById(req, res);

            // Verify that res.status and res.json were called with the expected values
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ id: '1', name: 'Test User', email: 'test@example.com' });
        });

        it('should return "User not found" if ID is invalid', async () => {
            // Mock the userService.getUserById function to return null
            userService.getUserById = jest.fn().mockResolvedValue(null);

            // Mock the req and res objects
            const req = { params: { id: 'invalid-id' } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

            // Call the getUserById function with the mocked req and res objects
            await getUserById(req, res);

            // Verify that res.status and res.send were called with the expected values
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith('User not found');
        });

        it('should return "Internal server error" if an error occurs', async () => {
            // Mock the userService.getUserById function to throw an error
            userService.getUserById = jest.fn().mockRejectedValue(new Error('Database error'));

            // Mock the req and res objects
            const req = { params: { id: '1' } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

            // Call the getUserById function with the mocked req and res objects
            await getUserById(req, res);

            // Verify that res.status and res.send were called with the expected values
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Internal server error');
        });
    });

    describe('getAllUsers', () => {
        it('should return all users if retrieval is successful', async () => {
            // Mock the userService.getAllUsers function to return an array of user objects
            userService.getAllUsers = jest.fn().mockResolvedValue([
                { id: '1', name: 'User 1', email: 'user1@example.com' },
                { id: '2', name: 'User 2', email: 'user2@example.com' },
                { id: '3', name: 'User 3', email: 'user3@example.com' }
            ]);

            // Mock the req and res objects
            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            // Call the getAllUsers function with the mocked req and res objects
            await getAllUsers(req, res);

            // Verify that res.status and res.json were called with the expected values
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([
                { id: '1', name: 'User 1', email: 'user1@example.com' },
                { id: '2', name: 'User 2', email: 'user2@example.com' },
                { id: '3', name: 'User 3', email: 'user3@example.com' }
            ]);
        });

        it('should return "Internal server error" if an error occurs', async () => {
            // Mock the userService.getAllUsers function to throw an error
            userService.getAllUsers = jest.fn().mockRejectedValue(new Error('Database error'));

            // Mock the req and res objects
            const req = {};
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

            // Call the getAllUsers function with the mocked req and res objects
            await getAllUsers(req, res);

            // Verify that res.status and res.send were called with the expected values
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Internal server error');
        });
    });
});

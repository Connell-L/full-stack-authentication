const { registerUser, loginUser, getUserById, getAllUsers } = require('../../src/controllers/userController');
const userService = require('../../src/services/userService');
const bcrypt = require('bcryptjs');
const UserNotFoundError = require('../../src/errors/UserNotFoundError');

jest.mock('../../src/services/userService');

// Mock the bcrypt.compare function
jest.mock('bcryptjs', () => ({
    compare: jest.fn()
}));

const testRequest = {
    body: {
        name: 'Test',
        email: 'test@example.com',
        password: 'password'
    },
    params: {
        id: '1'
    },
    headers: {
        authorization: 'Bearer mockToken'
    }
};

const testResponse = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    json: jest.fn()
};

const tokenRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]+$/;

describe('User Controller', () => {
    describe('registerUser', () => {
        afterEach(() => {
            jest.clearAllMocks(); // Clear all mock function calls after each test
        });

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

            userService.register.mockRejectedValue(new Error('Email already registered'));

            await registerUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith('Email already registered');
        });

        it('should return 201 if user is successfully registered', async () => {
            const req = { ...testRequest };
            const res = { ...testResponse };

            userService.register.mockResolvedValue({ id: 1, name: 'Test', email: 'test@example.com' });

            await registerUser(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith('User created successfully');
        });
    });

    describe('loginUser', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should return 404 if user is not found', async () => {
            const req = { ...testRequest };
            const res = { ...testResponse };

            userService.login.mockRejectedValue(new UserNotFoundError());

            await loginUser(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith('User not found');
        });

        it('should return 401 if password is invalid', async () => {
            const req = { ...testRequest };
            const res = { ...testResponse };

            userService.login.mockResolvedValue(null);
            bcrypt.compare.mockReturnValue(false);
            await loginUser(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.send).toHaveBeenCalledWith('Unauthorized: Invalid credentials');
        });

        it('should return 500 if an error occurs', async () => {
            const req = { ...testRequest };
            const res = { ...testResponse };

            userService.login.mockRejectedValue(new Error('Internal server error'));

            await loginUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Internal server error');
        });

        it('should return access token if login is successful', async () => {
            const req = { ...testRequest };
            const res = { ...testResponse, json: jest.fn() };

            userService.login.mockResolvedValue({
                name: 'Test User',
                email: 'test@example.com',
                password: 'hashedPassword'
            });
            bcrypt.compare.mockResolvedValue(true);

            await loginUser(req, res);

            expect(res.json).toHaveBeenCalled();
            expect(res.json.mock.calls[0][0].accessToken).toMatch(tokenRegex);
        });
    });

    describe('getUserById', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should return the user if ID is valid', async () => {
            userService.getUserById.mockResolvedValue({ id: '1', name: 'Test User', email: 'test@example.com' });

            const req = { ...testRequest };
            const res = { ...testResponse };

            await getUserById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ id: '1', name: 'Test User', email: 'test@example.com' });
        });

        it('should return "User not found" if ID is invalid', async () => {
            userService.getUserById.mockResolvedValue(null);

            const req = { ...testRequest, params: { id: 'invalid-id' } };
            const res = { ...testResponse };

            await getUserById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith('User not found');
        });

        it('should return "Internal server error" if an error occurs', async () => {
            userService.getUserById.mockRejectedValue(new Error('Database error'));

            const req = { ...testRequest };
            const res = { ...testResponse };

            await getUserById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Internal server error');
        });
    });

    describe('getAllUsers', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should return all users if retrieval is successful', async () => {
            userService.getAllUsers.mockResolvedValue([
                { id: '1', name: 'User 1', email: 'user1@example.com' },
                { id: '2', name: 'User 2', email: 'user2@example.com' },
                { id: '3', name: 'User 3', email: 'user3@example.com' }
            ]);

            const req = { ...testRequest };
            const res = { ...testResponse };

            await getAllUsers(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([
                { id: '1', name: 'User 1', email: 'user1@example.com' },
                { id: '2', name: 'User 2', email: 'user2@example.com' },
                { id: '3', name: 'User 3', email: 'user3@example.com' }
            ]);
        });

        it('should return "Internal server error" if an error occurs', async () => {
            userService.getAllUsers.mockRejectedValue(new Error('Database error'));

            const req = { ...testRequest };
            const res = { ...testResponse };

            await getAllUsers(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Internal server error');
        });
    });
});

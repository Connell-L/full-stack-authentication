const { registerUser } = require('../../src/controllers/userController');

describe('User Controller', () => {
    describe('registerUser', () => {
        it('should return 400 if any required field is missing', async () => {
            const req = { body: { name: 'Test', email: 'test@example.com' } };
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

            await registerUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith('All fields are required');
        });
    });
});

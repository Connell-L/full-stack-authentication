const { RESTDataSource } = require('@apollo/datasource-rest');

class UserDataSource extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3000/';
    }

    async getUserById(id) {
        try {
            return await this.get(`api/users/${id}`);
        } catch (error) {
            throw new Error(`Failed to fetch user by ID: ${error.message}`);
        }
    }

    async getAllUsers() {
        try {
            return await this.get('api/users');
        } catch (error) {
            throw new Error(`Failed to fetch all users: ${error.message}`);
        }
    }

    async registerUser(name, email, password) {
        try {
            return await this.post('api/users/register', {
                name,
                email,
                password
            });
        } catch (error) {
            throw new Error(`Failed to post user: ${error.message}`);
        }
    }
}

module.exports = UserDataSource;

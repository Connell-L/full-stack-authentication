import { RESTDataSource } from '@apollo/datasource-rest';

class UserDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3000';
  }

  async getUser(id) {
    try {
      const user = await this.get(`/users/${id}`);
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  async registerUser(registerInput) {
    try {
      const newUser = await this.post('/register', registerInput);
      return newUser;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }

  async loginUser(loginInput) {
    try {
      const userToken = await this.post('/login', loginInput);
      return userToken;
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  }
}

export default UserDataSource;

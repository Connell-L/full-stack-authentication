import UserDataSource from '../datasources/user.js';

const resolvers = {
  Query: {
    user: async (_, { id }, {}) => {
      try {
        const user = await UserDataSource.getUser(id);
        return user;
      } catch (error) {
        console.error('Error getting user:', error);
        throw error;
      }
    },
  },
  Mutation: {
    registerUser: async (_, { registerInput }, {}) => {
      try {
        const newUser = await UserDataSource.registerUser(registerInput);
        return newUser;
      } catch (error) {
        console.error('Error registering user:', error);
        throw error;
      }
    },
    loginUser: async (_, { loginInput }, {}) => {
      try {
        const userToken = await UserDataSource.loginUser(loginInput);
        return userToken;
      } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
      }
    },
  },
};

export default resolvers;

import UserDataSource from '../datasources/user.js';

const resolvers = {
  Query: {
    user: async (_, { id }, { dataSources }) => {
      try {
        const user = await dataSources.userDataSource.getUser(id);
        return user;
      } catch (error) {
        console.error('Error getting user:', error);
        throw error;
      }
    },
  },
  Mutation: {
    registerUser: async (_, { registerInput }, { dataSources }) => {
      console.log(dataSources); // Log the dataSources object
      if (dataSources && dataSources.userDataSource) {
        console.log('UserDataSource exists in dataSources');
      } else {
        console.log('UserDataSource does not exist in dataSources');
      }
      try {
        const newUser = await dataSources.userDataSource.registerUser(
          registerInput
        );
        return newUser;
      } catch (error) {
        console.error('Error registering user:', error);
        throw error;
      }
    },
    loginUser: async (_, { loginInput }, { dataSources }) => {
      try {
        const userToken = await dataSources.userDataSource.loginUser(
          loginInput
        );
        return userToken;
      } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
      }
    },
  },
};

export default resolvers;

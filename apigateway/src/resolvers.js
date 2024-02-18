const resolvers = {
    Query: {
        getUserById: async (_, args, { user, dataSources }) => {
            // Check if user is authenticated
            if (!user) {
                throw new Error('User not authenticated');
            }
            try {
                const user = await dataSources.userDataSource.getUserById(args.id);
                return user;
            } catch (error) {
                throw new Error(`Failed to fetch user by ID: ${error.message}`);
            }
        },
        getAllUsers: async (_, __, { user, dataSources }) => {
            // Check if user is authenticated
            if (!user) {
                throw new Error('User not authenticated');
            }
            try {
                const users = await dataSources.userDataSource.getAllUsers();
                return users;
            } catch (error) {
                throw new Error(`Failed to fetch all users: ${error.message}`);
            }
        }
    },
    Mutation: {
        registerUser: async (_, args, { dataSources }) => {
            try {
                const user = await dataSources.userDataSource.registerUser(args.name, args.email, args.password);
                return user;
            } catch (error) {
                throw new Error(`Failed to register user: ${error.message}`);
            }
        },
        loginUser: async (_, args, { dataSources }) => {
            try {
                const user = await dataSources.userDataSource.loginUser(args.email, args.password);
                return user;
            } catch (error) {
                throw new Error(`Failed to login user: ${error.message}`);
            }
        }
    }
};

module.exports = resolvers;

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-errors');
const { config } = require('dotenv');

config();

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const UserDataSource = require('./datasources/userDataSource');

const SECRET_KEY = process.env.SECRET_KEY;

async function startApolloServer() {
    const server = new ApolloServer({ typeDefs, resolvers });

    const { url } = await startStandaloneServer(server, {
        context: async ({ req }) => {
            const { cache } = server;

            // Check if req exists
            if (!req) {
                throw new Error('Request object (req) is undefined');
            }

            // Get the authorization header from the request
            const token = req.headers.authorization || '';

            let user = null;

            // Verify and decode the JWT token if it exists
            if (token) {
                try {
                    // Verify the token and extract user information
                    user = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
                } catch (error) {
                    throw new AuthenticationError('Invalid or expired token');
                }
            }

            return {
                user,
                dataSources: {
                    userDataSource: new UserDataSource({ cache })
                }
            };
        }
    });

    // eslint-disable-next-line no-console
    console.log(`
🚀  Server is running
📭  Query at ${url}
`);
}

startApolloServer();

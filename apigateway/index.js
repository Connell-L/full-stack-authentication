import { ApolloServer } from 'apollo-server';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/user.js';
import dotenv from 'dotenv';
import UserDataSource from './graphql/datasources/user.js';

dotenv.config();

const port = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    userDataSource: new UserDataSource(),
  }),
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    return { token };
  },
});

server.listen({ port }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

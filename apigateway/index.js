import { ApolloServer } from 'apollo-server';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/user.js';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
  playground: true,
});

server.listen({ port }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

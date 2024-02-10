import { setContext } from '@apollo/client/link/context';
import { createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client';

const graphqlURI = process.env.GRAPHQL_URI || 'http://localhost:4000/graphql';

const httpLink = createHttpLink({
    uri: graphqlURI
});

export const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client;

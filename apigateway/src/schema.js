const gql = require('graphql-tag');

const typeDefs = gql`
    type User {
        "The user's ID."
        id: ID
        "The user's name including forename and surname."
        name: String
        "The user's email address."
        email: String
        "The user's hashed password."
        password: String
        "The user's authentication token."
        token: String
    }

    type Query {
        "Get a user by their ID."
        getUserById(id: ID!): User

        "Get all users."
        getAllUsers: [User]
    }

    type Mutation {
        "Create a new user."
        registerUser(name: String!, email: String!, password: String!): User

        "Authenticate a user."
        loginUser(email: String!, password: String!): User
    }
`;

module.exports = typeDefs;

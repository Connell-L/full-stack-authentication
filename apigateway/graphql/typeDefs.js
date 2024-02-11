import { gql } from 'apollo-server';

export default gql`
  type User {
    id: ID
    name: String
    email: String
    password: String
    token: String
  }

  input RegisterInput {
    name: String
    email: String
    password: String
  }

  input LoginInput {
    email: String
    password: String
  }

  type Query {
    user(id: ID!): User
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
  }
`;

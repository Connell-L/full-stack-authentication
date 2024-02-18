import { gql } from 'graphql-tag';

const userFragment = gql`
    fragment UserFragment on User {
        id
        name
        email
        token
    }
`;

export const REGISTER_USER = gql`
    mutation RegisterUser($registerInput: RegisterInput) {
        registerUser(registerInput: $registerInput) {
            ...UserFragment
        }
    }
    ${userFragment}
`;

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            ...UserFragment
        }
    }
    ${userFragment}
`;

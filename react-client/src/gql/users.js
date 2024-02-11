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
    mutation register($name: String!, $email: String!, $password: String!) {
        registerUser(name: $name, email: $email, password: $password) {
            ...UserFragment
        }
    }
    ${userFragment}
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            ...UserFragment
        }
    }
    ${userFragment}
`;

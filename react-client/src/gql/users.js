import { gql } from 'graphql-tag';

const userFragment = gql`
    fragment UserFragment on User {
        id
        firstName
        lastName
        email
        token
    }
`;

export const REGISTER_USER = gql`
    mutation register($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
        registerUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
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

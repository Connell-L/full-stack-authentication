import { gql } from 'graphql-tag';

export const REGISTER_USER = gql`
    mutation register($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
        registerUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
            id
            firstName
            lastName
            email
            token
        }
    }
`;

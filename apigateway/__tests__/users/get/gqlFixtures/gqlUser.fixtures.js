const gql = require('graphql-tag');

export default {
    getAllUsers: {
        request: gql`
            {
                getAllUsers {
                    id
                    name
                    email
                    password
                    token
                }
            }
        `,
        response: [
            {
                id: 1,
                name: 'John Doe',
                email: 'john.doe@mia.com',
                password: 'password',
                token: 'token'
            },
            {
                id: 2,
                name: 'Jane Doe',
                email: 'jane.doe@mia.com',
                password: 'password',
                token
            }
        ]
    }
};

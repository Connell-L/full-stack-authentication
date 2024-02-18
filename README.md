# Fullstack authentication

This is a fullstack authentication project. It is a work in progress. It has a backend and a frontend. The backend is a node.js server, using express and postgresql. The frontend is a react app. There is a graphql server set up using apollo-server-express.

## Backend

### Setup

1. Install node.js

2. There is a .env.example file, copy it into an file called .env. It contains the following environment variables:

```
PORT=4000
DB_USER=your_db_user

DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=your_db_name

JWT_SECRET=your_jwt_secret
```

3. Get a jwt secret and replace the placeholder with it.

```bash
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```

4. Create a postgresql database
   Assuming you don't have postgresql installed locally, you can use docker to create a postgresql database. There is a script in the server directory that will run a postgresql container. Run the following command in the server directory:

```bash
bash ./start-postgres.sh
```

5. Connect to the database. If you have postgresql installed locally, you can connect to the database using the following command:

```bash
psql -h localhost -U your_db_user -d your_db_name
```

If you don't have postgresql installed locally, you can use the following command to connect to the database:

```bash
docker exec -it postgres psql -U your_db_user -d your_db_name
```

6. Create the tables. There is a database.sql file in the server directory. Run it in your postgresql database to create the tables.

```bash
psql -h localhost -U your_db_user -d your_db_name -f init-scripts/init.sql
```

7. Navigate to the server directory and install the packages and start the server. The server will start on port 3000 by default.

```bash
npm install && npm run dev
```

### API Endpoints

#### base route: /api/users

#### /register

type: POST
body: { name: string, email: string, password: string }
response: confirmation message
This endpoint is used to create a new user.

#### /login

type: POST
body: { username: string, password: string }
response: { token: string }
This endpoint is used to log in a user.

#### /:id

type: GET
response: { id: number, name: string, email: string, password: string, token: string }
This endpoint is used to get a user by id.

#### /

type: GET
response: { id: number, name: string, email: string, password: string, token: string }[]
This endpoint is used to get all users.

### Notes

The jwt token is required for the / and /:id endpoints. You can get a token by sending a post request to the /login endpoint with a valid username and password.

#### Todo

1. Finish the tests for the backend. Only the controller tests are written.
2. Add a refresh token to the jwt token.
3. Add rate limiting to the login endpoint. This will prevent brute force attacks. It should allow a maximum of 5 failed login attempts before locking the account for 5+ minutes.
4. Add api documentation.
5. Flex goal: add pact tests.
6. Fix the authentication middleware. It's not working as expected.

## Apigateway - GraphQL

### Setup

1. Create a .env file in the apigateway directory. It contains the following environment variables:

```
SECRET_KEY: your_secret_key
```

2. Add the jwt token generated in the backend to the .env file.

3. Navigate to the apigateway directory and install the packages and start the server. The server will start on port 4000 by default.

```bash
npm install && npm run dev
```

### Queries

#### users

type: [User]
This query is used to get all users.

#### user

type: User
args: id: Int
This query is used to get a user by id.

### Mutations

#### register

type: User
args: name: String, email: String, password: String
This mutation is used to create a new user.

#### login

type: String
args: email: String, password: String
This mutation is used to log in a user.

#### Notes

The queries will only work if there is a valid jwt token in the request headers. You can generate a token using the /login endpoint in the backend.

The mutations aren't working yet. I'm still working on them. The resolvers and data sources are getting the data passed in from the client but it's not being passed to the database in the POST request.

#### Todo

1. Finish the mutations.
2. Add api documentation.
3. Add unit tests.
4. Flex goal: add pact tests.

## Frontend

### Setup

1. Navigate to the client directory and install the packages and start the server. The server will start on port 3000 by default.

```bash
npm install && npm start
```

2. Add an .env file in the client directory. It contains the following environment variables:

```
GRAPHQL_URI=http://localhost:4000
BASE_URL=http://localhost:3000
```

### Notes

The frontend is a work in progress. It has a login and register form. As the apigateway is not working yet, when the login and register buttons are clicked, the mutations are not successful.

#### Todo

1. Finish the authentication flow. If a user is not logged in, they should be redirected to the login page when they try to access a protected route (e.g. the home page).
2. Finish testing including confguring the tests to use babel transforms for javascript or writing the tests in typescript.
3. Fix the spacing on the forms. It has extra padding on the right.
4. Flex goal: add pact tests.
5. Fix linting errors.

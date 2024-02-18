-- Create the postgresdb database if it doesn't exist
CREATE DATABASE IF NOT EXISTS postgresdb;

-- Connect to the authentication database
\c postgresdb;

-- Create the users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(255)
);

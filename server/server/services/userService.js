import { pool } from '../../db.js';
import bcrypt from 'bcryptjs';

// Function to register a user
export async function registerUser(name, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);
  if (rows.length > 0) {
    throw new Error('Email already registered');
  }

  const { rows: insertedUser } = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    [name, email, hashedPassword]
  );

  return insertedUser[0];
}

// Function to find a user by email
export async function findUserByEmail(email) {
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);
  return rows[0];
}

// Function to update user token
export async function updateUserToken(email, accessToken) {
  await pool.query('UPDATE users SET token = $1 WHERE email = $2', [
    accessToken,
    email,
  ]);
}

// Function to get user by id
export async function getUserById(id) {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return rows[0];
}

// Function to get all users
export async function getAllUsers() {
  const { rows } = await pool.query('SELECT * FROM users');
  return rows;
}

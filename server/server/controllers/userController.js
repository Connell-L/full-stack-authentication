import * as userService from '../services/userService.js';
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
import bcrypt from 'bcryptjs';

configDotenv();

// function to generate acess token
async function generateAccessToken(user) {
  console.log('access token', process.env.ACCESS_TOKEN_SECRET);
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

// Controller function for user registration
export async function registerUser(req, res) {
  const { name, email, password } = req.body;

  try {
    await userService.registerUser(name, email, password);
    res.status(201).send('User created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// Controller function for user login
export async function loginUser(req, res) {
  const { email, password } = req.body;
  console.log('User data:', email + password);

  try {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(400).send('User not found');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send('Invalid password');
    }

    // Generate access token
    const accessToken = generateAccessToken({
      name: user.name,
      email: user.email,
    });

    // Save the access token in the database
    await userService.updateUserToken(email, accessToken);

    res.json({ accessToken: accessToken });
  } catch (error) {
    res.status(500).send('Internal server error');
  }
}

// Controller function to get user by id (protected)
export async function getUserById(req, res) {
  const id = req.params.id;
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
}

// Controller function to get all users (protected)
export async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
}

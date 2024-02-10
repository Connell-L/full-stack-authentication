// Import required modules and configuration
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { saveUserData, connectDb } = require('./config/db.js');

// Initialize Express app
const app = express();
app.use(express.json());

// Establish database connection
connectDb()
  .then(() => {
    console.log('Database connected');
    // Start the server after the database connection is established
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
    process.exit(1); // Exit the process if database connection fails
  });

// Route to create a new user (protected)
app.post('/register', authenticateToken, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await saveUserData(req.body.name, hashedPassword, '');
    res.status(201).send('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to login a user
app.post('/login', async (req, res) => {
  // Authenticate user
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const accessToken = generateAccessToken(user);
  res.json({ accessToken: accessToken });
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Function to generate access token
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

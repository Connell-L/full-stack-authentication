import express from 'express';
import { pool, connectDb } from './config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || 'http://localhost';

// Connect to the database before starting the server
connectDb().then(() => {
  console.log('Database connected');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// middleware
app.use(express.json());

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

// Set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('User data:', name, email, password);

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Hashed password:', hashedPassword);

  pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log('User data:', results.rows);
      if (results.rows.length > 0) {
        return res.status(400).send('Email already registered');
      } else {
        pool.query(
          'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
          [name, email, hashedPassword],
          (error, results) => {
            if (error) {
              throw error;
            }
            console.log('User created:', results.rows[0]);
            res.status(201).send('User created successfully');
          }
        );
      }
    }
  );
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('User data:', email + password);

  pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email],
    async (error, results) => {
      if (error) {
        throw error;
      }
      console.log('User data:', results.rows);
      if (results.rows.length === 0) {
        return res.status(400).send('User not found');
      }
      const user = results.rows[0];
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
      pool.query(
        'UPDATE users SET token = $1 WHERE email = $2',
        [accessToken, email],
        (error, results) => {
          if (error) {
            throw error;
          }
          console.log('Token saved in database');
        }
      );

      res.json({ accessToken: accessToken });
    }
  );
});

// get user by id (protected)
app.get('/user/:id', authenticateToken, (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// get all users (protected)
app.get('/users', authenticateToken, (req, res) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

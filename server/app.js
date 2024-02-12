import express from 'express';
import { connectDb } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || 'http://localhost';

// Connect to the database before starting the server
connectDb().then(() => {
  console.log('Database connected');
  app.listen(PORT, () => {
    console.log(`Server running at ${BASE_URL}:${PORT}`);
  });
});

// Middleware
app.use(bodyParser.json());

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index');
});
app.use('/api/users', userRoutes);

export default app;

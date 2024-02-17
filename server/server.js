const express = require('express');
const { connectDb } = require('./db.js');
const bodyParser = require('body-parser');
const { configDotenv } = require('dotenv');
const userRoutes = require('./src/routes/userRoutes.js');

configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || 'http://localhost';

// Middleware
app.use(bodyParser.json());

// Connect to the database before starting the server
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at ${BASE_URL}:${PORT}`);
    });
});

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index');
});
app.use('/api/users', userRoutes);

module.exports = app;

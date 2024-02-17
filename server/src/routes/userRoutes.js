const express = require('express');
const { registerUser, loginUser, getUserById, getAllUsers } = require('../controllers/userController.js');
const { authenticateToken } = require('../middleware/authentication.js');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/:id', authenticateToken, getUserById);
router.get('/', authenticateToken, getAllUsers);

module.exports = router;
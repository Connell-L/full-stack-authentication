const express = require('express');
const { registerUser, loginUser, getUserById, getAllUsers } = require('../controllers/userController.js');
const verifyToken = require('../middleware/verifyToken.js');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/:id', verifyToken, getUserById);
router.get('/', verifyToken, getAllUsers);

module.exports = router;

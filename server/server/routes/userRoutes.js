import express from 'express';
import {
  registerUser,
  loginUser,
  getUserById,
  getAllUsers,
} from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authentication.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/:id', authenticateToken, getUserById);
router.get('/', authenticateToken, getAllUsers);

export default router;

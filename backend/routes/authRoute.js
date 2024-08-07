import express from 'express';
import { signup, login, profile, verifyToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', profile, verifyToken);

export default router;
import express from 'express';
import { signup, login, profile, verifyToken } from '../controller/authController';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', profile, verifyToken);

export default router;
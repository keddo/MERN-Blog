import express from 'express'
import { signin, signup } from '../controllers/auth.controller.js';
import {body} from 'express-validator'
const router = express.Router()

const validateUserInput = [
      body('username').trim().isLength({min: 3}).withMessage('Username must be at least 3 characters long'),
      body('email').isEmail().withMessage('Invalid email address'),
      body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')
   ]
router.post('/signin', signin);
router.post('/signup',validateUserInput, signup);

export default router;
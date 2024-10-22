import express from 'express';
import { check } from 'express-validator';
import { registerUser, loginUser, getUser } from '../controllers/authController.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.post(
    '/register',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('password', 'Password is required').isLength({ min: 8 }),
        check('role', 'Role is required').isIn(['admin', 'customer'])
    ],
    registerUser
);

router.post(
    '/login',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('password', 'Password is required').exists()
    ],
    loginUser
);

router.get('/', auth, getUser);

export default router;
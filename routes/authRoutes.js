import express from 'express';
import { check } from 'express-validator';
import { registerUser, loginUser, getUser, getUserByUsername, updateUserPassword } from '../controllers/authController.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.post(
    '/register',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('password', 'Password is too short').isLength({ min: 8 }),
        check('role', 'Role is required').isIn(['admin', 'customer'])
    ],
    registerUser
);

router.post(
    '/login',
    [
        check('username', 'Username is required').exists().not().isEmpty(),
        check('password', 'Password is required').exists().not().isEmpty()
    ],
    loginUser
);

router.get('/', auth, getUser);
router.get('/:username', getUserByUsername);
router.put(
    '/:username', 
    [
        check('password', 'Password is too short').isLength({ min: 8 })
    ],
    updateUserPassword
);

export default router;
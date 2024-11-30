import express from 'express';
import { check } from 'express-validator';
import { 
    registerUser, loginUser, getUser, 
    getUserByUsername, resetUserPassword, updateUserPhoneNumber, updateUserPassword
} from '../controllers/authController.js';
import auth from '../middleware/auth.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication management
 */

/**
 * @swagger
 * /fourwheels/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, customer]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
router.post(
    '/register',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
        check('password', 'Password is too short').isLength({ min: 8 }),
        check('phoneNumber', 'Phone number is required').not().isEmpty(),
        check('phoneNumber', 'Phone number is not valid').isMobilePhone('any'),
        check('role', 'Role is required').isIn(['admin', 'customer'])
    ],
    registerUser
);

/**
 * @swagger
 * /fourwheels/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid username or password
 */
router.post(
    '/login',
    [
        check('username', 'Username is required').exists().not().isEmpty(),
        check('password', 'Password is required').exists().not().isEmpty()
    ],
    loginUser
);

/**
 * @swagger
 * /fourwheels/auth:
 *   get:
 *     summary: Get information of logged in user
 *     tags: [Auth]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Information of user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server errors
 */
router.get('/', auth, getUser);

/**
 * @swagger
 * /fourwheels/auth/{username}:
 *   get:
 *     summary: Get information of a provided username
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Information of user with provided username
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Some server errors
 */
router.get('/get/username', getUserByUsername);

/**
 * @swagger
 * /fourwheels/auth/{username}:
 *   put:
 *     summary: reset user password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The password was successfully changed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/User'
 *       400:
 *         description: Invalid input
 */
router.put(
    '/:id/passwords/reset', 
    [
        check('password', 'Password is too short').isLength({ min: 8 })
    ],
    resetUserPassword
);

/**
 * @swagger
 * /fourwheels/auth/{username}:
 *   put:
 *     summary: Update user's phone number
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The phone number was successfully changed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/User'
 *       400:
 *         description: Invalid input
 */
router.put(
    '/:id/phoneNumbers/update', auth,
    [
        check('phoneNumber', 'Phone number is not valid').isMobilePhone('any')
    ],
    updateUserPhoneNumber
);

/**
 * @swagger
 * /fourwheels/auth/{username}:
 *   put:
 *     summary: Update user's password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The password was successfully changed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/User'
 *       400:
 *         description: Invalid input
 */
router.put(
    '/:id/passwords/update', auth,
    [
        check('currentPassword', 'Current password is required').not().isEmpty(),
        check('newPassword', 'New password is required').not().isEmpty(),
        check('newPassword', 'New password is too short').isLength({ min: 8 })
    ],
    updateUserPassword
);

export default router;
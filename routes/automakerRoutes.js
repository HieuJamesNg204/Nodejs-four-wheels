import express from 'express';
import { 
    addNewAutomaker, getAllAutomakers, getAutomakerById, 
    updateAutomaker, deleteAutomaker 
} from '../controllers/automakerController.js';
import auth from '../middleware/auth.js';
import role from '../middleware/role.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Automakers
 *   description: Automaker management
 */

/**
 * @swagger
 * /fourwheels/automakers:
 *   post:
 *     summary: Create a new automaker
 *     tags: [Automakers]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Automaker'
 *     responses:
 *       200:
 *         description: The automaker was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Automaker'
 *       500:
 *         description: Some server errors
 */
router.post('/', auth, role(['admin']), addNewAutomaker);

/**
 * @swagger
 * /fourwheels/automakers:
 *   get:
 *     summary: Get all automakers
 *     tags: [Automakers]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: The list of the automakers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Automaker'
 */
router.get('/', auth, getAllAutomakers);

/**
 * @swagger
 * /fourwheels/automakers/{id}:
 *   get:
 *     summary: Get an automaker by ID
 *     tags: [Automakers]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The automaker ID
 *     responses:
 *       200:
 *         description: The automaker description by ID
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Automaker'
 *       404:
 *         description: Automaker not found
 */
router.get('/:id', auth, getAutomakerById);

/**
 * @swagger
 * /fourwheels/automakers/{id}:
 *   put:
 *     summary: Update an automaker
 *     tags: [Automakers]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The automaker ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Automaker'
 *     responses:
 *       200:
 *         description: The automaker was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Automaker'
 *       404:
 *         description: Automaker not found
 *       500:
 *         description: Some server errors
 */
router.put('/:id', auth, role(['admin']), updateAutomaker);

/**
 * @swagger
 * /fourwheels/automakers/{id}:
 *   delete:
 *     summary: Remove an automaker
 *     tags: [Automakers]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The automaker ID
 *     responses:
 *       200:
 *         description: The automaker was deleted
 *       404:
 *         description: The automaker was not found
 */
router.delete('/:id', auth, role(['admin']), deleteAutomaker);

export default router;
import express from 'express';
import { addNewCar, getAllCars, getCarById, updateCar, deleteCar, getCarsByAutomaker } from '../controllers/carController.js';
import auth from '../middleware/auth.js';
import role from '../middleware/role.js';
import { upload } from '../config/multer.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: Car management
 */

/**
 * @swagger
 * /fourwheels/cars:
 *   get:
 *     summary: Get all cars
 *     tags: [Cars]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: The list of the cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 */
router.get('/', auth, getAllCars);

/**
 * @swagger
 * /fourwheels/cars/{id}:
 *   get:
 *     summary: Get a car by ID
 *     tags: [Cars]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The car ID
 *     responses:
 *       200:
 *         description: The car description by ID
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found
 */
router.get('/:id', auth, getCarById);

/**
 * @swagger
 * /fourwheels/cars/getByAutomaker/{automaker}:
 *   get:
 *     summary: Get a car by automaker
 *     tags: [Cars]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The automaker
 *     responses:
 *       200:
 *         description: The car descriptions by automaker
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Cars not found
 */
router.get('/getByAutomaker/:automaker', auth, getCarsByAutomaker);

/**
 * @swagger
 * /fourwheels/cars:
 *   post:
 *     summary: Create a new car
 *     tags: [Cars]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       200:
 *         description: The car was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       500:
 *         description: Some server errors
 */
router.post('/', upload.single('image'), auth, role(['admin']), addNewCar);

/**
 * @swagger
 * /fourwheels/cars/{id}:
 *   put:
 *     summary: Update a car
 *     tags: [Cars]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The car ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       200:
 *         description: The car was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Some server errors
 */
router.put('/:id', upload.single('image'), auth, role(['admin']), updateCar);

/**
 * @swagger
 * /fourwheels/cars/{id}:
 *   delete:
 *     summary: Remove a car
 *     tags: [Cars]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The car ID
 *     responses:
 *       200:
 *         description: The car was deleted
 *       404:
 *         description: The car was not found
 */
router.delete('/:id', auth, role(['admin']), deleteCar);

export default router;
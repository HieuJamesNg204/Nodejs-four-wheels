import express from "express";
import { 
    addNewOrder, getAllOrders, getOrderById, 
    updateOrder, deleteOrder, getAllOrdersByUser 
} from "../controllers/orderController.js";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * /fourwheels/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       404:
 *         description: Car not found
 *       201:
 *         description: The order was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
router.post('/', auth, role(['customer']), addNewOrder);

/**
 * @swagger 
 * /fourwheels/orders: 
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: The list of the orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order' 
 */
router.get('/', auth, role(['admin']), getAllOrders);

/**
 * @swagger
 * /fourwheels/orders/users/{userId}:
 *   get:
 *     summary: Get all orders by user
 *     tags: [Orders]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The list of the orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get('/users', auth, role(['customer']), getAllOrdersByUser);

/**
 * @swagger
 * /fourwheels/orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: The order was successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 */
router.get('/:id', auth, getOrderById);

/**
 * @swagger
 * /fourwheels/orders/{id}:
 *   put:
 *     summary: Update an order
 *     tags: [Orders]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: The order was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 */
router.put('/:id', auth, role(['admin']), updateOrder);

/**
 * @swagger
 * /fourwheels/orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: The order was successfully deleted
 *       404:
 *         description: Order not found
 */
router.delete('/:id', auth, role(['admin']), deleteOrder);

export default router;
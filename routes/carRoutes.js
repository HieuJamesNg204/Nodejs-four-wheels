import express from 'express';
import { addNewCar, getAllCars, getCarById, updateCar, deleteCar } from '../controllers/carController.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/', auth, getAllCars);
router.get('/:id', auth, getCarById);
router.post('/', auth, addNewCar);
router.put('/:id', auth, updateCar);
router.delete('/:id', auth, deleteCar);

export default router;
import express from 'express';
import { addNewCar, getAllCars, getCarById, updateCar, deleteCar } from '../controllers/carController.js';
const router = express.Router();

router.get('/', getAllCars);
router.get('/:id', getCarById);
router.post('/', addNewCar);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

export default router;
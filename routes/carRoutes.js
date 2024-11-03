import express from 'express';
import { addNewCar, getAllCars, getCarById, updateCar, deleteCar, getCarsByAutomaker } from '../controllers/carController.js';
import auth from '../middleware/auth.js';
import role from '../middleware/role.js';
const router = express.Router();

router.get('/', auth, getAllCars);
router.get('/:id', auth, getCarById);
router.get('/getByAutomaker/:automaker', auth, getCarsByAutomaker);
router.post('/', auth, role(['admin']), addNewCar);
router.put('/:id', auth, role(['admin']), updateCar);
router.delete('/:id', auth, role(['admin']), deleteCar);

export default router;
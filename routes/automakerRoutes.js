import express from 'express';
import { 
    addNewAutomaker, getAllAutomakers, getAutomakerById, 
    updateAutomaker, deleteAutomaker 
} from '../controllers/automakerController.js';
const router = express.Router();

router.post('/', addNewAutomaker);
router.get('/', getAllAutomakers);
router.get('/:id', getAutomakerById);
router.put('/:id', updateAutomaker);
router.delete('/:id', deleteAutomaker);

export default router;
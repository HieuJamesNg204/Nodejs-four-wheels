import express from 'express';
import { 
    addNewAutomaker, getAllAutomakers, getAutomakerById, 
    updateAutomaker, deleteAutomaker 
} from '../controllers/automakerController.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.post('/', auth, addNewAutomaker);
router.get('/', auth, getAllAutomakers);
router.get('/:id', auth, getAutomakerById);
router.put('/:id', auth, updateAutomaker);
router.delete('/:id', auth, deleteAutomaker);

export default router;
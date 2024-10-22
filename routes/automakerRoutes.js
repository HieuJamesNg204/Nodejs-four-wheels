import express from 'express';
import { 
    addNewAutomaker, getAllAutomakers, getAutomakerById, 
    updateAutomaker, deleteAutomaker 
} from '../controllers/automakerController.js';
import auth from '../middleware/auth.js';
import role from '../middleware/role.js';
const router = express.Router();

router.post('/', auth, role(['admin']), addNewAutomaker);
router.get('/', auth, getAllAutomakers);
router.get('/:id', auth, getAutomakerById);
router.put('/:id', auth, role(['admin']), updateAutomaker);
router.delete('/:id', auth, role(['admin']), deleteAutomaker);

export default router;
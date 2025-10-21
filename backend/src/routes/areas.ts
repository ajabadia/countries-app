// backend/routes/areas.ts
import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { body, param } from 'express-validator';
import {
  getAllAreas,
  getAreaById,
  createArea,
  updateArea,
  deleteArea,
  deleteManyAreas,
} from '../controllers/areasController.js';

const router = Router();

router.get('/', getAllAreas);
router.get('/:id', param('id').isString().withMessage('ID must be a string'), getAreaById);
router.post('/', protect, body('defaultname').notEmpty().isString(), createArea);
router.put('/:id', protect, param('id').isString(), body('defaultname').optional().isString(), updateArea);
router.delete('/', protect, deleteManyAreas);
router.delete('/:id', protect, param('id').isString().withMessage('ID must be a string'), deleteArea);

export default router;
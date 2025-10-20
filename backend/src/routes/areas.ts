// backend/routes/areas.ts
import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  getAllAreas,
  getAreaById,
  createArea,
  updateArea,
  deleteArea,
} from '../controllers/areasController.js';

const router = Router();

router.get('/', getAllAreas);
router.get('/:id', param('id').isString().withMessage('ID must be a string'), getAreaById);
router.post('/', body('defaultname').notEmpty().isString(), createArea);
router.put('/:id', param('id').isString(), body('defaultname').optional().isString(), updateArea);
router.delete('/:id', param('id').isString().withMessage('ID must be a string'), deleteArea);

export default router;
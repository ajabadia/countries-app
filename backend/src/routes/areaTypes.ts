// backend/routes/areaTypes.ts
import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { body, param } from 'express-validator';
import {
  getAllAreaTypes,
  getAreaTypeById,
  createAreaType,
  updateAreaType,
  deleteAreaType,
  deleteManyAreaTypes,
} from '../controllers/areaTypesController.js';

const router = Router();

const createValidationRules = [
  body('area_id').notEmpty().isString().withMessage('area_id is required'),
  body('area_type').notEmpty().isString().withMessage('area_type is required'),
];

const updateValidationRules = [
  body('area_id').optional().isString().withMessage('area_id must be a string'),
  body('area_type').optional().isString().withMessage('area_type must be a string'),
];

router.get('/', getAllAreaTypes);
router.get('/:id', param('id').isString().withMessage('ID must be a string'), getAreaTypeById);
router.post('/', authenticateToken, createValidationRules, createAreaType);
router.put('/:id', authenticateToken, param('id').isString(), updateValidationRules, updateAreaType);
router.delete('/', authenticateToken, deleteManyAreaTypes);
router.delete('/:id', authenticateToken, param('id').isString().withMessage('ID must be a string'), deleteAreaType);

export default router;
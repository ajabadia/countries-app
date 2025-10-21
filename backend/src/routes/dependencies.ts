// backend/routes/dependencies.ts
import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { body, param } from 'express-validator';
import {
  getAllDependencies,
  getDependencyById,
  createDependency,
  updateDependency,
  deleteDependency,
  deleteManyDependencies,
} from '../controllers/dependenciesController.js';

const router = Router();

const validationRules = [
  body('parent_id').notEmpty().isString(),
  body('dependent_id').notEmpty().isString(),
];

router.get('/', getAllDependencies);
router.get('/:id', param('id').isNumeric(), getDependencyById);
router.post('/', protect, validationRules, createDependency);
router.put('/:id', protect, param('id').isNumeric(), validationRules.map(rule => rule.optional()), updateDependency);
router.delete('/', protect, deleteManyDependencies);
router.delete('/:id', protect, param('id').isNumeric(), deleteDependency);

export default router;
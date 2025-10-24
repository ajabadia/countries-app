// backend/routes/dependencies.ts
import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
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
router.post('/', authenticateToken, validationRules, createDependency);
router.put('/:id', authenticateToken, param('id').isNumeric(), validationRules.map(rule => rule.optional()), updateDependency);
router.delete('/', authenticateToken, deleteManyDependencies);
router.delete('/:id', authenticateToken, param('id').isNumeric(), deleteDependency);

export default router;
// backend/routes/dependencies.ts
import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  getAllDependencies,
  getDependencyById,
  createDependency,
  updateDependency,
  deleteDependency,
} from '../controllers/dependenciesController.js';

const router = Router();

const validationRules = [
  body('parent_id').notEmpty().isString(),
  body('dependent_id').notEmpty().isString(),
];

router.get('/', getAllDependencies);
router.get('/:id', param('id').isNumeric(), getDependencyById);
router.post('/', validationRules, createDependency);
router.put('/:id', param('id').isNumeric(), validationRules.map(rule => rule.optional()), updateDependency);
router.delete('/:id', param('id').isNumeric(), deleteDependency);

export default router;
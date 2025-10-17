// backend/routes/languages.ts
import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  getAllLanguages,
  getLanguageById,
  createLanguage,
  updateLanguage,
  deleteLanguage,
} from '../controllers/languagesController.js';

const router = Router();

const validationRules = [
  body('name').notEmpty().isString().withMessage('name is required'),
  body('active').isNumeric().withMessage('active must be a number (0 or 1)'),
];

router.get('/', getAllLanguages);
router.get('/:id', param('id').isString(), getLanguageById);
router.post('/', validationRules, createLanguage);
router.put('/:id', param('id').isString(), validationRules.map(rule => rule.optional()), updateLanguage);
router.delete('/:id', param('id').isString(), deleteLanguage);

export default router;
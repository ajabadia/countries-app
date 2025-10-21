// backend/routes/languages.ts
import { Router } from 'express';
import { body, param } from 'express-validator';
import { getAllLanguages, getLanguageById, createLanguage, updateLanguage, deleteLanguage, deleteManyLanguages, } from '../controllers/languagesController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = Router();
const createValidationRules = [
    body('name').notEmpty().isString().withMessage('name is required'),
    body('active').isNumeric().withMessage('active must be a number (0 or 1)'),
];
const updateValidationRules = [
    body('name').optional().isString().withMessage('name must be a string'),
    body('active').optional().isNumeric().withMessage('active must be a number (0 or 1)'),
];
router.get('/', getAllLanguages);
router.get('/:id', param('id').isString(), getLanguageById);
router.post('/', protect, createValidationRules, createLanguage);
router.put('/:id', protect, param('id').isString(), updateValidationRules, updateLanguage);
router.delete('/', protect, deleteManyLanguages);
router.delete('/:id', protect, param('id').isString(), deleteLanguage);
export default router;
//# sourceMappingURL=languages.js.map
// backend/routes/languages.ts
import { Router } from 'express';
import { body, param } from 'express-validator';
import { getAllLanguages, getLanguageById, createLanguage, updateLanguage, deleteLanguage, deleteManyLanguages, } from '../controllers/languagesController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
const router = Router();
const createValidationRules = [
    body('id').notEmpty().isString().withMessage('ID is required'),
    body('name').notEmpty().isString().withMessage('name is required'),
    body('active').isNumeric().withMessage('active must be a number (0 or 1)'),
];
const updateValidationRules = [
    body('id').optional().isString().withMessage('ID must be a string'),
    body('name').optional().isString().withMessage('name must be a string'),
    body('active').optional().isNumeric().withMessage('active must be a number (0 or 1)'),
];
router.get('/', getAllLanguages);
router.get('/:id', param('id').isString(), getLanguageById);
router.post('/', authenticateToken, createValidationRules, createLanguage);
router.put('/:id', authenticateToken, param('id').isString(), updateValidationRules, updateLanguage);
router.delete('/', authenticateToken, deleteManyLanguages);
router.delete('/:id', authenticateToken, param('id').isString(), deleteLanguage);
export default router;
//# sourceMappingURL=languages.js.map
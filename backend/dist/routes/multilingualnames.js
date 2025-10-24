// backend/routes/multilingualnames.ts
import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { body, param } from 'express-validator';
import { getAllMultilingualNames, getMultilingualNameById, createMultilingualName, updateMultilingualName, deleteMultilingualName, deleteManyMultilingualNames, } from '../controllers/multilingualnamesController.js';
const router = Router();
const validationRules = [
    body('entity_id').notEmpty().isString(),
    body('language').notEmpty().isString(),
    body('value').notEmpty().isString(),
    body('type').notEmpty().isString(),
];
router.get('/', getAllMultilingualNames);
router.get('/:id', param('id').isNumeric(), getMultilingualNameById);
router.post('/', authenticateToken, validationRules, createMultilingualName);
router.put('/:id', authenticateToken, param('id').isNumeric(), validationRules.map(rule => rule.optional()), updateMultilingualName);
router.delete('/', authenticateToken, deleteManyMultilingualNames);
router.delete('/:id', authenticateToken, param('id').isNumeric(), deleteMultilingualName);
export default router;
//# sourceMappingURL=multilingualnames.js.map
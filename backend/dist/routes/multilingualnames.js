// backend/routes/multilingualnames.ts
import { Router } from 'express';
import { body, param } from 'express-validator';
import { getAllMultilingualNames, getMultilingualNameById, createMultilingualName, updateMultilingualName, deleteMultilingualName, } from '../controllers/multilingualnamesController.js';
const router = Router();
const validationRules = [
    body('entity_id').notEmpty().isString(),
    body('language').notEmpty().isString(),
    body('value').notEmpty().isString(),
    body('type').notEmpty().isString(),
];
router.get('/', getAllMultilingualNames);
router.get('/:id', param('id').isNumeric(), getMultilingualNameById);
router.post('/', validationRules, createMultilingualName);
router.put('/:id', param('id').isNumeric(), validationRules.map(rule => rule.optional()), updateMultilingualName);
router.delete('/:id', param('id').isNumeric(), deleteMultilingualName);
export default router;
//# sourceMappingURL=multilingualnames.js.map
// backend/routes/areas.ts
import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { body, param } from 'express-validator';
import { getAllAreas, getAreaById, createArea, updateArea, deleteArea, deleteManyAreas, } from '../controllers/areasController.js';
const router = Router();
const createValidationRules = [
    body('id').notEmpty().isString().withMessage('ID is required'),
    body('defaultname').notEmpty().isString().withMessage('defaultname is required'),
];
const updateValidationRules = [
    body('id').optional().isString().withMessage('ID must be a string'),
    body('defaultname').optional().isString().withMessage('defaultname must be a string'),
];
router.get('/', getAllAreas);
router.get('/:id', param('id').isString().withMessage('ID must be a string'), getAreaById);
router.post('/', protect, createValidationRules, createArea);
router.put('/:id', protect, param('id').isString(), updateValidationRules, updateArea);
router.delete('/', protect, deleteManyAreas);
router.delete('/:id', protect, param('id').isString().withMessage('ID must be a string'), deleteArea);
export default router;
//# sourceMappingURL=areas.js.map
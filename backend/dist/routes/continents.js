// backend/routes/continents.ts
import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { body, param } from 'express-validator';
import { getAllContinents, getContinentById, createContinent, updateContinent, deleteContinent, deleteManyContinents, } from '../controllers/continentsController.js';
const router = Router();
const createValidationRules = [
    body('id').isString().isLength({ min: 3, max: 3 }).matches(/^\d{3}$/).withMessage('ID must be a 3-digit string'),
    body('defaultname').notEmpty().isString().withMessage('defaultname is required'),
];
const updateValidationRules = [
    body('id').optional().isString().isLength({ min: 3, max: 3 }).matches(/^\d{3}$/).withMessage('ID must be a 3-digit string'),
    body('defaultname').optional().isString().withMessage('defaultname must be a string'),
];
router.get('/', getAllContinents);
router.get('/:id', param('id').isString().withMessage('ID must be a string'), getContinentById);
router.post('/', authenticateToken, createValidationRules, createContinent);
router.put('/:id', authenticateToken, param('id').isString(), updateValidationRules, updateContinent);
router.delete('/', authenticateToken, deleteManyContinents);
router.delete('/:id', authenticateToken, param('id').isString().withMessage('ID must be a string'), deleteContinent);
export default router;
//# sourceMappingURL=continents.js.map
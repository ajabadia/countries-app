// backend/routes/continents.ts
import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  getAllContinents,
  getContinentById,
  createContinent,
  updateContinent,
  deleteContinent,
} from '../controllers/continentsController.js';

const router = Router();

router.get('/', getAllContinents);
router.get('/:id', param('id').isString().withMessage('ID must be a string'), getContinentById);
router.post('/', body('defaultname').notEmpty().isString(), createContinent);
router.put('/:id', param('id').isString(), body('defaultname').optional().isString(), updateContinent);
router.delete('/:id', param('id').isString().withMessage('ID must be a string'), deleteContinent);

export default router;
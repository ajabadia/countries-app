// backend/src/routes/users.ts

import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  deleteManyUsers,
} from '../controllers/usersController.js';
import { authenticateToken, authorize } from '../middleware/authMiddleware.js';

const router = Router();

const userValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('A valid email is required'),
  body('role').isIn(['user', 'admin']).withMessage('Invalid role'),
  body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

router.get('/', authenticateToken, authorize(['admin']), getAllUsers);
router.get('/:id', authenticateToken, authorize(['admin']), getUserById);
router.post('/', authenticateToken, authorize(['admin']), userValidationRules, createUser);
router.put('/:id', authenticateToken, authorize(['admin']), param('id').isNumeric(), userValidationRules, updateUser);
router.delete('/', authenticateToken, authorize(['admin']), deleteManyUsers);
router.delete('/:id', authenticateToken, authorize(['admin']), param('id').isNumeric(), deleteUser);

export default router;
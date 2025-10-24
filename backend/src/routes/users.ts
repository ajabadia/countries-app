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
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = Router();

const userValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('A valid email is required'),
  body('role').isIn(['user', 'admin']).withMessage('Invalid role'),
  body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

router.get('/', protect, authorize(['admin']), getAllUsers);
router.get('/:id', protect, authorize(['admin']), getUserById);
router.post('/', protect, authorize(['admin']), userValidationRules, createUser);
router.put('/:id', protect, authorize(['admin']), param('id').isNumeric(), userValidationRules, updateUser);
router.delete('/', protect, authorize(['admin']), deleteManyUsers);
router.delete('/:id', protect, authorize(['admin']), param('id').isNumeric(), deleteUser);

export default router;
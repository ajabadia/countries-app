// backend/src/routes/users.ts

import { Router } from 'express';
import { body, param } from 'express-validator';
import { authenticateToken, authorize } from '../middleware/authMiddleware.js';
import { getAllUsers, deleteUser, updateUserRole } from '../controllers/usersController.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = Router();

// Todas las rutas en este fichero están protegidas y requieren rol de administrador.
router.use(authenticateToken, authorize(['admin']));

/**
 * @route   GET /api/admin/users
 * @desc    Obtiene todos los usuarios
 * @access  Private/Admin
 */
router.get('/', getAllUsers);

/**
 * @route   DELETE /api/admin/users/:id
 * @desc    Elimina un usuario
 * @access  Private/Admin
 */
router.delete('/:id', param('id').isUUID().withMessage('El ID de usuario debe ser un UUID válido'), validateRequest, deleteUser);

/**
 * @route   PUT /api/admin/users/:id/role
 * @desc    Actualiza el rol de un usuario
 * @access  Private/Admin
 */
router.put('/:id/role', [param('id').isUUID(), body('role').isIn(['user', 'admin'])], validateRequest, updateUserRole);

export default router;
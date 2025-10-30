// backend/src/controllers/usersController.ts

import type { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import usersService from '../services/usersService.js';
import auditLogService from '../services/auditLogService.js';
import { NotFoundError, ValidationError } from '../errors/httpErrors.js';

/**
 * @desc    Get all users (Admin only)
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const { data, total } = await usersService.getAll(req.query);

  // Por seguridad, nunca devolvemos las contraseñas en la respuesta.
  const usersWithoutPassword = data.map(({ password, ...user }) => user);

  res.json({
    data: usersWithoutPassword,
    total,
  });
});

/**
 * @desc    Update a user's role (Admin only)
 * @route   PUT /api/admin/users/:id/role
 * @access  Private/Admin
 */
export const updateUserRole = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['admin', 'user'].includes(role)) {
    throw new ValidationError([{ msg: 'Invalid role provided. Must be "admin" or "user".' }]);
  }

  const userToUpdate = await usersService.getById(id);
  if (!userToUpdate) {
    throw new NotFoundError('User not found');
  }

  const updatedUser = await usersService.update(id, { role });

  auditLogService.logEvent({
    level: 'INFO',
    eventType: 'ROLE_UPDATED',
    userId: req.user!.id,
    targetUserId: id,
    details: `User role changed from '${userToUpdate.role}' to '${role}'.`,
    ipAddress: req.ip,
  });

  res.json(updatedUser);
});

/**
 * @desc    Delete a user (Admin only)
 * @route   DELETE /api/admin/users/:id
 * @access  Private/Admin
 */
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (req.user && req.user.id.toString() === id) {
    throw new ValidationError([{ msg: 'Administrators cannot delete their own account.' }]);
  }

  const result = await usersService.remove(id);

  if (result.changes === 0) {
    throw new NotFoundError(`User with id ${id} not found`);
  }

  res.status(200).json({ message: 'User removed successfully' });
});

// NOTA: No se incluye create/update genérico porque el registro y la actualización de perfil
// tienen lógicas específicas en authController. La gestión de usuarios por un admin
// se limita a estas tres acciones por ahora.
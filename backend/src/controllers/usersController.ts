// backend/src/controllers/usersController.ts

import { createCrudController } from './baseController.js';
import usersService from '../services/usersService.js';
import type { User } from '../types/user.types.js';

// Función para sanitizar el body, extrayendo solo las propiedades permitidas.
const sanitizeUser = (body: any): Partial<User> => {
  const { name, email, role, password } = body;
  const sanitizedData: Partial<User> = {};
  if (name !== undefined) sanitizedData.name = name;
  if (email !== undefined) sanitizedData.email = email;
  if (role !== undefined) sanitizedData.role = role;
  if (password !== undefined) sanitizedData.password = password;
  return sanitizedData;
};

const {
  getAll: getAllUsers,
  getById: getUserById,
  create: createUser,
  update: updateUser,
  delete: deleteUser,
  removeMany: deleteManyUsers,
} = createCrudController<User>(
  usersService, // El servicio específico para usuarios
  'User', // Nombre de la entidad para los mensajes de error
  sanitizeUser // La función que limpia los datos de entrada
);

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  deleteManyUsers,
};

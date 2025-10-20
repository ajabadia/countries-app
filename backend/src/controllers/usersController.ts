// backend/src/controllers/usersController.ts

import { createCrudController } from './baseController.js';
import usersService from '../services/usersService.js';
import type { User } from '../types/user.types.js';

// Función para sanitizar el body, extrayendo solo las propiedades permitidas.
const sanitizeUser = (body: any): Partial<User> => {
  const { name, email, role } = body;
  const sanitizedData: Partial<User> = {};
  if (name !== undefined) sanitizedData.name = name;
  if (email !== undefined) sanitizedData.email = email;
  if (role !== undefined) sanitizedData.role = role;
  return sanitizedData;
};

const usersController = createCrudController<User>(
  usersService,
  'User', // Nombre de la entidad
  sanitizeUser // Función para limpiar el body
);

// Aquí podrías añadir métodos específicos para el controlador de usuarios si los necesitaras.
// Por ejemplo:
// usersController.changePassword = ...

export default usersController;
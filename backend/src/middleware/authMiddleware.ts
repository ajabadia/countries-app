// backend/middleware/authMiddleware.ts

import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import usersService from '../services/usersService.js'; // Ruta corregida implícitamente por el movimiento de archivos
import { AuthenticationError, ForbiddenError } from '../errors/httpErrors.js'; // Ruta corregida

/**
 * Interfaz para el payload decodificado del JWT.
 */
interface JwtPayload {
  id: string;
  role: 'admin' | 'user';
}

/**
 * Middleware para proteger rutas. Verifica el JWT y adjunta el usuario a la petición.
 */
export const authenticateToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token;

  // El token se espera en el formato 'Bearer <token>'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRET_JWT_SEED || 'DEFAULT_SECRET') as JwtPayload;

      // Ahora la llamada al servicio es asíncrona
      const user = await usersService.getById(decoded.id);
      if (!user) {
        throw new AuthenticationError('Not authorized, user not found');
      }

      // TypeScript ahora reconoce req.user gracias a la extensión de tipos.
      req.user = user;
      next();
    } catch (error) {
      throw new AuthenticationError('Not authorized, token failed');
    }
  } else {
    // Si no hay cabecera de autorización, pasamos el error.
    throw new AuthenticationError('Not authorized, no token');
  }
});

/**
 * Factoría de middleware para autorización basada en roles.
 * @param allowedRoles Array de roles permitidos para acceder a la ruta.
 * @returns Un middleware de Express.
 */
export const authorize = (allowedRoles: Array<'admin' | 'user'>) => {
  return [
    authenticateToken, // Primero, siempre protegemos la ruta para obtener req.user
    (req: Request, res: Response, next: NextFunction) => {
    // Si el rol del usuario no está en la lista de roles permitidos, denegamos el acceso.
      if (!req.user || !allowedRoles.includes(req.user.role || 'user')) {
      return next(new ForbiddenError('You do not have permission to perform this action.'));
    }
      next(); // El usuario está autenticado y tiene el rol correcto.
    },
  ];
};
// backend/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpError } from '../errors/httpErrors.js';

/**
 * Middleware de autenticación basado en JWT.
 * Verifica el token 'Bearer' en la cabecera de autorización.
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Si no hay cabecera o no tiene el formato correcto, denegamos el acceso.
    throw new HttpError(401, 'Authentication token is required.');
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verificamos el token con nuestra clave secreta.
    // Es CRÍTICO que JWT_SECRET se configure como una variable de entorno.
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET environment variable is not set.');
      throw new HttpError(500, 'Server configuration error.');
    }

    jwt.verify(token, secret);

    // Si el token es válido, continuamos a la siguiente función (el controlador).
    next();
  } catch (error) {
    // Si el token es inválido (expirado, malformado, etc.), lanzamos un error.
    throw new HttpError(401, 'Invalid or expired token.');
  }
};
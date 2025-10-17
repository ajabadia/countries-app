// backend/middleware/errorHandler.ts
import type { Request, Response, NextFunction } from 'express';
import { HttpError, ValidationError } from '../errors/httpErrors.js';

interface SqliteError extends Error {
  code: string;
}

/**
 * Middleware de manejo de errores centralizado.
 * Captura los errores que ocurren en los controladores asíncronos.
 */
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  // Manejo específico para errores de validación.
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({ message: err.message, errors: err.errors });
  }

  // Si el error es una instancia de nuestros errores HTTP personalizados, lo manejamos aquí.
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Manejo de errores específicos, como violaciones de constraints de la base de datos.
  if ((err as SqliteError).code === 'SQLITE_CONSTRAINT_UNIQUE') {
    return res.status(409).json({ message: 'Conflict: The resource already exists or a unique field is duplicated.' });
  }

  // Respuesta genérica para otros errores del servidor
  res.status(500).json({
    message: 'An unexpected error occurred on the server.',
  });
};
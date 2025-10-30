// backend/src/middleware/validateRequest.ts

import type { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ValidationError } from '../errors/httpErrors.js';

/**
 * Middleware para procesar los resultados de express-validator.
 * Si hay errores de validación, lanza un error ValidationError.
 * Si no, pasa al siguiente middleware.
 */
export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  throw new ValidationError(errors.array());
};
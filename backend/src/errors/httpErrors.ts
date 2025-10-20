// backend/errors/httpErrors.ts

/**
 * Clase base para todos los errores HTTP personalizados.
 */
export class HttpError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    // Mantiene el stack trace correcto para errores personalizados
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Error para problemas de validación (400 Bad Request).
 */
export class ValidationError extends HttpError {
  public errors: any[];

  constructor(errors: any[], message = 'Validation failed') {
    super(400, message);
    this.errors = errors;
  }
}

/**
 * Error para recursos no encontrados (404 Not Found).
 */
export class NotFoundError extends HttpError {
  constructor(message = 'Resource not found') {
    super(404, message);
  }
}

/**
 * Error para problemas de autenticación (401 Unauthorized).
 */
export class AuthenticationError extends HttpError {
  constructor(message = 'Authentication failed') {
    super(401, message);
  }
}

/**
 * Error para acceso prohibido (403 Forbidden).
 */
export class ForbiddenError extends HttpError {
  constructor(message = 'Access denied') {
    super(403, message);
  }
}
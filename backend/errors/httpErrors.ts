// backend/errors/httpErrors.ts

/**
 * Clase base para todos los errores HTTP personalizados.
 * Contiene un `statusCode` para que el `errorHandler` sepa cómo responder.
 */
export class HttpError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    // Esto es necesario para que `instanceof` funcione correctamente con clases de error personalizadas en TypeScript.
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Error específico para respuestas 404 Not Found.
 */
export class NotFoundError extends HttpError {
  constructor(message: string = 'Resource not found') {
    super(404, message);
  }
}

/**
 * Error específico para respuestas 400 Bad Request debido a errores de validación.
 * Contiene el array de errores generado por express-validator.
 */
export class ValidationError extends HttpError {
  public readonly errors: any[];

  constructor(errors: any[], message: string = 'Validation failed') {
    super(400, message);
    this.errors = errors;
  }
}
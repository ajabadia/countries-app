// backend/middleware/errorHandler.js

/**
 * Middleware centralizado para manejar errores de la aplicación.
 * Debe ser el último middleware que se añade en app.js.
 * @param {Error} err - El objeto de error.
 * @param {import('express').Request} req - El objeto de petición.
 * @param {import('express').Response} res - El objeto de respuesta.
 * @param {import('express').NextFunction} next - La función para pasar al siguiente middleware.
 */
function errorHandler(err, req, res, next) {
  // Es bueno tener un código de estado por defecto
  const statusCode = err.statusCode || 500;

  // Loguear el error es importante, especialmente en desarrollo
  console.error(err);

  // Errores de base de datos (SQLite)
  if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
    return res.status(409).json({ error: 'Conflicto: El registro ya existe.' });
  }

  // Para otros errores, podemos enviar un mensaje genérico en producción
  // y un mensaje más detallado en desarrollo.
  const message = (process.env.NODE_ENV === 'production' && statusCode === 500)
    ? 'Ha ocurrido un error inesperado en el servidor.'
    : err.message;

  res.status(statusCode).json({
    error: message,
    // Opcional: solo enviar el stack en desarrollo
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
}

module.exports = errorHandler;
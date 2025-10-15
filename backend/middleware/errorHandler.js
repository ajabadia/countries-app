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
  console.error(err.stack); // Log del error para depuración

  // Errores de base de datos (SQLite)
  if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
    return res.status(409).json({ error: 'Conflicto: El registro ya existe.' });
  }

  // Error genérico del servidor
  res.status(500).json({ error: 'Ha ocurrido un error inesperado en el servidor.' });
}

module.exports = errorHandler;
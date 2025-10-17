import logger from '../config/logger.js';
import { HttpError, ValidationError } from '../errors/httpErrors.js'; // Mantener esta línea
/**
 * Middleware de manejo de errores centralizado.
 * Captura los errores que ocurren en los controladores asíncronos.
 */
export const errorHandler = (err, req, res, next) => {
    // Logueamos el error completo con su stack trace usando Winston.
    logger.error(err.message, { stack: err.stack, path: req.path });
    // Manejo específico para errores de validación.
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json({ message: err.message, errors: err.errors });
    }
    // Si el error es una instancia de nuestros errores HTTP personalizados, lo manejamos aquí.
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    // Manejo de errores específicos, como violaciones de constraints de la base de datos.
    // Comprobamos si el error tiene una propiedad 'code', que es característico de errores de BD.
    // Esto es más seguro que 'instanceof' que no funciona post-transpilación.
    if ('code' in err && err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return res.status(409).json({ message: 'Conflict: The resource already exists or a unique field is duplicated.' });
    }
    // Respuesta genérica para otros errores del servidor
    res.status(500).json({
        message: 'An unexpected error occurred on the server.',
    });
};
//# sourceMappingURL=errorHandler.js.map
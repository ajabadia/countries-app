// backend/routes/auth.ts
import { Router } from 'express';
import { check } from 'express-validator'; // Mantenemos express-validator
import rateLimit from 'express-rate-limit';
import { register, login, getProfile, refreshToken, logout, updateProfile, updatePassword, // Esta es la que necesitamos
// ... el resto de tus controladores existentes
 } from '../controllers/authController.js'; // Aseguramos que apunta a tu controlador
import { authenticateToken } from '../middleware/authMiddleware.js'; // Usamos tus middlewares
const router = Router();
/**
 * @route   POST /api/auth/register
 * @desc    Registra un nuevo usuario
 * @access  Public
 */
router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
], register);
/**
 * @route   POST /api/auth/login
 * @desc    Autentica un usuario y obtiene un token
 * @access  Public
 */
// Creamos un limitador de tasa específico para el login.
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Ventana de 15 minutos
    max: 10, // Límite de 10 intentos de login por IP durante la ventana de tiempo
    message: { message: 'Too many login attempts from this IP, please try again after 15 minutes' },
    standardHeaders: true, // Devuelve la información del límite en las cabeceras `RateLimit-*`
    legacyHeaders: false, // Deshabilita las cabeceras `X-RateLimit-*`
});
router.post('/login', loginLimiter, // Aplicamos el middleware de rate limiting aquí
[check('email', 'Please include a valid email').isEmail(), check('password', 'Password is required').exists()], login);
/**
 * @route   GET /api/auth/profile
 * @desc    Obtiene el perfil del usuario autenticado
 * @access  Private
 */
// Usamos el middleware 'authenticateToken' para asegurar que solo usuarios autenticados puedan acceder.
router.get('/profile', authenticateToken, getProfile);
/**
 * @route   PUT /api/auth/profile
 * @desc    Actualiza el perfil del usuario autenticado (nombre, email)
 * @access  Private
 */
router.put('/profile', authenticateToken, [
    check('name', 'Name must be a string').optional().isString(),
    check('email', 'Please include a valid email').optional().isEmail(),
], updateProfile);
/**
 * @route   PUT /api/auth/profile/password
 * @desc    Actualiza la contraseña del usuario autenticado
 * @access  Private
 */
router.put('/profile/password', authenticateToken, // Protegemos la ruta
[
    check('currentPassword', 'Current password is required').not().isEmpty(),
    check('newPassword', 'New password must be 8 or more characters').isLength({ min: 8 }),
], 
// ✅ CORRECCIÓN: Nos aseguramos de llamar a la función correcta de tu controlador.
// La que yo propuse se llamaba 'changePassword', la tuya 'updatePassword'. Usamos la tuya.
updatePassword);
/**
 * @route   GET /api/auth/refresh-token
 * @desc    Obtiene un nuevo access token usando el refresh token
 * @access  Public (pero requiere una cookie válida)
 */
router.post('/refresh-token', refreshToken); // Cambiado a POST por consistencia
router.post('/logout', logout); // Aseguramos que la ruta de logout existe
export default router;
//# sourceMappingURL=auth.js.map
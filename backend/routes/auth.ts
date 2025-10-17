// backend/routes/auth.ts

import { Router } from 'express';
import { check } from 'express-validator';
import rateLimit from 'express-rate-limit';
import {
  register,
  login,
  getProfile,
  refreshToken,
  logout,
  updateProfile,
  updateUserRole,
  getUsers,
  updatePassword,
  deleteUser,
  forgotPassword,
  resetPassword,
  getAuditLogs,
  deleteOldAuditLogs,
} from '../controllers/authController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Registra un nuevo usuario
 * @access  Public
 */
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  ],
  register
);

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

router.post(
  '/login',
  loginLimiter, // Aplicamos el middleware de rate limiting aquí
  [check('email', 'Please include a valid email').isEmail(), check('password', 'Password is required').exists()],
  login
);

/**
 * @route   GET /api/auth/profile
 * @desc    Obtiene el perfil del usuario autenticado
 * @access  Private
 */
// Usamos el middleware 'protect' para asegurar que solo usuarios autenticados puedan acceder.
router.get('/profile', protect, getProfile);

/**
 * @route   PUT /api/auth/profile
 * @desc    Actualiza el perfil del usuario autenticado (nombre, email)
 * @access  Private
 */
router.put(
  '/profile',
  protect,
  [
    check('name', 'Name must be a string').optional().isString(),
    check('email', 'Please include a valid email').optional().isEmail(),
  ],
  updateProfile
);
/**
 * @route   PUT /api/auth/users/:id/role
 * @desc    Actualiza el rol de un usuario (solo administradores)
 * @access  Private/Admin
 */
// Solo los usuarios con rol 'admin' pueden acceder a esta ruta.
// Se espera un body como { "role": "admin" } o { "role": "user" }
router.put('/users/:id/role', authorize(['admin']), updateUserRole);

/**
 * @route   GET /api/auth/users
 * @desc    Obtiene una lista de todos los usuarios (solo administradores)
 * @access  Private/Admin
 */
// Solo los usuarios con rol 'admin' pueden acceder.
router.get('/users', authorize(['admin']), getUsers);

/**
 * @route   PUT /api/auth/profile/password
 * @desc    Actualiza la contraseña del usuario autenticado
 * @access  Private
 */
router.put(
  '/profile/password',
  protect, // Protegemos la ruta para que solo usuarios autenticados puedan acceder
  [
    check('currentPassword', 'Current password is required').not().isEmpty(),
    check('newPassword', 'New password must be 6 or more characters').isLength({ min: 6 }),
  ],
  updatePassword
);

/**
 * @route   DELETE /api/auth/users/:id
 * @desc    Elimina un usuario (solo administradores)
 * @access  Private/Admin
 */
router.delete('/users/:id', authorize(['admin']), deleteUser);

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Inicia el proceso de reseteo de contraseña
 * @access  Public
 */
router.post('/forgot-password', [check('email', 'Please include a valid email').isEmail()], forgotPassword);

/**
 * @route   PUT /api/auth/reset-password/:resettoken
 * @desc    Resetea la contraseña usando un token
 * @access  Public
 */
router.put(
  '/reset-password/:resettoken',
  [check('password', 'Password must be 6 or more characters').isLength({ min: 6 })],
  resetPassword
);

/**
 * @route   GET /api/auth/audit-logs
 * @desc    Obtiene una lista de todos los logs de auditoría (solo administradores)
 * @access  Private/Admin
 */
router.get('/audit-logs', authorize(['admin']), getAuditLogs);

/**
 * @route   DELETE /api/auth/audit-logs
 * @desc    Elimina logs de auditoría antiguos (solo administradores)
 * @access  Private/Admin
 */
router.delete('/audit-logs', authorize(['admin']), deleteOldAuditLogs);

/**
 * @route   GET /api/auth/refresh-token
 * @desc    Obtiene un nuevo access token usando el refresh token
 * @access  Public (pero requiere una cookie válida)
 */
router.get('/refresh-token', refreshToken);

export default router;
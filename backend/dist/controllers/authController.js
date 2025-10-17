// controllers/authController.ts
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import usersService from '../services/usersService.js';
import { ValidationError, NotFoundError, AuthenticationError, ForbiddenError } from '../errors/httpErrors.js';
import { sendEmail } from '../utils/sendEmail.js';
import auditLogService from '../services/auditLogService.js';
import logger from '../config/logger.js';
const generateJWT = (user) => {
    // Aseguramos que la variable de entorno exista en tiempo de ejecución.
    if (!process.env.SECRET_JWT_SEED) {
        throw new Error('FATAL_ERROR: SECRET_JWT_SEED is not defined in environment variables.');
    }
    const payload = { id: user.id, name: user.name, role: user.role || 'user' };
    return jwt.sign(payload, process.env.SECRET_JWT_SEED, {
        expiresIn: '2h',
    });
};
const generateRefreshToken = (user) => {
    // Aseguramos que la variable de entorno exista en tiempo de ejecución.
    if (!process.env.REFRESH_TOKEN_SECRET) {
        throw new Error('FATAL_ERROR: REFRESH_TOKEN_SECRET is not defined in environment variables.');
    }
    return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
    });
};
// Constantes para la política de bloqueo de cuenta
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_TIME_MINUTES = 15;
/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }
    const { email, password, name } = req.body;
    const existingUser = await usersService.findByEmail(email);
    if (existingUser) {
        // Reutilizamos ValidationError para indicar un conflicto con los datos enviados.
        throw new ValidationError([{ msg: 'User with this email already exists' }]);
    }
    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Creamos el nuevo usuario
    const userData = { name, email, password: hashedPassword, role: 'user' }; // Rol por defecto 'user'
    const result = await usersService.create(userData);
    // Obtenemos el usuario recién creado para generar el token
    // Usamos el ID del registro insertado, es más eficiente que buscar por email.
    const createdUser = await usersService.getById(result.lastInsertRowid);
    if (!createdUser) {
        throw new Error('Failed to create user.'); // Error interno del servidor
    }
    const token = generateJWT(createdUser);
    res.status(201).json({
        id: result.lastInsertRowid,
        name: createdUser.name,
        email: createdUser.email,
        token,
    });
});
/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }
    const { email, password } = req.body;
    const user = await usersService.findByEmail(email);
    if (!user) {
        // Previene la enumeración de usuarios. No revelamos si el usuario existe.
        throw new AuthenticationError('Invalid credentials');
    }
    // 1. Comprobar si la cuenta está bloqueada
    if (user.lockUntil && user.lockUntil > Date.now()) {
        const timeLeft = Math.ceil((user.lockUntil - Date.now()) / 60000);
        throw new AuthenticationError(`Account is locked. Please try again in ${timeLeft} minutes.`);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        // 2. Contraseña incorrecta: incrementar intentos fallidos
        const newFailedAttempts = (user.failedLoginAttempts || 0) + 1;
        let updateData = { failedLoginAttempts: newFailedAttempts };
        if (newFailedAttempts >= MAX_FAILED_ATTEMPTS) {
            // 3. Si se alcanza el límite, bloquear la cuenta
            updateData.lockUntil = Date.now() + LOCKOUT_TIME_MINUTES * 60 * 1000;
            updateData.failedLoginAttempts = 0; // Resetear contador tras bloquear
            // Registrar el evento de bloqueo de cuenta en el log de auditoría
            auditLogService.logEvent({
                level: 'WARN',
                eventType: 'ACCOUNT_LOCKED',
                targetUserId: user.id,
                details: `Account locked due to ${MAX_FAILED_ATTEMPTS} failed login attempts.`,
                ipAddress: req.ip,
            });
        }
        await usersService.update(user.id, updateData);
        throw new AuthenticationError('Invalid credentials');
    }
    // 4. Contraseña correcta: resetear los intentos fallidos si es necesario
    if (user.failedLoginAttempts && user.failedLoginAttempts > 0) {
        await usersService.update(user.id, {
            failedLoginAttempts: 0,
            lockUntil: null,
        });
    }
    // 5. Generar tokens
    const accessToken = generateJWT(user);
    const newRefreshToken = generateRefreshToken(user);
    // 6. Guardar el refresh token en la base de datos
    await usersService.update(user.id, { refreshToken: newRefreshToken });
    // 7. Enviar el refresh token en una cookie HttpOnly y el access token en el body
    res.cookie('jwt', newRefreshToken, {
        httpOnly: true, // El navegador no puede acceder a la cookie vía JS
        secure: process.env.NODE_ENV === 'production', // Solo enviar en HTTPS en producción
        sameSite: 'strict', // Mitiga ataques CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    });
    res.json({
        message: 'Logged in successfully',
        accessToken,
    });
});
/**
 * @desc    Get user profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
export const getProfile = asyncHandler(async (req, res) => {
    // req.user ya está disponible gracias al middleware 'protect' y la extensión de tipos.
    res.json(req.user);
});
/**
 * @desc    Update a user's role (Admin only)
 * @route   PUT /api/auth/users/:id/role
 * @access  Private/Admin
 */
export const updateUserRole = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    // Validar que el rol sea uno de los permitidos
    if (!['admin', 'user'].includes(role)) {
        throw new ValidationError([{ msg: 'Invalid role provided. Must be "admin" or "user".' }]);
    }
    // Verificar que el usuario a actualizar existe
    const userToUpdate = await usersService.getById(id);
    if (!userToUpdate) {
        throw new NotFoundError('User not found');
    }
    // Actualizar el rol del usuario
    await usersService.update(id, { role });
    // Registrar el cambio de rol en el log de auditoría
    auditLogService.logEvent({
        level: 'INFO',
        eventType: 'ROLE_UPDATED',
        userId: req.user.id, // El admin que realiza la acción. Usamos '!' para asegurar a TS que req.user no es nulo aquí.
        targetUserId: id, // El usuario cuyo rol fue cambiado
        details: `User role changed from '${userToUpdate.role}' to '${role}'.`,
        ipAddress: req.ip,
    });
    const updatedUser = await usersService.getById(id);
    res.json(updatedUser);
});
/**
 * @desc    Get all users (Admin only)
 * @route   GET /api/auth/users
 * @access  Private/Admin
 */
export const getUsers = asyncHandler(async (req, res) => {
    // Usamos el método getAll heredado de BaseService.
    // Pasamos los query params para permitir paginación, orden, etc.
    const { data, total } = await usersService.getAll(req.query);
    // Por seguridad, nunca devolvemos las contraseñas en la respuesta.
    const usersWithoutPassword = data.map(({ password, ...user }) => user);
    res.json({
        data: usersWithoutPassword,
        total,
    });
});
/**
 * @desc    Update user's own password
 * @route   PUT /api/auth/profile/password
 * @access  Private
 */
export const updatePassword = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }
    const { currentPassword, newPassword } = req.body;
    // Sabemos que req.user existe gracias al middleware 'protect'
    const userId = req.user.id; // Usamos '!' para asegurar a TS que req.user no es nulo aquí.
    // Obtenemos el usuario de la BD para comparar la contraseña hasheada
    const user = await usersService.getById(userId);
    if (!user) {
        // Este caso es improbable si el token es válido, pero es una buena práctica de seguridad
        throw new AuthenticationError('User not found');
    }
    // Verificamos si la contraseña actual es correcta
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        throw new AuthenticationError('Invalid current password');
    }
    // Hasheamos la nueva contraseña y la actualizamos
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await usersService.update(userId, { password: hashedPassword });
    res.json({ message: 'Password updated successfully' });
});
/**
 * @desc    Delete a user (Admin only)
 * @route   DELETE /api/auth/users/:id
 * @access  Private/Admin
 */
export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // Un administrador no puede eliminarse a sí mismo.
    if (req.user && req.user.id.toString() === id) { // req.user está definido por el middleware 'protect'
        throw new ValidationError([{ msg: 'Administrators cannot delete their own account.' }]);
    }
    const result = await usersService.remove(id);
    if (result.changes === 0) {
        throw new NotFoundError(`User with id ${id} not found`);
    }
    res.status(200).json({ message: 'User removed successfully' });
});
/**
 * @desc    Forgot password
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
export const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await usersService.findByEmail(email);
    if (!user) {
        // No revelamos si el usuario existe o no por seguridad.
        // Enviamos una respuesta exitosa genérica.
        res.status(200).json({ message: 'If a user with that email exists, a password reset link has been sent.' });
        return;
    }
    // 1. Generar un token de reseteo
    const resetToken = crypto.randomBytes(20).toString('hex');
    // 2. Hashear el token y guardarlo en la base de datos con una fecha de expiración (ej. 10 minutos)
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const expireDate = Date.now() + 10 * 60 * 1000; // 10 minutos
    await usersService.update(user.id, {
        resetPasswordToken: hashedToken,
        resetPasswordExpire: expireDate,
    });
    // 3. Crear la URL de reseteo para el frontend
    // Asegúrate de que la URL base del frontend esté en tus variables de entorno
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;
    try {
        await sendEmail({
            to: user.email,
            subject: 'Password Reset Token',
            text: message,
        });
        res.status(200).json({ message: 'Email sent' });
    }
    catch (err) {
        logger.error(`Failed to send password reset email to ${user.email}`, err);
        // Limpiamos el token si el email falla para que el usuario pueda intentarlo de nuevo.
        await usersService.update(user.id, {
            resetPasswordToken: null, // Usar null para consistencia con la BD
            resetPasswordExpire: null, // Usar null para consistencia con la BD
        });
        throw new Error('Email could not be sent');
    }
});
/**
 * @desc    Reset password
 * @route   PUT /api/auth/reset-password/:resettoken
 * @access  Public
 */
export const resetPassword = asyncHandler(async (req, res) => {
    // 1. Obtener el token hasheado a partir del token de la URL
    const resetToken = req.params.resettoken;
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    // 2. Buscar al usuario por el token hasheado y verificar que no haya expirado
    const user = await usersService.findByResetToken(hashedToken);
    if (!user) {
        throw new NotFoundError('Invalid or expired token');
    }
    // 3. Hashear la nueva contraseña
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // 4. Actualizar la contraseña y limpiar los campos de reseteo
    await usersService.update(user.id, {
        password: hashedPassword,
        resetPasswordToken: null, // Usar null para consistencia con la BD
        resetPasswordExpire: null, // Usar null para consistencia con la BD
    });
    // Opcional: generar un nuevo JWT y loguear al usuario automáticamente
    const token = generateJWT(user);
    res.status(200).json({ message: 'Password reset successfully', token });
});
/**
 * @desc    Update user's own profile (name, email)
 * @route   PUT /api/auth/profile
 * @access  Private
 */
export const updateProfile = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }
    const userId = req.user.id; // Usamos '!' para asegurar a TS que req.user no es nulo aquí.
    const { name, email } = req.body;
    // Obtener el usuario actual para realizar comprobaciones
    const currentUser = await usersService.getById(userId);
    if (!currentUser) {
        // Este caso es improbable si el token es válido, pero es una buena práctica de seguridad
        throw new AuthenticationError('User not found');
    }
    // Si el email se está cambiando, verificar que no esté ya en uso por otro usuario
    if (email && email !== currentUser.email) {
        const userExists = await usersService.findByEmail(email);
        if (userExists && userExists.id !== userId) {
            throw new ValidationError([{ msg: 'Email is already in use' }]);
        }
    }
    const updateData = {};
    if (name)
        updateData.name = name;
    if (email)
        updateData.email = email;
    await usersService.update(userId, updateData);
    const updatedUser = await usersService.getById(userId);
    res.json(updatedUser);
});
/**
 * @desc    Get all audit logs (Admin only)
 * @route   GET /api/auth/audit-logs
 * @access  Private/Admin
 */
export const getAuditLogs = asyncHandler(async (req, res) => {
    // Usamos el método getAll heredado de BaseService.
    // Pasamos los query params para permitir paginación, orden, etc.
    const { data, total } = await auditLogService.getAll(req.query);
    res.json({
        data,
        total,
    });
});
/**
 * @desc    Delete old audit logs (Admin only)
 * @route   DELETE /api/auth/audit-logs?before=YYYY-MM-DD
 * @access  Private/Admin
 */
export const deleteOldAuditLogs = asyncHandler(async (req, res) => {
    const { before } = req.query;
    // Validar que el parámetro 'before' exista y tenga el formato correcto.
    if (!before || typeof before !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(before)) {
        throw new ValidationError([{ msg: 'A "before" query parameter in YYYY-MM-DD format is required.' }]);
    }
    const result = await auditLogService.deleteOlderThan(before);
    res.status(200).json({
        message: `Successfully deleted ${result.changes} old audit logs.`,
    });
});
/**
 * @desc    Refresh access token
 * @route   GET /api/auth/refresh-token
 * @access  Public (requires cookie)
 */
export const refreshToken = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        throw new AuthenticationError('No refresh token provided');
    }
    const refreshToken = cookies.jwt;
    const foundUser = await usersService.findOneBy({ refreshToken });
    if (!foundUser) {
        throw new ForbiddenError('Invalid refresh token'); // El token no coincide con ningún usuario
    }
    // Verificar el refresh token
    try {
        if (!process.env.REFRESH_TOKEN_SECRET) {
            throw new Error('FATAL_ERROR: REFRESH_TOKEN_SECRET is not defined.');
        }
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (foundUser.id.toString() !== decoded.id.toString()) {
            throw new ForbiddenError('Token payload does not match user');
        }
        // Todo correcto, generar un nuevo access token
        const accessToken = generateJWT(foundUser);
        res.json({ accessToken });
    }
    catch (err) {
        throw new ForbiddenError('Invalid or expired refresh token');
    }
});
/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Public (requires cookie)
 */
export const logout = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        // Si no hay cookie, no hay nada que hacer
        res.sendStatus(204); // No Content
        return;
    }
    const refreshToken = cookies.jwt;
    // ¿Existe el usuario con este refresh token?
    const foundUser = await usersService.findOneBy({ refreshToken });
    if (foundUser) {
        // Borrar el refresh token de la base de datos
        await usersService.update(foundUser.id, { refreshToken: null }); // Usar null para consistencia con la BD
    }
    // Borrar la cookie del cliente
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ message: 'Logged out successfully' });
});
//# sourceMappingURL=authController.js.map
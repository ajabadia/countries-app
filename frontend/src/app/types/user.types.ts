/**
 * Representa una entidad de Usuario.
 */
export interface User {
  id: number; // ID autoincremental del usuario
  name: string; // Nombre de usuario
  email: string; // Email del usuario
  password?: string; // Contraseña (opcional, solo para creación/actualización)
  role: 'user' | 'admin'; // Rol del usuario
  // Campos de seguridad y auditoría
  failedLoginAttempts?: number;
  lockUntil?: number;
}
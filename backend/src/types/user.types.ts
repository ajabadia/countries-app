// backend/types/user.types.ts

export interface User {
  id: number;
  name: string;
  email: string;
  password: string; // Contraseña hasheada
  role?: 'admin' | 'user';
  resetPasswordToken?: string | null;
  resetPasswordExpire?: number | null;
  failedLoginAttempts?: number;
  lockUntil?: number | null;
  refreshToken?: string | null;
}

// Tipo para la creación de un usuario, donde el 'id' aún no existe.
export type UserCreation = Omit<User, 'id'>;
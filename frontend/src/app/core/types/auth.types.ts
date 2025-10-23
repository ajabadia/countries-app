// File: d:\desarrollos\countries2\frontend\src\app\core\types\auth.types.ts | New File

import { User } from '@core/types/user.types';

export interface AuthCredentials {
  // `username` es opcional porque solo se usa en el registro.
  username?: string;
  email: string;
  // `password` es opcional porque en algunas operaciones de autenticación
  // (como "recordar contraseña") podría no ser necesario.
  password?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}
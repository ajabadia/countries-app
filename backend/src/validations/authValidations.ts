import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres.'),
    email: z.string().email('Email inválido.'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres.'),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Email inválido.'),
    password: z.string().min(1, 'La contraseña es requerida.'),
  }),
});

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres.').optional(),
    email: z.string().email('Email inválido.').optional(),
  }).strip(), // Elimina campos no definidos en el schema
});

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, 'La contraseña actual es requerida.'),
    newPassword: z.string().min(8, 'La nueva contraseña debe tener al menos 8 caracteres.'),
  }),
});
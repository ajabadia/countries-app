// File: d/desarrollos/countries2/frontend/src/app/core/auth/guards/auth.guard.ts | Recovered File

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

/**
 * Un guardián funcional para proteger rutas que requieren autenticación.
 *
 * @returns `true` si el usuario está autenticado, de lo contrario,
 *          redirige a la página de login y devuelve `false`.
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirige al usuario a la página de login si no está autenticado.
  return router.parseUrl('/auth/login');
};
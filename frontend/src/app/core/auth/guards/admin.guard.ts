import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

/**
 * Un guardián funcional para proteger rutas que requieren rol de administrador.
 *
 * @returns `true` si el usuario es administrador, de lo contrario,
 *          redirige a la página de inicio y devuelve `false`.
 */
export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.currentUser()?.role === 'admin') {
    return true;
  }

  // Si no es admin, redirige a la página de inicio.
  return router.parseUrl('/');
};
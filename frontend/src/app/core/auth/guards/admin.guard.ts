// File: d/desarrollos/countries2/frontend/src/app/core/auth/guards/admin.guard.ts | Renamed from auth.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '@core/services/auth.service';

/**
 * Un guardián funcional para proteger rutas que requieren rol de administrador.
 * Comprueba si el usuario está autenticado y si tiene el rol 'admin'.
 */
export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/auth/login']);
    return false;
  }

  if (authService.currentUser()?.role !== 'admin') {
    router.navigate(['/']); // Si está logueado pero no es admin, redirige a la home.
    return false;
  }

  return true;
};
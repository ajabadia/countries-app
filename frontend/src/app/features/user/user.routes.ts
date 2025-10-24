import { Routes } from '@angular/router';
// ✅ CORRECCIÓN: Se ajusta la ruta relativa para que apunte correctamente al guard.
import { authGuard } from '../../core/auth/guards/auth.guard';

export const USER_ROUTES: Routes = [
  {
    path: 'profile',
    canActivate: [authGuard],
    // ✅ CORRECCIÓN: Se añade la carpeta 'user-profile' a la ruta de importación del componente.
    loadComponent: () => import('./user-profile/user-profile.component').then(c => c.UserProfileComponent),
    title: 'Mi Perfil'
  }
];

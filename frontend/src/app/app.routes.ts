// File: /frontend/src/app/app.routes.ts

import { Routes } from '@angular/router';
import { adminGuard } from '@core/auth/guards/admin.guard';
import { authGuard } from '@core/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    // ✅ CORRECCIÓN: Se carga directamente el nuevo HomeComponent (standalone)
    // que está en la ruta correcta, eliminando la dependencia con el
    // antiguo fichero de rutas que causaba el error.
    loadComponent: () =>
      import('@features/public/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'admin',
    // ✅ SOLUCIÓN: Aplicamos el guardián a la ruta padre de administración.
    canActivate: [adminGuard],
    // Carga diferida de todas las rutas de administración
    loadChildren: () =>
      import('@features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
  },
    {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
  {
    // ✅ CORRECCIÓN: Se asigna un segmento de ruta explícito para las rutas de usuario.
    path: 'user',
    // ✅ SIGUIENTE PASO: Aplicamos el guardián de autenticación.
    canActivate: [authGuard],
    loadChildren: () => import('./features/user/user.routes').then(m => m.USER_ROUTES)
  },
];
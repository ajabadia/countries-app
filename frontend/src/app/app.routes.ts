// src/app/app.routes.ts

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'public'
  },
  {
    path: 'public',
    loadChildren: () => import('./modules/public/public.routes').then(r => r.PUBLIC_ROUTES)
  },
  {
    path: 'admin',
    // ✅ REFACTORIZACIÓN FINAL: Cargamos el componente layout y sus rutas hijas directamente.
    // Esto nos permite eliminar AdminModule por completo.
    loadComponent: () => import('./modules/admin/admin/admin.component').then(c => c.AdminComponent),
    loadChildren: () => import('./modules/admin/admin.routes').then(r => r.ADMIN_ROUTES),
    // NOTA: Para que esto funcione, AdminComponent también debe ser standalone.
    // Si aún no lo es, lo haremos en el siguiente paso.
  },
  {
    path: '**',
    redirectTo: 'public'
  }
];
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
    // ✅ CAMBIO CLAVE: Cargamos directamente el array de rutas de administración.
    loadChildren: () => import('./modules/admin/admin.routes').then(r => r.ADMIN_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'public'
  }
];
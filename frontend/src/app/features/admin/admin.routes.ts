// File: d:\desarrollos\countries2\frontend\src\app\features\admin\admin.routes.ts | New File

import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(m => m.DashboardComponent), // <-- LÍNEA CORREGIDA
  },
  // Aquí irán las otras rutas de admin: /countries, /users, etc.
];
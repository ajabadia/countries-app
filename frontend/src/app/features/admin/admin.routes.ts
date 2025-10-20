// File: d:\desarrollos\countries2\frontend\src\app\features\admin\admin.routes.ts | New File

import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(m => m.DashboardAdminComponent),
  },
  // Aquí irán las otras rutas de admin: /countries, /users, etc.
];
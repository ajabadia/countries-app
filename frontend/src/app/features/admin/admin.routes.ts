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
  {
    path: 'users',
    loadComponent: () =>
      import('./users/users-admin.component').then(m => m.UsersAdminComponent),
  },
    {
    path: 'countries',
    loadComponent: () => import('./countries/countries-admin.component').then(m => m.CountriesAdminComponent),
  },
  {
    path: 'continents',
    loadComponent: () =>
      import('./continents/continents-admin.component').then(m => m.ContinentsAdminComponent),
  },
];
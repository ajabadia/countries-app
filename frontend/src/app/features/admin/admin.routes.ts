// File: d:\desarrollos\countries2\frontend\src\app\features\admin\admin.routes.ts | New File

import { Routes } from '@angular/router';
import { authGuard } from '@core/auth/guards/auth.guard'; // Temporalmente usamos authGuard como pediste.

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard], // ❗️ ADVERTENCIA: Esto permitirá el acceso a cualquier usuario logueado.
    children: [
      {
        path: '', // Redirige /admin a /admin/dashboard
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        // ✅ CORRECCIÓN: Apuntamos a tu dashboard.component existente.
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
        title: 'Dashboard'
      },
      {
        path: 'users',
        loadComponent: () => import('./users/users-admin.component').then(m => m.UsersAdminComponent),
        title: 'Gestión de Usuarios'
      },
      {
        path: 'countries',
        loadComponent: () => import('./countries/countries-admin.component').then(m => m.CountriesAdminComponent),
        title: 'Gestión de Países'
      },
      {
        path: 'continents',
        loadComponent: () => import('./continents/continents-admin.component').then(m => m.ContinentsAdminComponent),
        title: 'Gestión de Continentes'
      },
      {
        path: 'languages',
        loadComponent: () => import('./languages/languages-admin.component').then(m => m.LanguagesAdminComponent),
        title: 'Gestión de Idiomas'
      },
      {
        path: 'areas',
        loadComponent: () => import('./areas/areas-admin.component').then(m => m.AreasAdminComponent),
        title: 'Gestión de Áreas'
      },
    {
        path: 'multilingualnames',
        loadComponent: () => import('./multilingualnames/multilingualnames-admin.component').then(m => m.MultilingualnamesAdminComponent),
        title: 'Gestión de Traducciones'
      }
    ]
  }
];
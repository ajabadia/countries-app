// File: d:\desarrollos\countries2\frontend\src\app\features\admin\admin.routes.ts | New File

import { Routes } from '@angular/router';

// ✅ CORRECCIÓN: Se elimina la ruta padre anidada.
// `app.routes.ts` ya define el path '/admin' y aplica el guardián.
// Este archivo solo debe exportar el array de las rutas hijas.
export const ADMIN_ROUTES: Routes = [
  {
    path: '', // Redirige /admin a /admin/dashboard
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
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
    path: 'area_types',
    loadComponent: () => import('./area_types/area_types-admin.component').then(m => m.AreaTypesAdminComponent),
    title: 'Gestión de Tipos de Área',
  },
  {
    path: 'multilingualnames',
    loadComponent: () => import('./multilingualnames/multilingualnames-admin.component').then(m => m.MultilingualnamesAdminComponent),
    title: 'Gestión de Traducciones'
  },
  {
    path: 'dependencies',
    loadComponent: () => import('./dependencies/dependencies-admin.component').then(m => m.DependenciesAdminComponent),
    title: 'Gestión de Dependencias'
  },
  {
    path: 'test-layout',
    loadComponent: () => import('./test-layout/test-layout-admin.component').then(m => m.TestLayoutAdminComponent),
    title: 'Test Layout'
  },
];
import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'continents',
    loadComponent: () =>
      import('./pages/continents/admin-continents.component').then(
        (m) => m.AdminContinentsComponent
      ),
  },
  {
    path: 'dependencies',
    loadComponent: () =>
      import('./pages/areas/admin-dependencies.component').then(
        (m) => m.AdminDependenciesComponent
      ),
  },
  {
    path: 'languages',
    loadComponent: () =>
      import('./pages/languages/admin-languages.component').then(
        (m) => m.AdminLanguagesComponent
      ),
  },
  {
    path: 'areas',
    loadComponent: () =>
      import('./pages/areas/admin-areas.component').then(
        (m) => m.AdminAreasComponent
      ),
  },
  {
    path: '',
    redirectTo: 'continents', // Redirige /admin a /admin/continents por defecto
    pathMatch: 'full',
  },
];
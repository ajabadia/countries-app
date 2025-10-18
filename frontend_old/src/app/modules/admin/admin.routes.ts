// src/app/modules/admin/admin.routes.ts
 
import { Routes } from '@angular/router';
export const ADMIN_ROUTES: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
  { 
    path: 'dashboard', 
    loadComponent: () => import('./pages/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) 
  },
  { 
    path: 'countries', 
    loadComponent: () => import('./pages/countries/admin-countries.component').then(m => m.AdminCountriesComponent) 
  },
  { 
    path: 'continents', 
    loadComponent: () => import('./pages/continents/admin-continents.component').then(m => m.AdminContinentsComponent) 
  },
  { 
    path: 'areas', 
    loadComponent: () => import('./pages/areas/admin-areas.component').then(m => m.AdminAreasComponent) 
  },
  { 
    path: 'dependencies', 
    loadComponent: () => import('./pages/dependencies/admin-dependencies.component').then(m => m.AdminDependenciesComponent) 
  },
  { 
    path: 'languages', 
    loadComponent: () => import('./pages/languages/admin-languages.component').then(m => m.AdminLanguagesComponent) 
  },
  { 
    path: 'translations', 
    loadComponent: () => import('./pages/translations/admin-translations.component').then(m => m.AdminTranslationsComponent) 
  },
];
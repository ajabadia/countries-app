// src/app/modules/admin/admin.routes.ts

import { Routes } from '@angular/router';

// --- Importamos los componentes Layout y de Página ---
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './pages/dashboard/admin-dashboard.component';
import { AdminCountriesComponent } from './pages/countries/admin-countries.component';
import { AdminContinentsComponent } from './pages/continents/admin-continents.component';
import { AdminAreasComponent } from './pages/areas/admin-areas.component';
import { AdminDependenciesComponent } from './pages/dependencies/admin-dependencies.component';
import { AdminLanguagesComponent } from './pages/languages/admin-languages.component';
import { AdminTranslationsComponent } from './pages/translations/admin-translations.component';

// --- Definimos las rutas hijas del módulo de administración ---
export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent, // El componente 'AdminComponent' actúa como layout/contenedor
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'countries', component: AdminCountriesComponent },
      { path: 'continents', component: AdminContinentsComponent },
      { path: 'areas', component: AdminAreasComponent },
      { path: 'dependencies', component: AdminDependenciesComponent },
      { path: 'languages', component: AdminLanguagesComponent },
      { path: 'translations', component: AdminTranslationsComponent }
      // El resto de las páginas ya son standalone, por lo que no necesitan módulos.
    ]
  }
];
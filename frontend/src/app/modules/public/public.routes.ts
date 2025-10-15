// src/app/modules/public/public-routing.module.ts

import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { CountriesComponent } from './pages/countries/countries.component';

// Definimos las rutas hijas del módulo público
export const PUBLIC_ROUTES: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'countries', component: CountriesComponent }
  // Aquí añadirías más rutas públicas en el futuro
];

// src/app/modules/public/public-routing.module.ts

import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { CountriesComponent } from './pages/countries/countries.component';
import { TestComponent } from '../test/test.component';

// Definimos las rutas hijas del módulo público
export const PUBLIC_ROUTES: Routes = [
  { path: '', component: LandingPageComponent, data: { menu: { label: 'Inicio', name: 'home' } } },
  { path: 'countries', component: CountriesComponent, data: { menu: { label: 'Países', name: 'globe' } } },
  { path: 'test', component: TestComponent, data: { menu: { label: 'Test', name: 'icon-flask' } } } 
  // Aquí añadirías más rutas públicas en el futuro
];

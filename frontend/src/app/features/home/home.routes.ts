// File: /frontend/src/app/features/home/home.routes.ts

import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const HOME_ROUTES: Routes = [
  {
    path: '', // La ruta raíz dentro de esta feature
    component: HomeComponent,
  },
];
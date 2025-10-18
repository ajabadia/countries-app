// File: /frontend/src/app/app.routes.ts

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@features/home/home.routes').then(m => m.HOME_ROUTES),
    pathMatch: 'full',
  },
  // Aquí añadiremos más rutas principales como 'admin', 'auth', etc.
];
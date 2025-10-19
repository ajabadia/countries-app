// File: /frontend/src/app/app.routes.ts

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    // ✅ CORRECCIÓN: Se carga directamente el nuevo HomeComponent (standalone)
    // que está en la ruta correcta, eliminando la dependencia con el
    // antiguo fichero de rutas que causaba el error.
    loadComponent: () =>
      import('@features/public/home/home.component').then(m => m.HomeComponent),
  },
  // Aquí añadiremos más rutas principales como 'admin', 'auth', etc.
];
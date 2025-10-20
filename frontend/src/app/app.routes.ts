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
  {
    path: 'admin',
    // Carga diferida de todas las rutas de administración
    loadChildren: () =>
      import('@features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
  },
];
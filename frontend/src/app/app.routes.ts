// src/app/app.routes.ts

import { TestComponent } from './modules/test/test.component';
import { Routes } from '@angular/router';
import { PublicComponent } from './modules/public/public.component';
import { AdminComponent } from './modules/admin/admin/admin.component';

export const routes: Routes = [
  // --- Ruta para la sección pública ---
  // Al navegar a /public, se carga PublicComponent, que contiene el menú público.
  {
    path: 'public',
    component: PublicComponent,
    // Las rutas hijas se cargarán dentro del <router-outlet> de PublicComponent.
    loadChildren: () => import('./modules/public/public.routes').then(m => m.PUBLIC_ROUTES),
  },

  // --- Ruta para la sección de administración ---
  // Al navegar a /admin, se carga AdminComponent, que contiene el menú de admin.
  {
    path: 'admin',
    component: AdminComponent,
    // Las rutas hijas se cargarán dentro del <router-outlet> de AdminComponent.
    loadChildren: () => import('./modules/admin/admin.routes').then(m => m.ADMIN_ROUTES),
  },

  // --- Ruta por defecto ---
  // Redirige a la página de inicio de la sección pública si no se especifica una ruta.
  {

    path: '',
    redirectTo: '/public',
    pathMatch: 'full',
  },

  // --- Ruta comodín (opcional pero recomendado) ---
  // Redirige a la página de inicio si la URL no coincide con ninguna ruta.
  {
    path: '**',
    redirectTo: '/public',
  },
];

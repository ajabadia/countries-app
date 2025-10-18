// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // ✅ REFACTOR: Se eliminan los componentes de layout intermedios (PublicComponent, AdminComponent).
  // Ahora, las rutas de cada módulo se cargan directamente en el <router-outlet> principal de AppComponent.
  {
    path: '', // La sección pública ahora es la raíz.
    loadChildren: () => import('./modules/public/public.routes').then(m => m.PUBLIC_ROUTES),
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.routes').then(m => m.ADMIN_ROUTES),
    canActivate: [authGuard], // 🔐 Proteger todas las rutas hijas de /admin
  },
  {
    path: 'test',
    // ✅ FIX: The test routes file was missing. For now, we can load a placeholder component.
    // This can be expanded later.
    loadComponent: () => import('./modules/test/test.component').then(m => m.TestComponent),
  },

  // --- Ruta por defecto ---
  // Redirige a la página de inicio de la sección pública si no se especifica una ruta.
  {

    path: '',
    redirectTo: '/', // Redirige a la raíz (sección pública).
    pathMatch: 'full',
  },
];

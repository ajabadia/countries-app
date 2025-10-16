// src/app/config/route-config.ts

import { MenuBarItem } from "@shared/components/menu-bar/menu-bar.component";

/**
 * Definición centralizada para las rutas públicas.
 * Cada objeto contiene la información necesaria para construir
 * tanto los elementos del menú como los encabezados de las páginas.
 */
export const PUBLIC_ROUTES: MenuBarItem[] = [
  { 
    label: 'Información general', 
    name: 'info-circle', 
    route: '/public' 
  },
  { 
    label: 'Información por países', 
    name: 'country', 
    route: '/public/countries' 
  },
  {
    label: 'Test',
    name: 'icon-flask',
    route: '/test'
  },
];

/**
 * Definición centralizada para las rutas de administración.
 */
export const ADMIN_ROUTES: MenuBarItem[] = [
  { label: 'Dashboard', name: 'dashboard', route: '/admin/dashboard' },
  { label: 'Países', name: 'country', route: '/admin/countries' },
  { label: 'Continentes', name: 'continents', route: '/admin/continents' },
  { label: 'Áreas', name: 'area', route: '/admin/areas' },
  { label: 'Dependencias', name: 'dependencies', route: '/admin/dependencies' },
  { label: 'Lenguajes', name: 'languages', route: '/admin/languages' },
  { label: 'Traducciones', name: 'translations', route: '/admin/translations' }
];

/**
 * Un mapa combinado para un acceso más fácil al buscar una ruta específica.
 */
export const ALL_ROUTES_MAP = new Map<string, MenuBarItem>(
  [...PUBLIC_ROUTES, ...ADMIN_ROUTES].map(item => [Array.isArray(item.route) ? item.route.join('/') : item.route as string, item])
);
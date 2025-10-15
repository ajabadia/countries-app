// src/app/config/route-config.ts

import { MenuBarItem } from "src/app/modules/shared/components/menu-bar/menu-bar.component";

/**
 * Definición centralizada para las rutas públicas.
 * Cada objeto contiene la información necesaria para construir
 * tanto los elementos del menú como los encabezados de las páginas.
 */
export const PUBLIC_ROUTES: MenuBarItem[] = [
  { 
    label: 'Información general', 
    icon: 'info-circle', 
    route: '/public' 
  },
  { 
    label: 'Información por países', 
    icon: 'country', 
    route: '/public/countries' 
  },
];

/**
 * Definición centralizada para las rutas de administración.
 */
export const ADMIN_ROUTES: MenuBarItem[] = [
  { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
  { label: 'Países', icon: 'country', route: '/admin/countries' },
  { label: 'Continentes', icon: 'continents', route: '/admin/continents' },
  { label: 'Áreas', icon: 'area', route: '/admin/areas' },
  { label: 'Dependencias', icon: 'dependencies', route: '/admin/dependencies' },
  { label: 'Lenguajes', icon: 'languages', route: '/admin/languages' },
  { label: 'Traducciones', icon: 'translations', route: '/admin/translations' }
];

/**
 * Un mapa combinado para un acceso más fácil al buscar una ruta específica.
 */
export const ALL_ROUTES_MAP = new Map<string, MenuBarItem>(
  [...PUBLIC_ROUTES, ...ADMIN_ROUTES].map(item => [Array.isArray(item.route) ? item.route.join('/') : item.route as string, item])
);
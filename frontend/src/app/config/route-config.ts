// src/app/config/route-config.ts

import { MenuBarItem } from '../menu-bar.interface';

export const PUBLIC_ROUTES: MenuBarItem[] = [
  { name: 'home', label: 'Inicio', route: '/' },
  { name: 'countries', label: 'Países', route: '/countries' },
  { name: 'languages', label: 'Idiomas', route: '/languages' },
  { name: 'about', label: 'Acerca de', route: '/about' },
];

export const ADMIN_ROUTES: MenuBarItem[] = [
  { name: 'dashboard', label: 'Dashboard', route: '/admin' },
  { name: 'admin-countries', label: 'Gestionar Países', route: '/admin/countries' },
  { name: 'admin-languages', label: 'Gestionar Idiomas', route: '/admin/languages' },
  { name: 'admin-users', label: 'Usuarios', route: '/admin/users' },
];

export const TEST_ROUTES: MenuBarItem[] = [
  { name: 'test-home', label: 'Inicio Tests', route: '/test' },
  { name: 'test-components', label: 'Componentes UI', route: '/test/components' },
  { name: 'test-icons', label: 'Iconos', route: '/test/icons' },
  { name: 'test-services', label: 'Servicios', route: '/test/services' },
];
// File: d:\desarrollos\countries2\frontend\src\app\core\services\action.service.ts | Last Modified: 2025-10-19

import { Injectable } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';
import {
  ActionCategory,
  AppAction,
  GroupedAppAction,
} from '@app/types/action.types';

@Injectable({
  providedIn: 'root',
})

/**
 * Servicio centralizado para gestionar todas las acciones posibles dentro de la aplicación.
 * Define acciones de navegación, botones de barra de herramientas y otras operaciones,
 * agrupándolas por categorías para un fácil acceso y reutilización.
 */
export class ActionService {
  // --- Definición de todas las acciones de la aplicación ---
  private allActions: AppAction[] = [
    // --- Acciones de Navegación Pública ---
    {
      id: 'home',
      label: 'Inicio',
      icon: 'icon-home',
      category: 'public',
      pageTitle: 'Bienvenido',
      type: 'nav',
      routerLink: '/',
    },
    {
      id: 'auth-login',
      label: 'Iniciar Sesión',
      icon: 'icon-login',
      category: 'auth',
      pageTitle: 'Iniciar Sesión',
      type: 'nav',
      routerLink: '/auth/login',
    },
    {
      id: 'auth-register',
      label: 'Registro',
      icon: 'icon-add',
      category: 'auth',
      pageTitle: 'Crear una Cuenta',
      type: 'nav',
      routerLink: '/auth/register',
    },

    // --- Acciones de Usuario Autenticado ---
    {
      id: 'user-profile',
      label: 'Mi Perfil',
      icon: 'icon-user', // Corregido de 'icon-user-circle'
      category: 'user',
      pageTitle: 'Mi Perfil',
      type: 'nav',
      routerLink: '/user',
    },

    // --- Acciones de Navegación de Administración ---
    {
      id: 'dashboard-admin',
      label: 'Dashboard',
      icon: 'icon-dashboard',
      category: 'admin',
      pageTitle: 'Dashboard',
      type: 'nav',
      routerLink: '/admin',
    },
    {
      id: 'countries-admin',
      label: 'Países',
      icon: 'icon-country',
      category: 'admin',
      pageTitle: 'Gestión de Países',
      type: 'nav',
      routerLink: '/admin/countries',
    },
    {
      id: 'languages-admin',
      label: 'Idiomas',
      icon: 'icon-world-globe',
      category: 'admin',
      pageTitle: 'Gestión de Idiomas',
      type: 'nav',
      routerLink: '/admin/languages',
    },
    {
      id: 'users-admin',
      label: 'Usuarios',
      icon: 'icon-user',
      category: 'admin',
      pageTitle: 'Gestión de Usuarios',
      type: 'nav',
      routerLink: '/admin/users',
    },
    {
      id: 'continents-admin',
      label: 'Continentes',
      icon: 'icon-continents',
      category: 'admin',
      pageTitle: 'Gestión de Continentes',
      type: 'nav',
      routerLink: '/admin/continents',
    },
    {
      id: 'areas-admin',
      label: 'Áreas',
      icon: 'icon-area',
      category: 'admin',
      pageTitle: 'Gestión de Áreas',
      type: 'nav',
      routerLink: '/admin/areas',
    },
        {
      id: 'area_types-admin',
      label: 'Tipos de Área',
      icon: 'icon-tags',
      category: 'admin',
      pageTitle: 'Gestión de Tipos de Área', 
      type: 'nav',
      routerLink: '/admin/area_types',
    },
    {
      id: 'dependencies-admin',
      label: 'Dependiencias',
      icon: 'icon-dependencies',
      category: 'admin',
      pageTitle: 'Gestión de Dependencias',
      type: 'nav',
      routerLink: '/admin/dependencies',
    },
    {
      id: 'multilingualnames-admin',
      label: 'Traducciones',
      icon: 'icon-translations',
      category: 'admin',
      pageTitle: 'Gestión de Traducciones',
      type: 'nav',
      routerLink: '/admin/multilingualnames',
    },
    {
      id: 'test-layout-admin',
      label: 'Test Layout',
      icon: 'icon-lab',
      category: 'admin',
      pageTitle: 'Test de Layout',
      type: 'nav',
      routerLink: '/admin/test-layout',
    },

    // --- Acciones de Barra de Herramientas (Toolbar) ---
    { id: 'toolbar-save', label: 'Guardar', icon: 'icon-save', category: 'toolbar', type: 'button' },
    { id: 'toolbar-cancel', label: 'Cancelar', icon: 'icon-cancel', category: 'toolbar', type: 'button' },
    { id: 'toolbar-add', label: 'Añadir Nuevo', icon: 'icon-add', category: 'toolbar', type: 'button' },
    { id: 'toolbar-delete-selected', label: 'Eliminar Seleccionados', icon: 'icon-delete', category: 'toolbar', type: 'button' },
  ];

  // --- Títulos para las categorías de acciones ---
  private categoryTitles: Record<ActionCategory, string> = {
    public: 'Navegación Principal',
    admin: 'Administración',
    auth: 'Cuenta',
    user: 'Usuario',
    toolbar: 'Operaciones',
    general: 'General',
  };

  getActions(categories: ActionCategory[]): AppAction[] {
    return this.allActions.filter(action => categories.includes(action.category));
  }

  getNavActions(categories: ActionCategory[]): AppAction[] {
    return this.allActions.filter(action => categories.includes(action.category) && action.type === 'nav');
  }

  getGroupedNavActions(categories: ActionCategory[]): GroupedAppAction[] {
    const navActions = this.getNavActions(categories);
    return this._groupActions(navActions);
  }

  private _groupActions(actions: AppAction[]): GroupedAppAction[] {
    const groupedMap = actions.reduce(
      (acc, action) => {
        const group = acc.get(action.category) || [];
        group.push(action);
        acc.set(action.category, group);
        return acc;
      },
      new Map<ActionCategory, AppAction[]>()
    );

    return Array.from(groupedMap.entries()).map(
      ([category, actions]) => ({
        category,
        title: this.getCategoryTitle(category),
        actions,
      })
    );
  }

  getCategoryTitle(category: ActionCategory): string {
    return this.categoryTitles[category] || 'General';
  }

  /**
   * Devuelve todas las categorías de acciones disponibles en el servicio.
   * @returns Un array con todas las claves de categoría.
   */
  getAllCategories(): ActionCategory[] {
    return Object.keys(this.categoryTitles) as ActionCategory[];
  }

  /**
   * Obtiene una acción específica por su ID.
   * @param id El identificador único de la acción.
   * @returns La acción correspondiente o undefined si no se encuentra.
   */
  getActionById(id: string): AppAction | undefined {
    return this.allActions.find(action => action.id === id);
  }

  /**
   * Obtiene un conjunto de acciones por sus IDs.
   * @param ids Un array de identificadores de acción.
   * @returns Un array con las acciones encontradas.
   */
  getActionsByIds(ids: string[]): AppAction[] {
    return this.allActions.filter(action => ids.includes(action.id));
  }

  /**
   * Obtiene todas las acciones de una categoría específica.
   * @param category La categoría de acciones a obtener.
   * @returns Un array con las acciones de esa categoría.
   */
  getActionsByCategory(category: ActionCategory): AppAction[] {
    return this.allActions.filter(action => action.category === category);
  }
}
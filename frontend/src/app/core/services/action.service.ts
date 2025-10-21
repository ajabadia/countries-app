// File: d:\desarrollos\countries2\frontend\src\app\core\services\action.service.ts | Last Modified: 2025-10-19

import { Injectable } from '@angular/core';
import {
  ActionCategory,
  AppAction,
  GroupedAppAction,
} from '@core/types/action.types';

@Injectable({
  providedIn: 'root',
})
export class ActionService {
  // --- Definición de todas las acciones de la aplicación ---
  private allActions: AppAction[] = [
    // --- Acciones de Navegación Pública ---
    {
      id: 'home',
      label: 'Inicio',
      icon: 'home',
      category: 'public',
      type: 'nav',
      routerLink: '/',
    },
    {
      id: 'auth-login',
      label: 'Iniciar Sesión',
      icon: 'login',
      category: 'auth',
      type: 'nav',
      routerLink: '/auth/login',
    },
    {
      id: 'auth-register',
      label: 'Registro',
      icon: 'person_add',
      category: 'auth',
      type: 'nav',
      routerLink: '/auth/register',
    },

    // --- Acciones de Navegación de Administración ---
    {
      id: 'admin-dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      category: 'admin',
      type: 'nav',
      routerLink: '/admin',
    },
    {
      id: 'admin-countries',
      label: 'Países',
      icon: 'flag',
      category: 'admin',
      type: 'nav',
      routerLink: '/admin/countries',
    },
    {
      id: 'admin-languages',
      label: 'Idiomas',
      icon: 'language',
      category: 'admin',
      type: 'nav',
      routerLink: '/admin/languages',
    },
    {
      id: 'admin-users',
      label: 'Usuarios',
      icon: 'group',
      category: 'admin',
      type: 'nav',
      routerLink: '/admin/users',
    },
    {
      id: 'admin-continents',
      label: 'Continentes',
      icon: 'public',
      category: 'admin',
      type: 'nav',
      routerLink: '/admin/continents',
    },
    {
      id: 'admin-regions',
      label: 'Regiones',
      icon: 'travel_explore',
      category: 'admin',
      type: 'nav',
      routerLink: '/admin/regions',
    },
    {
      id: 'admin-subregions',
      label: 'Subregiones',
      icon: 'map',
      category: 'admin',
      type: 'nav',
      routerLink: '/admin/subregions',
    },
    {
      id: 'admin-currencies',
      label: 'Monedas',
      icon: 'payments',
      category: 'admin',
      type: 'nav',
      routerLink: '/admin/currencies',
    },

    // --- Acciones de Barra de Herramientas (Toolbar) ---
    { id: 'toolbar-save', label: 'Guardar', icon: 'save', category: 'toolbar', type: 'button' },
    { id: 'toolbar-cancel', label: 'Cancelar', icon: 'cancel', category: 'toolbar', type: 'button' },
    { id: 'toolbar-add', label: 'Añadir Nuevo', icon: 'add', category: 'toolbar', type: 'button' },
    { id: 'toolbar-delete-selected', label: 'Eliminar Seleccionados', icon: 'delete', category: 'toolbar', type: 'button' },
  ];

  // --- Títulos para las categorías de acciones ---
  private categoryTitles: Record<ActionCategory, string> = {
    public: 'Navegación Principal',
    admin: 'Administración',
    auth: 'Cuenta',
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
      ([category, actions]: [ActionCategory, AppAction[]]) => ({
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
// File: d:\desarrollos\countries2\frontend\src\app\core\services\action.service.ts | Last Modified: 2025-10-19

import { Injectable } from '@angular/core';
import {
  ActionCategory,
  AppAction,
  GroupedAppAction,
  ToolbarButtonConfig,
} from '@core/types/action.types';

@Injectable({
  providedIn: 'root',
})
export class ActionService {
  private allActions: AppAction[] = [
    // Public
    {
      id: 'home',
      label: 'Inicio',
      icon: 'home',
      category: 'public',
      routerLink: '/',
    },
    {
      id: 'countries',
      label: 'Países',
      icon: 'flag',
      category: 'public',
      routerLink: '/countries',
    },
    // Admin
    {
      id: 'admin-dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      category: 'admin',
      routerLink: '/admin',
    },
    {
      id: 'admin-countries',
      label: 'Gestionar Países',
      icon: 'flag',
      category: 'admin',
      routerLink: '/admin/countries',
    },
    {
      id: 'admin-users',
      label: 'Gestionar Usuarios',
      icon: 'people',
      category: 'admin',
      routerLink: '/admin/users',
    },
  ];

  private categoryTitles: Record<ActionCategory, string> = {
    public: 'Navegación Principal',
    admin: 'Administración',
    user: 'Mi Cuenta',
    general: 'General',
  };

  getActions(categories: ActionCategory[]): AppAction[] {
    return this.allActions.filter(action => categories.includes(action.category));
  }

  /**
   * Obtiene acciones filtradas por categoría y las devuelve agrupadas.
   * @param categories Las categorías de acciones a obtener.
   * @returns Un array de grupos de acciones, cada uno con su título y lista de acciones.
   */
  getGroupedActions(categories: ActionCategory[]): GroupedAppAction[] {
    const filteredActions = this.getActions(categories);

    const groupedMap = filteredActions.reduce(
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

  private getCategoryTitle(category: ActionCategory): string {
    return this.categoryTitles[category] || 'General';
  }
}
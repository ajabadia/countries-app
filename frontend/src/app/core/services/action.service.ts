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
      icon: 'icon-home',
      category: 'public',
      routerLink: '/',
    },
    {
      id: 'countries',
      label: 'Países',
      icon: 'icon-country',
      category: 'public',
      routerLink: '/countries',
    },
    // Admin
    {
      id: 'admin-dashboard',
      label: 'Dashboard',
      icon: 'icon-dashboard',
      category: 'admin',
      routerLink: '/admin',
    },
    {
      id: 'admin-countries',
      label: 'Gestionar Países',
      icon: 'icon-country',
      category: 'admin',
      routerLink: '/admin/countries',
    },
    {
      id: 'admin-users',
      label: 'Gestionar Usuarios',
      icon: 'icon-user',
      category: 'admin',
      routerLink: '/admin/users',
    },
    // User
    {
      id: 'user-profile',
      label: 'Mi Perfil',
      icon: 'icon-user',
      category: 'user',
      routerLink: '/profile',
    },
    // General
    {
      id: 'general-settings',
      label: 'Configuración',
      icon: 'icon-settings',
      category: 'general',
      routerLink: '/settings',
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

  /**
   * Devuelve todas las categorías de acciones disponibles en el servicio.
   * @returns Un array con todas las claves de categoría.
   */
  getAllCategories(): ActionCategory[] {
    return Object.keys(this.categoryTitles) as ActionCategory[];
  }
}
// File: d:\desarrollos\countries2\frontend\src\app\core\services\action.service.ts | Last Modified: 2025-10-19

import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ToolbarButtonConfig } from '@shared/components/ui-toolbar-buttons/ui-toolbar-buttons.component';
import { ButtonColor, ButtonVariant } from '@shared/components/ui-button/ui-button.component';

// --- Interfaces para la Definición Centralizada de Acciones ---

export type ActionType = 'route' | 'href' | 'function';
export type ActionCategory = 'public' | 'user' | 'admin' | 'dev' | 'test';

export interface AppAction {
  id: string; // Identificador único, ej: 'nav-home', 'admin-countries-add'
  label: string;
  icon?: string;
  type: ActionType;
  category: ActionCategory;

  // Propiedades específicas según el tipo de acción
  route?: string | any[];
  href?: string;
  onClick?: () => void;
  disabled$?: Observable<boolean>; // Para estados deshabilitados estáticos o por defecto

  // Pistas visuales para los componentes de UI que consuman esta acción
  ui?: {
    color?: ButtonColor;
    variant?: ButtonVariant;
  };
}

// --- Servicio de Acciones ---

@Injectable({
  providedIn: 'root',
})
export class ActionService {
  private router = inject(Router);

  /**
   * Fuente de la verdad para todas las acciones y enlaces de navegación de la aplicación.
   */
  private readonly _allActions: AppAction[] = [
    // --- Acciones Públicas ---
    { id: 'public-home', label: 'Inicio', icon: 'icon-home', type: 'route', category: 'public', route: ['/'] },
    { id: 'public-login', label: 'Iniciar Sesión', icon: 'icon-lock', type: 'route', category: 'public', route: ['/auth/login'] },

    // --- Acciones de Administración ---
    { id: 'admin-dashboard', label: 'Dashboard', icon: 'icon-dashboard', type: 'route', category: 'admin', route: ['/admin'] },
    { id: 'admin-countries', label: 'Países', icon: 'icon-country', type: 'route', category: 'admin', route: ['/admin/countries'] },
    { id: 'admin-users', label: 'Usuarios', icon: 'icon-user', type: 'route', category: 'admin', route: ['/admin/users'] },

    // --- Acciones de Toolbar (CRUD) ---
    { id: 'toolbar-add', label: 'Añadir', icon: 'icon-add', type: 'function', category: 'admin', ui: { color: 'primary', variant: 'solid' } },
    { id: 'toolbar-save', label: 'Guardar', icon: 'icon-save', type: 'function', category: 'admin', ui: { color: 'primary', variant: 'solid' } },
    { id: 'toolbar-cancel', label: 'Cancelar', icon: 'icon-close', type: 'function', category: 'admin', ui: { color: 'secondary', variant: 'outline' } },
  ];

  /**
   * Obtiene una lista de acciones filtradas por una o más categorías.
   */
  getActionsForCategories(categories: ActionCategory[]): AppAction[] {
    return this._allActions.filter(action => categories.includes(action.category));
  }

  /**
   * ADAPTADOR: Convierte `AppAction` genéricas al formato `ToolbarButtonConfig`.
   */
  toToolbarButtonConfig(
    actions: AppAction[],
    handlers?: {
      actions?: Map<string, () => void>;
      disabled$?: Map<string, Observable<boolean>>;
    }
  ): ToolbarButtonConfig[] {
    return actions.map(action => {
      // Determinar la acción a ejecutar
      const finalAction = handlers?.actions?.get(action.id)
        ?? action.onClick
        ?? (action.type === 'route' && action.route
          ? () => this.router.navigate(Array.isArray(action.route) ? action.route : [action.route])
          : () => console.warn(`No action implemented for '${action.id}'`));

      // Determinar el estado de deshabilitado
      const finalDisabled$ = handlers?.disabled$?.get(action.id)
        ?? action.disabled$
        ?? of(false);

      return {
        id: action.id,
        label: action.label,
        action: finalAction,
        disabled$: finalDisabled$,
        iconName: action.icon,
        color: action.ui?.color,
        variant: action.ui?.variant,
      };
    });
  }
}

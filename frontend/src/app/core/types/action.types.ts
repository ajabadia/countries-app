// File: d:\desarrollos\countries2\frontend\src\app\core\types\action.types.ts | Last Modified: 2025-10-19

export type ActionCategory = 'public' | 'admin' | 'user' | 'general';

export interface AppAction {
  id: string;
  label: string;
  icon?: string;
  category: ActionCategory;
  routerLink?: string | any[];
}

/**
 * Representa un grupo de acciones de la aplicación,
 * con un título y una lista de acciones asociadas.
 * Utilizado por el ActionService para devolver acciones agrupadas.
 */
export interface GroupedAppAction {
  category: ActionCategory;
  title: string;
  actions: AppAction[];
}

/**
 * Representa la configuración de un botón para el componente `UiToolbarButtonsComponent`.
 * Es el resultado de adaptar una `AppAction` a un formato de UI específico.
 */
export interface ToolbarButtonConfig {
  id: string;
  label: string;
  icon?: string;
  action: () => void;
}
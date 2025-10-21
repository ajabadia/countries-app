// File: d:\desarrollos\countries2\frontend\src\app\core\types\action.types.ts | Last Modified: 2025-10-19

// File: d:/desarrollos/countries2/frontend/src/app/core/types/action.types.ts | Last Modified: 2025-10-20

export type ActionType = 'nav' | 'button';
export type ActionCategory = 'public' | 'admin' | 'auth' | 'toolbar' | 'general';

export interface AppAction {
  id: string;
  label: string;
  icon: string;
  category: ActionCategory;
  type: ActionType;
  routerLink?: string | any[];
}

export interface GroupedAppAction {
  category: ActionCategory;
  title: string;
  actions: AppAction[];
}

export interface ToolbarButtonConfig {
  id: string;
  label: string;
  icon?: string;
  action: () => void;
}



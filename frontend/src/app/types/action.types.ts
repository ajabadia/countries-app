// File: d:\desarrollos\countries2\frontend\src\app\core\types\action.types.ts | Last Modified: 2025-10-19
import { Observable } from 'rxjs';

export type ActionType = 'nav' | 'button';
export type ActionCategory = 'public' | 'admin' | 'auth' | 'toolbar' | 'general' | 'user';

export interface AppAction {
  id: string;
  label: string;
  icon: string;
  category: ActionCategory;
  type: ActionType;
  routerLink?: string | any[];
  pageTitle?: string;
}

export interface GroupedAppAction {
  category: ActionCategory;
  title: string;
  actions: AppAction[];
}

export interface ToolbarButtonConfig {
  id: string;
  label: string;
  iconName?: string; // ✅ CORRECCIÓN: Se usa string para consistencia.
  action: () => void;
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  variant?: 'solid' | 'outline' | 'ghost';
  disabled$?: Observable<boolean>;
}

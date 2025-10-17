// src/app/models/menu-bar.interface.ts

// This interface is used by the route configuration files (e.g., route-config.ts)
// to define the structure of menu items before they are transformed into NavMenuItem.
export interface MenuBarItem {
  name?: string;
  label: string;
  route: string | any[];
  disabled?: boolean;
  badge?: string | number;
}
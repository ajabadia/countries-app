// d:/desarrollos/countries2/frontend/src/app/modules/shared/components/menu-bar/menu-bar.component.ts

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiIconComponent } from '../ui-icon/ui-icon.component';

/**
 * Define la estructura de un elemento del menú.
 */
export interface MenuBarItem {
  label: string;
  name?: string; // Changed from icon to name for consistency
  route: string | any[];
  disabled?: boolean;
  badge?: string | number;
}

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // Necesario para [routerLink] y routerLinkActive
    UiIconComponent
  ],
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBarComponent {
  /** La lista de elementos a mostrar en el menú. */
  @Input() items: MenuBarItem[] = [];
  /** Etiqueta ARIA para accesibilidad. */
  @Input() ariaLabel: string = 'Menú de navegación';
}
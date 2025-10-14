// src/app/modules/shared/components/menu-bar/menu-bar.component.ts

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para @if, @for, etc.
import { RouterModule } from '@angular/router';   // Necesario para [routerLink] y routerLinkActive.
import { UiIconComponent } from '../ui-icon/ui-icon.component'; // ¡NUEVO! Importamos nuestro componente de iconos.

/**
 * Interfaz que define la estructura de un elemento del menú.
 * MEJORA: La propiedad 'route' ahora acepta un array, que es la forma recomendada
 * por Angular para rutas con parámetros (ej: ['/users', userId]).
 */
export interface MenuBarItem {
  label: string;
  icon?: string;
  route?: string | any[]; // <-- MEJORA: Más flexible que solo 'string'.
  external?: boolean;
  disabled?: boolean;
  badge?: string | number;
}

@Component({
  selector: 'app-menu-bar',
  // --- MEJORAS CLAVE ---
  standalone: true, // 1. Convertido a componente Standalone.
  changeDetection: ChangeDetectionStrategy.OnPush, // 2. Mejor rendimiento. Solo se actualiza si cambian los @Inputs.
  imports: [
    CommonModule,
    RouterModule,
    UiIconComponent // 3. Importamos el componente de iconos para usarlo en la plantilla.
  ],
  // --------------------
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {
  /**
   * Array de objetos que definen los elementos a mostrar en la barra de menú.
   */
  @Input() items: MenuBarItem[] = [];

  /**
   * Etiqueta ARIA para mejorar la accesibilidad, describiendo el propósito del menú.
   */
  @Input() ariaLabel: string = 'Menú principal';

  /**
   * ❌ ELIMINADO: El constructor y la función `isActive()` ya no son necesarios.
   * La lógica para determinar si un enlace está activo se maneja ahora de forma
   * declarativa y más eficiente directamente en la plantilla con `routerLinkActive`.
   */
}
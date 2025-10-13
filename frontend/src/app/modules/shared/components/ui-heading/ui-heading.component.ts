// ui-heading.component.ts

import { Component, Input } from '@angular/core';
import { UiIconType } from 'src/app/services/icon.service';

@Component({
  selector: 'app-ui-heading',
  templateUrl: './ui-heading.component.html',
  styleUrls: ['./ui-heading.component.scss'],
})
export class UiHeadingComponent {
  // --- Entradas de Configuración ---
  @Input() level: 1 | 2 | 3 | 4 | 5 | 6 = 1;
  @Input() text: string = '';
  @Input() subtitle?: string;
  @Input() textAlign: 'left' | 'center' | 'right' = 'left';
  @Input() color: 'primary' | 'secondary' | 'accent' | 'text' | 'muted' | 'transparent' = 'text';

  // --- Entradas para el Icono ---
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  // ✅ El tamaño ahora puede ser 'inherit' para que coincida con el texto
  @Input() iconSize: 'inherit' | 'xs' | 's' | 'm' | 'l' | 'xl' | number = 'inherit';
  @Input() iconType: UiIconType = 'system';
  @Input() iconColor?: string;
  @Input() iconClass?: string;

  // --- Entradas de Accesibilidad y Clases ---
  @Input() ariaLabel?: string;
  @Input() customClass?: string;
  
  /**
   * Genera un objeto de clases para [ngClass] de forma dinámica.
   */
  get headingClasses() {
    return {
      'ui-heading': true,
      [`ui-heading--level-${this.level}`]: true,
      [`ui-heading--color-${this.color}`]: true,
      [`ui-heading--align-${this.textAlign}`]: true,
      'ui-heading--has-icon': !!this.icon,
      [`ui-heading--icon-${this.iconPosition}`]: !!this.icon,
      [this.customClass || '']: !!this.customClass,
    };
  }
}
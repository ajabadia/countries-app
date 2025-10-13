// ui-button.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UiIconType } from 'src/app/services/icon.service';

@Component({
    selector: 'app-ui-button',
    templateUrl: './ui-button.component.html',
    styleUrls: ['./ui-button.component.scss'],
    standalone: false
})
export class UiButtonComponent {
  // --- Entradas de Configuración con Valores por Defecto ---
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() active = false;
  @Input() fullWidth = false;
  @Input() color: 'primary' | 'secondary' | 'accent' | 'danger' | 'surface' | 'success' | 'warning' | 'info' | 'icon' = 'primary';
  @Input() loading = false;
  
  // --- Entradas de Iconografía ---
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' | 'top' | 'only' = 'left';
  @Input() iconType: UiIconType = 'system';
  @Input() iconSize: 'xs' | 's' | 'm' | 'l' | 'xl' | string = '1em'; // '1em' para heredar tamaño

  // --- Accesibilidad ---
  @Input() ariaLabel?: string;

  // --- Eventos ---
  @Output() onClick = new EventEmitter<MouseEvent>();

  // ❌ ELIMINADO: HttpClient, DomSanitizer, OnInit, OnChanges, loadSvg(), getIconStyle(), getTextStyle().

  /**
   * Genera dinámicamente el objeto de clases para [ngClass].
   */
  get buttonClasses() {
    return {
      'ui-button': true,
      [`ui-button--${this.color}`]: true,
      'ui-button--full-width': this.fullWidth,
      'ui-button--active': this.active,
      'ui-button--has-icon': !!this.icon,
      [`ui-button--icon-${this.iconPosition}`]: !!this.icon,
      'ui-button--icon-only': this.iconPosition === 'only',
    };
  }

  /**
   * Emite el evento de clic solo si el botón no está deshabilitado o cargando.
   */
  handleClick(event: MouseEvent) {
    if (!this.disabled && !this.loading) {
      this.onClick.emit(event);
    }
  }
}

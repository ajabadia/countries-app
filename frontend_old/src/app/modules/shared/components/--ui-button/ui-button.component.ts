// src/app/modules/shared/components/ui-button/ui-button.component.ts

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiIconType } from '@services/icon.service';
import { UiIconComponent } from '../ui-icon/ui-icon.component';

// ✅ MEJORA: Exportamos los tipos para que otros componentes (como toolbar-buttons) puedan usarlos.
export type ButtonColor = 'primary' | 'secondary' | 'accent' | 'danger' | 'surface' | 'success' | 'warning' | 'info' | 'icon' | 'light';
export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link' | 'icon';
export type ButtonSize = 'xs' | 's' | 'm' | 'l' | 'xl';

@Component({
  selector: 'app-ui-button',
  standalone: true,
  imports: [ CommonModule, UiIconComponent ],
  templateUrl: './ui-button.component.html',
  styleUrls: ['./ui-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiButtonComponent implements AfterContentInit {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() color: ButtonColor = 'primary';
  @Input() variant: ButtonVariant = 'solid';
  @Input() size: ButtonSize = 'm';
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' | 'top' | 'bottom' | 'only' = 'left';
  @Input() iconType: UiIconType = 'system';
  @Input() textAlign: 'left' | 'center' | 'right' = 'center';
  @Input() ariaLabel?: string;

  @Output() onClick = new EventEmitter<MouseEvent>();

  // ✅ CORRECCIÓN: Añadimos la lógica para detectar si el botón tiene contenido de texto.
  @ViewChild('contentWrapper') contentWrapper!: ElementRef<HTMLSpanElement>;
  public hasContent = true;

  ngAfterContentInit(): void {
    // Comprobamos si el contenido proyectado (ng-content) está vacío.
    const content = this.contentWrapper?.nativeElement.textContent?.trim() ?? '';
    this.hasContent = content.length > 0;
  }

  /**
   * ✅ MEJORA: El tamaño del icono ahora es dinámico y depende del tamaño del botón.
   * Esto asegura coherencia visual sin necesidad de pasar un tamaño manualmente.
   */
  get iconSize(): string {
    // ✅ CORRECCIÓN: Traducimos el tamaño del botón al tamaño que espera ui-icon.
    // Ahora ambos componentes "hablan el mismo idioma".
    if (this.size === 'xl') return 'xl';
    if (this.size === 'l') return 'l';
    if (this.size === 's') return 's';
    if (this.size === 'xs') return 'xs';
    return 'm'; // m (default)
  }

  get buttonClasses() {
    const classes: { [key: string]: boolean } = {
      'ui-button': true,
      [`ui-button--${this.color}`]: true,
      [`ui-button--${this.variant}`]: true,
      [`ui-button--${this.size}`]: true,
      'ui-button--icon-only': this.iconPosition === 'only',
      'ui-button--loading': this.loading,
      'ui-button--reverse': this.iconPosition === 'right',
      'ui-button--icon-top': this.iconPosition === 'top',
      'ui-button--icon-bottom': this.iconPosition === 'bottom',
      [`ui-button--align-${this.textAlign}`]: true,
    };
    return classes;
  }

  handleClick(event: MouseEvent): void {
    // ✅ CORREGIDO: 'this.' autocompletado a 'this.loading'
    if (!this.disabled && !this.loading) {
      this.onClick.emit(event);
    }
  }
}
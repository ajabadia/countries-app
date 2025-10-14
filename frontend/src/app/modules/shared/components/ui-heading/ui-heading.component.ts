// src/app/modules/shared/components/ui-heading/ui-heading.component.ts

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para @if, [ngClass], etc.
import { UiIconType } from 'src/app/services/icon.service';

// --- Dependencias del Componente Standalone ---
import { UiIconComponent } from '../ui-icon/ui-icon.component';

@Component({
  selector: 'app-ui-heading',
  // --- REFACTORIZACIÓN A STANDALONE ---
  standalone: true,
  imports: [
    CommonModule,
    UiIconComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ------------------------------------
  templateUrl: './ui-heading.component.html',
  styleUrls: ['./ui-heading.component.scss'],
})
export class UiHeadingComponent {
  // === Entradas (Inputs) ===
  @Input() level: 1 | 2 | 3 | 4 | 5 | 6 = 1;
  @Input() text: string = '';
  @Input() subtitle?: string;
  @Input() textAlign: 'left' | 'center' | 'right' = 'left';
  @Input() color: 'primary' | 'secondary' | 'accent' | 'text' | 'muted' = 'text';

  // --- Iconografía ---
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() iconSize: string = 'inherit'; // 'inherit' para que el icono tome el tamaño del texto.
  @Input() iconType: UiIconType = 'system';

  // --- Accesibilidad y Estilos ---
  @Input() ariaLabel?: string;
  @Input() customClass?: string;

  /**
   * Genera el objeto de clases dinámicamente para [ngClass].
   */
  get headingClasses() {
    return {
      'ui-heading': true,
      [`ui-heading--level-${this.level}`]: true,
      [`ui-heading--color-${this.color}`]: true,
      [`ui-heading--align-${this.textAlign}`]: true,
      [`ui-heading--icon-${this.iconPosition}`]: !!this.icon,
      [this.customClass || '']: !!this.customClass,
    };
  }
}
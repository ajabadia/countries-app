import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiIconComponent } from '../ui-icon/ui-icon.component';

@Component({
  selector: 'app-ui-heading',
  standalone: true,
  imports: [
    CommonModule, // ✅ Para usar *ngIf, [ngClass], [ngSwitch], etc.
    UiIconComponent, // ✅ Para poder usar <app-ui-icon>
  ],
  templateUrl: './ui-heading.component.html',
  styleUrls: ['./ui-heading.component.scss'],
})
export class UiHeadingComponent {
  @Input() title: string = '';
  @Input() level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 = 1;
  @Input() subtitle: string | null = null; // ✅ CORRECCIÓN: Aceptamos 'null' para ser compatible con el modal.
  // ✅ ESTANDARIZACIÓN: Renombramos 'icon' a 'name' para alinear con la API de ui-icon.
  @Input() name?: string;
  @Input() align: 'left' | 'center' | 'right' = 'left';
  @Input() iconPosition: 'left' | 'right' = 'left';

  /**
   * Calcula las clases CSS para el elemento del título (h1, h2, etc.).
   * Esto nos permite aplicar dinámicamente la alineación y la posición del icono.
   */
  get titleClasses(): string[] {
    return [
      `ui-heading__title--align-${this.align}`,
      this.iconPosition === 'right' ? 'ui-heading__title--reverse' : '',
    ];
  }

  get iconSize(): string {
    // Hacemos que el tamaño del icono sea relativo al nivel del encabezado.
    switch (this.level) {
      case 1: return 'xl';
      case 2: return 'l';
      case 3: return 'l';
      case 4: return 'm';
      case 5: return 'm';
      case 6: return 's';
      case 7: return 's';
      case 8: return 'xs';
      default: return 'm';
    }
  }
}
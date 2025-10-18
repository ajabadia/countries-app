// File: /frontend/src/app/shared/components/ui-heading/ui-heading.component.ts

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiIconComponent, UiIconSize } from '@shared/components/ui-icon/ui-icon.component';
import { UiIconType } from '@shared/services/icon.service';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

@Component({
  selector: 'app-ui-heading',
  standalone: true,
  imports: [CommonModule, UiIconComponent],
  templateUrl: './ui-heading.component.html',
  styleUrls: ['./ui-heading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiHeadingComponent {
  @Input() title = '';
  @Input() level: HeadingLevel = 1;

  // API de icono "passthrough" - Acepta los inputs de ui-icon directamente
  @Input() name?: string;
  @Input() type: UiIconType = 'system';
  @Input() position: 'left' | 'right' = 'left';
  @Input() color?: string;

  /**
   * Mapea el nivel del encabezado al tamaño que espera `ui-icon`.
   * Esto crea una jerarquía visual consistente y automática.
   */
  get iconSize(): UiIconSize {
    switch (this.level) {
      case 1:
        return 'xl';
      case 2:
        return 'l';
      case 3:
        return 'm';
      case 4:
        return 's';
      default:
        return 'xs';
    }
  }
}
// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-heading\ui-heading.component.ts | Last Modified: 2025-10-19

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiIconComponent } from '@shared/components/ui-icon/ui-icon.component';
import { UiIconSize, UiIconType } from '@shared/services/icon.service';

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
  @Input({ alias: 'uiHeadingTitle' }) title = '';
  @Input({ alias: 'uiHeadingLevel' }) level: HeadingLevel = 1;

  // --- API para el Icono (Pass-through) ---
  @Input({ alias: 'uiIconName' }) iconName?: string;
  @Input({ alias: 'uiIconType' }) iconType: UiIconType = 'system';
  @Input({ alias: 'uiIconPosition' }) iconPosition: 'left' | 'right' = 'left';
  @Input({ alias: 'uiIconColor' }) iconColor?: string;
  @Input({ alias: 'uiIconSize' }) iconSize?: UiIconSize | 'inherit' | string;

  /**
   * Determina el tamaño final del icono.
   * Usa el tamaño específico del icono si se proporciona; de lo contrario,
   * mapea el nivel del encabezado a un tamaño de icono para una jerarquía visual consistente.
   */
  get finalIconSize(): UiIconSize | 'inherit' | string {
    if (this.iconSize) {
      return this.iconSize;
    }

    switch (this.level) {
      case 1: return 'xl';
      case 2: return 'l';
      case 3: return 'l';
      case 4: return 'm';
      case 5: return 'm';
      case 6: return 's';
    }
  }
}
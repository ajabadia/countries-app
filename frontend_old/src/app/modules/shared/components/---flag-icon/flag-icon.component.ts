// src/app/modules/shared/components/flag-icon/flag-icon.component.ts

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiIconComponent } from '../ui-icon/ui-icon.component'; // 1. Importamos el componente de icono base
import { UiIconType } from '@services/icon.service';
import { ButtonSize } from '../ui-button/ui-button.component';

@Component({
  selector: 'app-flag-icon',
  standalone: true,
  imports: [
    CommonModule,
    UiIconComponent // 2. Lo añadimos a los imports para poder usarlo en la plantilla
  ],
  // 3. La plantilla ahora es inline y delega todo a app-ui-icon
  template: `
    <app-ui-icon
      [name]="name"
      [type]="iconServiceType"
      [size]="size"
      [color]="color"
      [ngClass]="{ 'grayscale': grayscale }">
    </app-ui-icon>
  `,
  styleUrls: ['./flag-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlagIconComponent {
  // ✅ API ALINEADA: Usamos 'name' en lugar de 'icon' para consistencia.
  @Input({ required: true }) name: string = '';
  @Input() size: ButtonSize = 'm';
  @Input() color?: string; // Añadido para compatibilidad total con la API de ui-icon
  @Input() grayscale = false;
  @Input() iconType: 'country' | 'language' | 'other' = 'country';

  // 4. Getter para traducir el 'iconType' de este componente al tipo que espera IconService
  get iconServiceType(): UiIconType {
    switch (this.iconType) {
      case 'language': return 'flag-language';
      case 'other': return 'other-circle';
      default: return 'flag-circle';
    }
  }
}
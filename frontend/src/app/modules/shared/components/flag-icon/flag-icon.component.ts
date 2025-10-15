// src/app/modules/shared/components/flag-icon/flag-icon.component.ts

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para [ngClass], [ngStyle], etc.
import { UiIconComponent } from '../ui-icon/ui-icon.component'; // 1. Importamos el componente de icono base
import { UiIconType } from '@services/icon.service';

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
      [icon]="iso2"
      [type]="iconServiceType"
      [size]="size"
      [ngClass]="{ 'grayscale': grayscale }">
    </app-ui-icon>
  `,
  styleUrls: ['./flag-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlagIconComponent {
  // --- Entradas (Inputs) ---
  @Input({ required: true }) iso2: string = '';
  @Input() size: 'xs' | 's' | 'm' | 'l' | 'xl' | string = 'm';
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
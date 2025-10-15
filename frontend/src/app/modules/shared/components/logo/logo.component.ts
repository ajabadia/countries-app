// src/app/modules/shared/components/logo/logo.component.ts

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  /**
   * Ruta de la imagen del logo. Por defecto, usa el logo de Ibercaja.
   */
  @Input() src = 'assets/images/Ibercaja-logo-2025.svg';
  @Input() alt = 'Ibercaja Logo';
  @Input() width: string | number | null = 120;
}
// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-stat-card\ui-stat-card.component.ts | Last Modified: 2025-10-19

import { Component, Input, HostListener, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// Dependencias del Componente Standalone
import { UiIconComponent } from '@shared/components/ui-icon/ui-icon.component';
import { UiIconType, UiIconSize } from '@shared/services/icon.service';

@Component({
  selector: 'app-ui-stat-card',
  standalone: true,
  imports: [CommonModule, RouterModule, UiIconComponent],
  templateUrl: './ui-stat-card.component.html',
  styleUrls: ['./ui-stat-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiStatCardComponent {
  private router = inject(Router);

  // === Entradas (Inputs) ===
  @Input({ alias: 'ui-stat-card-title', required: true }) title!: string;
  @Input({ alias: 'ui-stat-card-value', required: true }) value!: string | number;
  @Input({ alias: 'ui-stat-card-icon' }) icon?: string;
  @Input({ alias: 'ui-stat-card-is-loading' }) isLoading = false;

  /**
   * Mejora de Accesibilidad: Permite activar la tarjeta con Enter o Espacio.
   */
  @HostListener('keydown.enter')
  @HostListener('keydown.space')
  onKeydown(): void {
    // Lógica de navegación futura si es necesario
  }
}

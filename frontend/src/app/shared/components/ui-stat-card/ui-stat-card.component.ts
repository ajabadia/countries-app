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

  // === Entradas (Inputs) con API Prefijada ===
  @Input({ alias: 'ui-stat-card-label', required: true }) label!: string;
  @Input({ alias: 'ui-stat-card-value', required: true }) value!: string | number;
  @Input({ alias: 'ui-stat-card-route' }) detailRoute?: string | any[];

  // --- Inputs de "Pass-through" para el icono ---
  @Input({ alias: 'ui-icon-name' }) iconName?: string;
  @Input({ alias: 'ui-icon-type' }) iconType: UiIconType = 'system';
  @Input({ alias: 'ui-icon-color' }) iconColor?: string;
  @Input({ alias: 'ui-icon-size' }) iconSize: UiIconSize | string = 'l';

  /**
   * Gestiona el clic en la tarjeta. Si tiene una ruta, navega.
   */
  onClick(): void {
    if (this.detailRoute) {
      const route = Array.isArray(this.detailRoute)
        ? this.detailRoute
        : [this.detailRoute];
      this.router.navigate(route);
    }
  }

  /**
   * Mejora de Accesibilidad: Permite activar la tarjeta con Enter o Espacio.
   */
  @HostListener('keydown.enter')
  @HostListener('keydown.space')
  onKeydown(): void {
    this.onClick();
  }
}

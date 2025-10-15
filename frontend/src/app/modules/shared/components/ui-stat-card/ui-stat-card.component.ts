// src/app/modules/shared/components/ui-stat-card/ui-stat-card.component.ts

import { Component, Input, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // ¡NUEVO! Importamos RouterModule
import { UiIconType } from '@services/icon.service';

// --- Dependencias del Componente Standalone ---
import { UiIconComponent } from '@shared/components/ui-icon/ui-icon.component';

@Component({
  selector: 'app-ui-stat-card',
  // --- REFACTORIZACIÓN A STANDALONE ---
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // Necesario si la tarjeta va a ser un enlace con [routerLink]
    UiIconComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ------------------------------------
  templateUrl: './ui-stat-card.component.html',
  styleUrls: ['./ui-stat-card.component.scss'],
})
export class UiStatCardComponent {
  // === Entradas (Inputs) ===
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: string | number;
  @Input() icon?: string;
  @Input() detailRoute?: string | any[]; // MEJORA: Acepta arrays para rutas complejas.
  @Input() iconType: UiIconType = 'system'; // TODO: Revisar si UiIconType se importa correctamente
  @Input() iconSize: 'xs' | 's' | 'm' | 'l' | 'xl' | string | number = 'm';


  constructor(private router: Router) {}

  /**
   * Gestiona el clic en la tarjeta. Si tiene una ruta, navega.
   */
  onClick(): void {
    if (this.detailRoute) {
      // Aseguramos que la ruta sea un array para el método navigate.
      const route = Array.isArray(this.detailRoute) ? this.detailRoute : [this.detailRoute];
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
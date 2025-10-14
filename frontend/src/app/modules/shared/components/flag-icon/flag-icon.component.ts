// src/app/modules/shared/components/flag-icon/flag-icon.component.ts

import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para [ngClass], [ngStyle], etc.

@Component({
  selector: 'app-flag-icon',
  // ¡CLAVE! Se convierte a standalone.
  standalone: true,
  // ¡CLAVE! Importamos CommonModule para las directivas de Angular en la plantilla.
  imports: [
    CommonModule
  ],
  templateUrl: './flag-icon.component.html',
  styleUrls: ['./flag-icon.component.scss'],
  // ✅ OPTIMIZACIÓN: OnPush hace que el componente solo se actualice si sus @Inputs cambian.
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlagIconComponent implements OnChanges {
  // --- Entradas (Inputs) ---
  @Input({ required: true }) iso2: string = '';
  @Input() size: 'xs' | 's' | 'm' | 'l' | 'xl' | string = 'm';
  @Input() grayscale = false;
  @Input() iconType: 'country' | 'language' | 'other' = 'country';

  // --- Propiedades Internas ---
  public iconPath: string = '';
  public sizeClass: string = '';
  public customSize: string | null = null;

  // Ruta a un icono genérico que se usará si la bandera específica no se encuentra.
  private readonly fallbackIcon = 'assets/icons/flags/circle-flags/other/unknown.svg';

  ngOnChanges(changes: SimpleChanges): void {
    // ✅ OPTIMIZACIÓN: Usamos ngOnChanges para recalcular las propiedades solo cuando
    // los inputs relevantes (iso2, size, iconType) cambian, en lugar de en cada ciclo.
    if (changes['iso2'] || changes['size'] || changes['iconType']) {
      this.updateIconProperties();
    }
  }

  /**
   * Centraliza toda la lógica de cálculo de propiedades para mantener el código limpio.
   */
  private updateIconProperties(): void {
    this.updateSize();
    this.updateIconPath();
  }

  /**
   * Determina la clase CSS o el tamaño personalizado basado en el @Input 'size'.
   */
  private updateSize(): void {
    const validSizes = ['xs', 's', 'm', 'l', 'xl'];
    if (validSizes.includes(this.size)) {
      this.sizeClass = `flag--${this.size}`;
      this.customSize = null;
    } else {
      this.sizeClass = '';
      this.customSize = this.size;
    }
  }

  /**
   * Construye la ruta al icono SVG basado en el tipo y el código ISO.
   */
  private updateIconPath(): void {
    const code = (this.iso2 || '').toLowerCase();
    switch (this.iconType) {
      case 'language':
        this.iconPath = `assets/icons/flags/circle-flags/language/${code}.svg`;
        break;
      case 'other':
        this.iconPath = `assets/icons/flags/circle-flags/other/${code}.svg`;
        break;
      case 'country':
      default:
        this.iconPath = `assets/icons/flags/circle-flags/${code}.svg`;
        break;
    }
  }

  /**
   * ✅ ROBUSTEZ: Maneja el error si una imagen de bandera no se carga.
   * En lugar de mostrar un icono roto, muestra una bandera genérica de "desconocido".
   */
  onFlagError(event: Event): void {
    (event.target as HTMLImageElement).src = this.fallbackIcon;
  }
}
// src/app/modules/shared/components/ui-icon/ui-icon.component.ts

import { Component, Input, ChangeDetectionStrategy, HostBinding, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { SafeHtml } from '@angular/platform-browser';
import { IconService, UiIconType, UiIconRender } from '@services/icon.service';
import { ButtonSize } from '../ui-button/ui-button.component';

@Component({
    selector: 'app-ui-icon',
    standalone: true,
    imports: [CommonModule],
    // ✅ FUSIÓN: Plantilla actualizada para manejar SVG e imágenes.
    template: `
      <ng-container *ngIf="renderType === 'svg'; else imageTpl">
        <span class="icon-wrapper" [innerHTML]="svgContent$ | async"></span>
      </ng-container>

      <ng-template #imageTpl>
        <img [src]="imagePath" [alt]="name" class="icon-image" />
      </ng-template>
    `,
    // ✅ FUSIÓN: Se usa un fichero de estilos externo para mantener la consistencia.
    styleUrls: ['./ui-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiIconComponent implements OnChanges {
  private iconService = inject(IconService);

  // --- Entradas (Inputs) ---
  // ✅ FUSIÓN: Se mantiene la API completa del fichero original y se añade 'renderType'.
  @Input({ required: true }) name!: string;
  @Input() type: UiIconType = 'system';
  @Input() renderType: UiIconRender = 'svg';
  @Input() size: ButtonSize | 'inherit' | string = 'm';
  @Input() color?: string;

  // --- Propiedades internas ---
  public svgContent$: Observable<SafeHtml> = of('');
  public imagePath = '';

  // --- Vinculación de estilos al Host para controlar tamaño y color ---
  // ✅ FUSIÓN: Se mantiene el excelente sistema de tamaños basado en variables CSS.
  @HostBinding('style.--icon-size')
  get sizeStyle(): string {
    // Usamos las variables CSS globales para los tamaños predefinidos.
    const predefinedSizes = ['xs', 's', 'm', 'l', 'xl'];
    if (predefinedSizes.includes(this.size)) {
      return `var(--icon-size-${this.size})`;
    }
    return this.size === 'inherit' ? 'inherit' : this.size;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // ✅ FUSIÓN: La lógica ahora decide si cargar un SVG o una ruta de imagen.
    if (changes['name'] || changes['type'] || changes['renderType']) {
      if (this.renderType === 'svg') {
        this.svgContent$ = this.iconService.getIcon(this.name, this.type);
        this.imagePath = '';
      } else {
        this.imagePath = this.iconService.getIconPath(this.name, this.type, 'png');
        this.svgContent$ = of('');
      }
    }
  }
}

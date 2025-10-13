// src/app/modules/shared/components/ui-icon/ui-icon.component.ts

import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { IconService, UiIconType, UiIconRender } from 'src/app/services/icon.service';

@Component({
    selector: 'app-ui-icon',
    templateUrl: './ui-icon.component.html',
    styleUrls: ['./ui-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class UiIconComponent implements OnInit {
  @Input({ required: true }) icon!: string;
  @Input() type: UiIconType = 'system';
  @Input() color?: string;
  
  // ✅ CORREGIDO: El tipo ahora acepta cualquier string para máxima flexibilidad (ej: '1em', '32px')
  @Input() size: number | string = 'm'; 
  
  @Input() class?: string;
  @Input() renderAs: UiIconRender = 'svg';

  public svgContent$!: Observable<SafeHtml>;
  public imagePath: string = '';

  // El mapa ahora devuelve strings con la unidad 'px' incluida
  private readonly sizeMap: Record<string, string> = {
    xs: '16px', s: '20px', m: '24px', l: '32px', xl: '48px',
  };

  constructor(private iconService: IconService) {}

  ngOnInit(): void {
    if (this.renderAs === 'svg') {
      this.svgContent$ = this.iconService.getIcon(this.icon, this.type);
    } else {
      const [name, extension] = this.icon.split('.');
      this.imagePath = this.iconService.getIconPath(name, this.type, extension || 'png');
    }
  }

  /**
   * Devuelve el valor de tamaño para CSS.
   * Ahora es más inteligente:
   * - Si es un número, le añade 'px'.
   * - Si es un preset ('xs', 's'...), busca en el mapa.
   * - Si es otro string ('1em', '3rem'...), lo devuelve directamente.
   */
  get computedSize(): string {
    if (typeof this.size === 'number') {
      return `${this.size}px`;
    }
    return this.sizeMap[this.size] || this.size;
  }
}
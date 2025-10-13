// src/app/modules/shared/components/ui-icon/ui-icon.component.ts

import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { IconService, UiIconType, UiIconRender } from 'src/app/services/icon.service';

@Component({
  selector: 'app-ui-icon',
  templateUrl: './ui-icon.component.html',
  styleUrls: ['./ui-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiIconComponent implements OnInit {
  // --- Inputs del Componente con Valores por Defecto ---
  @Input({ required: true }) icon!: string;
  
  // ✅ El tipo por defecto ahora es 'system'
  @Input() type: UiIconType = 'system';
  
  // ✅ El tamaño por defecto es 'm'
  @Input() size: number | 'xs' | 's' | 'm' | 'l' | 'xl' = 'm';
  
  // ✅ El modo de renderizado por defecto es 'svg'
  @Input() renderAs: UiIconRender = 'svg';

  // --- Inputs Opcionales (pueden ser undefined) ---
  @Input() color?: string;
  @Input() class?: string;

  // --- Propiedades Públicas para la Plantilla ---
  public svgContent$!: Observable<SafeHtml>;
  public imagePath: string = '';

  private readonly sizeMap: Record<string, number> = {
    xs: 16, s: 20, m: 24, l: 32, xl: 48,
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

  get computedSize(): number {
    if (typeof this.size === 'number') {
      return this.size > 0 ? this.size : 24;
    }
    return this.sizeMap[this.size] || 24;
  }
}
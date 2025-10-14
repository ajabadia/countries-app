// src/app/modules/shared/components/ui-icon/ui-icon.component.ts

import { Component, Input, OnInit, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para async pipe, @if, etc.
import { HttpClientModule } from '@angular/common/http'; // ¡NUEVO! El componente gestiona su dependencia HTTP.
import { SafeHtml } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { IconService, UiIconType, UiIconRender } from 'src/app/services/icon.service';

@Component({
  selector: 'app-ui-icon',
  // --- REFACTORIZACIÓN A STANDALONE ---
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule // El componente standalone debe importar HttpClientModule.
  ],
  // ------------------------------------
  templateUrl: './ui-icon.component.html',
  styleUrls: ['./ui-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiIconComponent implements OnChanges {
  @Input({ required: true }) icon!: string;
  @Input() type: UiIconType = 'system';
  @Input() color?: string;
  @Input() size: number | string = 'm';
  @Input() class?: string;
  @Input() renderAs: UiIconRender = 'svg';

  public svgContent$: Observable<SafeHtml> = of('');
  public imagePath: string = '';
  public computedSize: string = '';

  private readonly sizeMap: Record<string, string> = {
    xs: '16px', s: '20px', m: '24px', l: '32px', xl: '48px',
  };

  constructor(private iconService: IconService) {}

  /**
   * MEJORA: Usamos ngOnChanges para recargar el icono si sus inputs cambian dinámicamente.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['icon'] || changes['type'] || changes['renderAs']) {
      this.loadIcon();
    }
    if (changes['size']) {
      this.updateSize();
    }
  }

  private loadIcon(): void {
    if (this.renderAs === 'svg') {
      this.svgContent$ = this.iconService.getIcon(this.icon, this.type);
    } else {
      const [name, extension] = this.icon.split('.');
      this.imagePath = this.iconService.getIconPath(name, this.type, extension || 'png');
    }
  }

  private updateSize(): void {
    if (typeof this.size === 'number') {
      this.computedSize = `${this.size}px`;
    } else if (this.sizeMap[this.size]) {
      this.computedSize = this.sizeMap[this.size];
    } else {
      this.computedSize = this.size; // Acepta valores directos como '1.5em' o '30px'.
    }
  }
}
// src/app/modules/shared/components/ui-icon/ui-icon.component.ts

import { Component, Input, ChangeDetectionStrategy, HostBinding, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { SafeHtml } from '@angular/platform-browser';
import { IconService, UiIconType } from '@services/icon.service';
import { ButtonSize } from '../ui-button/ui-button.component';

@Component({
    selector: 'app-ui-icon',
    standalone: true,
    imports: [CommonModule],
    // ✅ CORRECCIÓN: Añadimos la plantilla que renderiza el SVG.
    template: `<span [innerHTML]="svgContent$ | async"></span>`,
    styles: [`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--icon-size, 1em);
        height: var(--icon-size, 1em);
      }
      span {
        display: inherit;
        width: 100%;
        height: 100%;
      }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiIconComponent implements OnChanges {
  private iconService = inject(IconService);

  // --- Entradas (Inputs) ---
  // ✅ API ESTANDARIZADA: Usamos 'name' como input principal y añadimos 'color'.
  @Input({ required: true }) name!: string;
  @Input() type: UiIconType = 'system';
  @Input() size: ButtonSize | 'inherit' | string = 'm';
  @Input() color?: string;

  // --- Propiedades internas ---
  public svgContent$: Observable<SafeHtml> = of('');

  // --- Vinculación de estilos al Host para controlar tamaño y color ---
  @HostBinding('style.--icon-size')
  get sizeStyle(): string {
    // Usamos las variables CSS globales para los tamaños predefinidos.
    const predefinedSizes = ['xs', 's', 'm', 'l', 'xl'];
    if (predefinedSizes.includes(this.size)) {
      return `var(--icon-size-${this.size})`;
    }
    return this.size === 'inherit' ? 'inherit' : this.size;
  }

  @HostBinding('style.color') get iconColor() {
    return this.color;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name'] || changes['type']) {
      this.svgContent$ = this.iconService.getIcon(this.name, this.type);
    }
  }
}

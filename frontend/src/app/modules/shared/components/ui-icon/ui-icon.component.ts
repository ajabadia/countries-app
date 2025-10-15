// src/app/modules/shared/components/ui-icon/ui-icon.component.ts

import { Component, Input, ChangeDetectionStrategy, HostBinding, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { SafeHtml } from '@angular/platform-browser';
import { IconService, UiIconType } from '@services/icon.service';

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
  // ✅ CORRECCIÓN: Se restauran las propiedades de entrada que se habían perdido.
  @Input({ required: true }) icon!: string;
  @Input() type: UiIconType = 'system';
  @Input() size: 'inherit' | 'xs' | 's' | 'm' | 'l' | 'xl' | string = 'inherit';

  // --- Propiedades internas ---
  public svgContent$: Observable<SafeHtml> = of('');

  // --- Bindeo de estilos al Host para el tamaño ---
  @HostBinding('style.--icon-size')
  get sizeStyle(): string {
    const sizeMap: { [key: string]: string } = { xs: '1rem', s: '1.25rem', m: '1.5rem', l: '2rem', xl: '2.5rem' };
    return sizeMap[this.size] || (typeof this.size === 'string' ? this.size : `${this.size}px`);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // ✅ MEJORA: Reaccionamos a los cambios en los inputs para recargar el icono.
    if (changes['icon'] || changes['type']) {
      if (this.icon) {
        this.svgContent$ = this.iconService.getIcon(this.icon, this.type);
      }
    }
  }
}

// src/app/modules/shared/components/ui-icon/ui-icon.component.ts

import { Component, Input, OnChanges, SimpleChanges, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconService, UiIconType } from '@services/icon.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-ui-icon',
  standalone: true, // <-- CORRECCIÓN 1: Marcar como Standalone
  imports: [CommonModule],
  template: `<span [innerHTML]="svgContent$ | async"></span>`,
  styleUrls: ['./ui-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiIconComponent implements OnChanges {
  // --- Inyección de dependencias ---
  private iconService = inject(IconService); // <-- CORRECCIÓN 2: Usar inject()
  private sanitizer = inject(DomSanitizer);

  // --- Entradas (Inputs) ---
  @Input({ required: true }) icon!: string;
  @Input() type: UiIconType = 'system';
  @Input() size: 'xs' | 's' | 'm' | 'l' | 'xl' | string = 'm';

  // --- Propiedades internas ---
  public svgContent$!: Observable<SafeHtml>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['icon'] || changes['type']) {
      this.loadIcon();
    }
  }

  private loadIcon(): void {
    if (!this.icon) {
      this.svgContent$ = of('');
      return;
    }
    this.svgContent$ = this.iconService.getIcon(this.icon, this.type);
  }
}
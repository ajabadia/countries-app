// src/app/modules/shared/components/ui-stat-card/ui-stat-card.component.ts

import { Component, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';
// ✅ 1. Importamos el tipo estricto para los iconos
import { UiIconType } from 'src/app/services/icon.service';

@Component({
  selector: 'app-ui-stat-card',
  templateUrl: './ui-stat-card.component.html',
  styleUrls: ['./ui-stat-card.component.scss']
})
export class UiStatCardComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: string | number;
  @Input() icon?: string;
  @Input() detailRoute?: string;
  
  // ✅ 2. Usamos el tipo estricto 'UiIconType'
  @Input() iconType: UiIconType = 'system';
  @Input() iconClass: string = '';
  @Input() iconColor: string = '';

  // ✅ 3. El tamaño ahora se pasa directamente al componente hijo 'app-ui-icon'
  @Input() iconSize: 'xs' | 's' | 'm' | 'l' | 'xl' | number = 'm';

  // ❌ ELIMINADO: Ya no necesitamos HttpClient, DomSanitizer, ngOnInit,
  // svgContent, isActive, usaUiIcon() ni getIconSizePx(). El componente es ahora mucho más limpio.

  constructor(private router: Router) {}

  onClick(): void {
    if (this.detailRoute) {
      this.router.navigate([this.detailRoute]);
    }
  }

  @HostListener('keydown.enter')
  @HostListener('keydown.space')
  onKeydown() {
    this.onClick();
  }
}
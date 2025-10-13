// src/app/modules/shared/components/toolbar-buttons/toolbar-buttons.component.ts

import { Component, Input } from '@angular/core';
import { UiIconType } from 'src/app/services/icon.service'; // Importamos el tipo estricto

export interface ToolbarButtonConfig {
  icon: string;
  label: string;
  action: () => void;
  color: 'main' | 'edit' | 'danger' | string;
  disabled?: boolean;
  iconType?: UiIconType; // Usamos el tipo estricto
  iconSize?: number | 'xs' | 's' | 'm' | 'l' | 'xl';
  iconColor?: string;
  iconClass?: string;
}

@Component({
  selector: 'app-toolbar-buttons',
  templateUrl: './toolbar-buttons.component.html',
  styleUrls: ['./toolbar-buttons.component.scss']
})
export class ToolbarButtonsComponent {
  @Input() buttons: ToolbarButtonConfig[] = [];

  ejecutarAccion(btn: ToolbarButtonConfig) {
    if (!btn.disabled && typeof btn.action === 'function') {
      btn.action();
    }
  }
}
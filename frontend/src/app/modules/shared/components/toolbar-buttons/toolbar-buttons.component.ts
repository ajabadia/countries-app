// src/app/modules/shared/components/toolbar-buttons/toolbar-buttons.component.ts

import { Component, Input } from '@angular/core';
// ✅ 1. Importamos el tipo estricto desde el servicio de iconos
import { UiIconType } from 'src/app/services/icon.service';

// ✅ 2. Definimos una interfaz más robusta para los botones
export interface ToolbarButtonConfig {
  icon: string;
  label: string;
  action: () => void;
  color: 'main' | 'edit' | 'danger' | string;
  disabled?: boolean;
  // ✅ 3. Usamos el tipo estricto 'UiIconType' en lugar de 'string'
  iconType?: UiIconType;
  iconSize?: number | 'xs' | 's' | 'm' | 'l' | 'xl';
  iconColor?: string;
  iconClass?: string;
}

@Component({
    selector: 'app-toolbar-buttons',
    templateUrl: './toolbar-buttons.component.html',
    styleUrls: ['./toolbar-buttons.component.scss'],
    standalone: false
})
export class ToolbarButtonsComponent {
  // ✅ 4. Usamos la interfaz en el Input
  @Input() buttons: ToolbarButtonConfig[] = [];

  ejecutarAccion(btn: ToolbarButtonConfig) {
    if (!btn.disabled && typeof btn.action === 'function') {
      btn.action();
    }
  }
}
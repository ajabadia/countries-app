// src/app/modules/shared/components/toolbar-buttons/toolbar-buttons.component.ts

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiIconComponent } from '../ui-icon/ui-icon.component';
// ✅ CORREGIDO: Ruta de importación con erratas
import { UiIconType } from 'src/app/services/icon.service';

export interface ToolbarButtonConfig {
  icon: string;
  label: string;
  action: () => void;
  color: 'main' | 'edit' | 'danger' | string;
  disabled?: boolean;
  iconType?: UiIconType;
  iconSize?: number | 'xs' | 's' | 'm' | 'l' | 'xl';
  iconColor?: string;
  iconClass?: string;
}

@Component({
  selector: 'app-toolbar-buttons',
  standalone: true,
  imports: [ CommonModule, UiIconComponent ],
  templateUrl: './toolbar-buttons.component.html',
  styleUrls: ['./toolbar-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarButtonsComponent {
  @Input() buttons: ToolbarButtonConfig[] = [];

  /** ✅ CORREGIDO: El nombre del método es 'executeAction' */
  executeAction(btn: ToolbarButtonConfig): void {
    if (!btn.disabled && typeof btn.action === 'function') {
      btn.action();
    }
  }
}
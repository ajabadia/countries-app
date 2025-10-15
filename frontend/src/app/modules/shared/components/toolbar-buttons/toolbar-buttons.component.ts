// src/app/modules/shared/components/toolbar-buttons/toolbar-buttons.component.ts

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiIconComponent } from '../ui-icon/ui-icon.component';
import { UiIconType } from '@services/icon.service';
import { Observable } from 'rxjs';

export interface ToolbarButtonConfig {
  icon: string;
  label: string;
  action: () => void;
  color: 'main' | 'edit' | 'danger' | string;
  disabled$?: Observable<boolean>;
  iconType?: UiIconType;
  iconSize?: 'xs' | 's' | 'm' | 'l' | 'xl' | string;
  iconColor?: string;
  id?: string;
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
    if (typeof btn.action === 'function') {
      btn.action();
    }
  }
}
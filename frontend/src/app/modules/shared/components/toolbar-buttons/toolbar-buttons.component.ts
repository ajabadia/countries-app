// src/app/modules/shared/components/toolbar-buttons/toolbar-buttons.component.ts

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UiButtonComponent, ButtonColor, ButtonVariant, ButtonSize } from '../ui-button/ui-button.component';
import { UiIconType } from '@services/icon.service';

export interface ToolbarButtonConfig {
  id: string;
  label: string;
  icon?: string;
  // ✅ ESTANDARIZACIÓN: Ahora admite todas las propiedades de ui-button
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconPosition?: 'left' | 'right' | 'top' | 'bottom';
  iconType?: UiIconType;
  textAlign?: 'left' | 'center' | 'right';
  action: () => void;
  disabled$?: Observable<boolean>;
}

@Component({
  selector: 'app-toolbar-buttons',
  standalone: true,
  imports: [ CommonModule, UiButtonComponent ],
  template: `
    <div class="toolbar-buttons">
      @for (button of buttons; track button.id) {
        <app-ui-button
          (onClick)="button.action()"
          [disabled]="(button.disabled$ | async) ?? false"
          [color]="button.color || 'primary'"
          [variant]="button.variant || 'solid'"
          [size]="button.size || 'm'"
          [icon]="button.icon"
          [iconPosition]="button.iconPosition || 'left'"
          [iconType]="button.iconType || 'system'"
          [textAlign]="button.textAlign || 'center'"
          [attr.data-cy]="'toolbar-button-' + button.id">
          {{ button.label }}
        </app-ui-button> 
      }
    </div>
  `,
  styleUrls: ['./toolbar-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarButtonsComponent {
  @Input() buttons: ToolbarButtonConfig[] = [];
}
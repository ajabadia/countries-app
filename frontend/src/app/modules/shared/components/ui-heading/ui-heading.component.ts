// d:/desarrollos/countries2/frontend/src/app/modules/shared/components/ui-heading/ui-heading.component.ts

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiIconComponent } from '../ui-icon/ui-icon.component';

@Component({
  selector: 'app-ui-heading',
  standalone: true,
  imports: [CommonModule, UiIconComponent],
  template: `
    <div class="ui-heading" [class.reverse]="iconPosition === 'right'" [style.justify-content]="align">
      @if (icon) { <!-- USO DIRECTO Y CORRECTO: Pasamos el icono y su tipo a ui-icon -->
        <app-ui-icon [icon]="icon" [type]="iconType" size="l" class="ui-heading__icon" />
      }
      <div class="ui-heading__text-content">
        <!-- Renderiza el nivel de encabezado correcto (h1, h2, etc.) -->
        <ng-container [ngSwitch]="level">
          <h1 *ngSwitchCase="1" class="ui-heading__title">{{ title }}</h1>
          <h2 *ngSwitchCase="2" class="ui-heading__title">{{ title }}</h2>
          <h3 *ngSwitchCase="3" class="ui-heading__title">{{ title }}</h3>
        </ng-container>
        @if (subtitle) {
          <p class="ui-heading__subtitle">{{ subtitle }}</p>
        }
      </div>
    </div>
  `,
  styleUrls: ['./ui-heading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiHeadingComponent {
  @Input() title: string | null = '';
  @Input() icon?: string | null = '';
  @Input() iconType: 'system' | 'flag-circle' = 'system'; // Por defecto, es un icono de sistema.
  @Input() level: 1 | 2 | 3 = 1;
  @Input() align: 'left' | 'center' | 'right' = 'left';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() subtitle: string | null = null;
}
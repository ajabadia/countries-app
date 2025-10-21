// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-toolbar-buttons\ui-toolbar-buttons.component.ts | Last Modified: 2025-10-19

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

// Importamos los componentes y tipos necesarios de nuestros módulos compartidos
import { UiButtonComponent, ButtonColor, ButtonVariant, ButtonSize } from '@shared/components/ui-button/ui-button.component';
import { UiIconType } from '@shared/services/icon.service';

/**
 * Define la configuración para un solo botón dentro de la barra de herramientas.
 * Esta interfaz está diseñada para pasar todas las propiedades necesarias a un `app-ui-button`.
 */
export interface ToolbarButtonConfig {
  id: string;
  label: string;
  action: () => void;
  iconName?: string;
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconPosition?: 'left' | 'right' | 'only';
  iconType?: UiIconType;
  disabled$?: Observable<boolean>;
}

@Component({
  selector: 'app-ui-toolbar-buttons',
  standalone: true,
  imports: [CommonModule, UiButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!--
      Este contenedor es un componente "tonto" que solo se encarga del layout.
      Itera sobre la configuración y renderiza cada botón, delegando todo el estilo
      y la lógica al componente 'app-ui-button'.
    -->
    @for (button of buttons; track button.id) {
      <button app-ui-button
        (click)="button.action()"
        [attr.data-cy]="'toolbar-button-' + button.id"
        
        [ui-button-color]="button.color || 'primary'"
        [ui-button-variant]="button.variant || 'solid'"
        [ui-button-size]="button.size || 'm'"
        [ui-button-disabled]="(button.disabled$ | async) ?? false"

        [ui-icon-name]="button.iconName"
        [ui-icon-position]="button.iconPosition || 'left'"
        [ui-icon-type]="button.iconType || 'system'"
      >
        {{ button.label }}
      </button>
    }
  `,
  styleUrls: ['./ui-toolbar-buttons.component.scss'],
})
export class UiToolbarButtonsComponent {
  /**
   * La configuración para los botones que se mostrarán en la barra.
   * Se aliasa con el prefijo del componente para seguir nuestras convenciones.
   */
  @Input({ alias: 'ui-toolbar-buttons' }) buttons: ToolbarButtonConfig[] = [];
}

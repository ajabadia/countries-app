// frontend/src/app/shared/components/ui/ui-spinner/ui-spinner.component.ts

import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

/**
 * @description
 * Componente visual para mostrar un indicador de carga (spinner).
 * Es un componente `standalone` y puramente presentacional.
 */
@Component({
  selector: 'app-ui-spinner',
  standalone: true,
  imports: [],
  templateUrl: './ui-spinner.component.html',
  styleUrls: ['./ui-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSpinnerComponent {
  /**
   * @description El tamaño (ancho y alto) del spinner. Se puede especificar en px, rem, em, etc.
   */
  @Input({ alias: 'uiSpinnerSize' }) @HostBinding('style.width') @HostBinding('style.height') size = '40px';
 
  /**
   * @description El grosor del borde del spinner.
   */
  @Input({ alias: 'uiSpinnerThickness' }) @HostBinding('style.--_spinner-thickness') thickness = '4px';
}
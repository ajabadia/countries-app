import { Component, Input } from '@angular/core';

/**
 * Interfaz base para la configuración de cada botón de la toolbar
 * Todos los parámetros incluidos para icono, visual, y eventos.
 */
export interface ToolbarButtonConfig {
  icon: string; // Nombre del icono (ej: 'icon-add')
  iconType?: string; // Tipo de icono (por defecto 'system')
  iconSize?: number | 'xs' | 's' | 'm' | 'l' | 'xl'; // Tamaño
  iconColor?: string;
  iconClass?: string;
  label: string; // Texto del botón
  color: 'main' | 'edit' | 'danger' | string; // Colores del sistema o personalizados
  disabled?: boolean; // true si el botón está deshabilitado
  action: () => void; // Callback, pasas () => this.onNew() (padre)
}

@Component({
  selector: 'app-toolbar-buttons',
  templateUrl: './toolbar-buttons.component.html',
  styleUrls: ['./toolbar-buttons.component.scss']
})
export class ToolbarButtonsComponent {
  /**
   * Recibe el array de botones desde el padre
   */
  @Input() buttons: ToolbarButtonConfig[] = [];

  // Defaults para iconos si el padre no los especifica
  readonly defaultIconType = 'system';
  readonly defaultIconSize: 's' = 's';
  readonly defaultIconColor = '';

  /**
   * Esta función intermedia se llama siempre desde el template HTML en (click).
   * Así se garantiza que no se pierda el contexto de Angular/Padre
   * y el método del padre (ej: this.onNew()) se ejecuta de verdad.
   * Además, solo ejecuta la acción si el botón está habilitado.
   */
  ejecutarAccion(btn: ToolbarButtonConfig) {
    if (!btn.disabled && typeof btn.action === 'function') {
      btn.action();
    }
  }
}

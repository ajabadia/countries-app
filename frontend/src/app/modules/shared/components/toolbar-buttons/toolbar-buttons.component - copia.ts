import { Component, Input } from '@angular/core';

/**
 * Interfaz de configuración para cada botón de la toolbar.
 * Permite determinar el icono (ruta SVG), texto, color, estado y acción.
 */
export interface ToolbarButtonConfig {
  iconSrc: string; // Ruta al SVG, por ejemplo: 'assets/icons/icon-add.svg'
  label: string;   // Texto del botón
  color: 'main' | 'edit' | 'danger' | string; // Clase visual (también permite personalizadas)
  disabled?: boolean; // true si el botón debe estar deshabilitado
  action: () => void; // Acción a ejecutar al hacer click
}

@Component({
  selector: 'app-toolbar-buttons',
  templateUrl: './toolbar-buttons.component.html',
  styleUrls: ['./toolbar-buttons.component.scss']
})
export class ToolbarButtonsComponent {
  /**
   * Recibe desde el padre el array de botones a renderizar,
   * con iconos SVG, texto, color, estado y callback.
   */
  @Input() buttons: ToolbarButtonConfig[] = [];

  // Opcional: puedes añadir aquí métodos de utilidad para test o depuración.
}


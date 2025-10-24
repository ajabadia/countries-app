import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiIconComponent } from '@app/shared/components/ui-icon/ui-icon.component'; // Asumiendo esta ruta

@Component({
  selector: 'app-ui-heading',
  standalone: true,
  imports: [CommonModule, UiIconComponent],
  templateUrl: './ui-heading.component.html',
  styleUrls: ['./ui-heading.component.scss'],
})
export class UiHeadingComponent {
  @Input() uiHeading: string = ''; // Input principal para el texto del encabezado
  @Input() uiHeadingLevel: number = 3; // Nivel del encabezado (h1, h2, etc.)
  @Input() uiIconName: string | null = null;
  @Input() uiIconType: string = 'system';
  @Input() uiIconSize: string = 'm'; 
  @Input() uiIconColor: string | undefined = undefined;
  @Input() uiIconPosition: 'left' | 'right' = 'left';

  // No es necesario `title` o `level` internos si el HTML usa `uiHeading` y `uiHeadingLevel` directamente
}
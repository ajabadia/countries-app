import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar-buttons',
  templateUrl: './toolbar-buttons.component.html',
  styleUrls: ['./toolbar-buttons.component.scss']
})
export class ToolbarButtonsComponent {
  @Input() selected: any[] = [];
  @Input() entity: string = 'elemento';
  @Output() new = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
}


export interface ToolbarButtonConfig {
  iconSvg?: string;           // SVG como string (contenido SVG, src, o plantilla Angular)
  label: string;
  color: 'main' | 'edit' | 'danger' | string;   // Lo que quieras usar como clase
  disabled?: boolean;
  action: () => void;
}

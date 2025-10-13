import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { SelectionService } from 'src/app/modules/shared/components/services/selection/selection.service';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  sticky?: 'left' | 'right';
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() items: any[] = [];
  @Input() selectable: boolean = true;
  @Input() selection!: SelectionService<any>;
  @Output() selectionChange = new EventEmitter<any[]>();
  @Output() sortChange = new EventEmitter<{ key: string, order: 'asc' | 'desc' }>();

  // Toggle general (cabecera)
  get generalToggleState(): 'checked' | 'unchecked' | 'indeterminate' {
    if (!this.selection || !this.items?.length) return 'unchecked';
    if (this.selection.selected.length === this.items.length) return 'checked';
    if (this.selection.selected.length > 0) return 'indeterminate';
    return 'unchecked';
  }

  onGeneralToggle(newState: 'checked' | 'unchecked' | 'indeterminate') {
    if (newState === 'checked') {
      this.selection.selected = [...this.items];
    } else {
      this.selection.selected = [];
    }
    this.selectionChange.emit([...this.selection.selected]);
  }

  // Toggle por fila
  rowToggleState(row: any): 'checked' | 'unchecked' {
    return this.selection.selected.some(item => item.id === row.id) ? 'checked' : 'unchecked';
  }

  onRowToggle(row: any, newState: 'checked' | 'unchecked' | 'indeterminate') {
    if (newState === 'checked') {
      // Selección simple
      if (!this.selection.selected.some(item => item.id === row.id)) {
        this.selection.selected = [...this.selection.selected, row];
      }
    } else {
      // Deselección simple
      this.selection.selected = this.selection.selected.filter(item => item.id !== row.id);
    }
    this.selectionChange.emit([...this.selection.selected]);
  }

  // --- Selección avanzada por click en fila ---
  onRowClick(row: any, event: MouseEvent): void {
    if (event.ctrlKey || event.metaKey) {
      // Toggle el elemento (Ctrl/Cmd)
      if (this.selection.selected.some(item => item.id === row.id)) {
        this.selection.selected = this.selection.selected.filter(item => item.id !== row.id);
      } else {
        this.selection.selected = [...this.selection.selected, row];
      }
    } else if (event.shiftKey) {
      // Selección por rango (Shift)
      const lastSelectedIndex = this.items.findIndex(item => item.id === this.selection.selected[this.selection.selected.length - 1]?.id);
      const thisIndex = this.items.findIndex(item => item.id === row.id);

      if (lastSelectedIndex !== -1) {
        const [start, end] = [lastSelectedIndex, thisIndex].sort((a, b) => a - b);
        const range = this.items.slice(start, end + 1);
        // Combina actuales más el rango
        const newSelection = [
          ...this.selection.selected,
          ...range.filter(r => !this.selection.selected.some(item => item.id === r.id))
        ];
        this.selection.selected = Array.from(new Set(newSelection.map(item => item.id)))
          .map(id => this.items.find(item => item.id === id));
      } else {
        this.selection.selected = [row];
      }
    } else {
      // Selección simple
      this.selection.selected = [row];
    }
    this.selectionChange.emit([...this.selection.selected]);
  }

  // Estilos de columna sticky/ancho
  getColStyle(col: TableColumn): { [key: string]: string } {
    const style: { [key: string]: string } = {};
    if (col.width) style['width'] = col.width;
    if (col.minWidth) style['min-width'] = col.minWidth;
    if (col.maxWidth) style['max-width'] = col.maxWidth;
    if (col.sticky) {
      style['position'] = 'sticky';
      style[col.sticky] = '0';
    }
    return style;
  }

  // Ordenación (llama evento al padre)
  onSort(col: TableColumn): void {
    if (!col.sortable) return;
    // Alternancia asc/desc opcional, aquí solo ejemplo
    this.sortChange.emit({ key: col.key, order: 'asc' });
  }

  // Aplica la clase 'row-selected' y el tabindex/focus para accesibilidad
  isSelected(row: any): boolean {
    return this.selection.selected.some(item => item.id === row.id);
  }
}

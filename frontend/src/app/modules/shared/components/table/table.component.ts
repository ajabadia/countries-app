import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SelectionService } from 'src/app/modules/shared/components/services/selection/selection.service';
import { TableColumn } from 'src/app/modules/shared/models/table-column.model'; 

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    standalone: false
})
export class TableComponent {
  // === Inputs ===
  @Input() columns: TableColumn[] = [];
  @Input() items: any[] = [];
  @Input() selectable: boolean = true;
  @Input({ required: true }) selection!: SelectionService<any>; 
  
  // ✅ NUEVO: Inputs para que el componente reciba explícitamente el estado de la ordenación.
  @Input() sortKey: string | null = null;
  @Input() sortOrder: 'asc' | 'desc' = 'asc';
  
  // === Outputs ===
  @Output() selectionChange = new EventEmitter<any[]>();
  @Output() sortChange = new EventEmitter<{ key: string, order: 'asc' | 'desc' }>();
  @Output() rowClick = new EventEmitter<any>();

  /** Determina el estado del checkbox de la cabecera. */
  get generalToggleState(): 'checked' | 'unchecked' | 'indeterminate' {
    if (!this.selection || !this.items?.length) return 'unchecked';
    if (this.selection.allSelected(this.items)) return 'checked';
    if (this.selection.someSelected(this.items)) return 'indeterminate';
    return 'unchecked';
  }

  /** Devuelve el estado del toggle para una fila específica. */
  rowToggleState(row: any): 'checked' | 'unchecked' {
    return this.isSelected(row) ? 'checked' : 'unchecked';
  }

  /** Handler: Toggle del checkbox de la cabecera. */
  onGeneralToggle(newState: 'checked' | 'unchecked' | 'indeterminate') {
    if (!this.selection) return;
    if (newState === 'checked') {
      this.selection.selectAll(this.items);
    } else {
      this.selection.clear();
    }
    this.selectionChange.emit(this.selection.selectedArray);
  }

  /** Handler: Toggle del checkbox de una fila. */
  onRowToggle(row: any) {
    if (!this.selection) return;
    this.selection.toggle(row);
    this.selectionChange.emit(this.selection.selectedArray);
  }

  /** Handler: Click en la fila (maneja selección y navegación). */
  onRowClick(row: any, event: MouseEvent): void {
    this.rowClick.emit(row);
    if (!this.selectable || !this.selection) return;
    this.selection.select(row, this.items, event);
    this.selectionChange.emit(this.selection.selectedArray);
  }

  /** Comprueba si la fila está seleccionada. */
  isSelected(row: any): boolean {
    return this.selection && this.selection.isSelected(row.id);
  }

  /** Devuelve estilos de columna para sticky/ancho. */
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

  /** Ordenación (emite el evento al padre). */
  onSort(col: TableColumn): void {
    if (!col.sortable) return;
    
    // ✅ CORREGIDO: Ahora usa los Inputs que recibe del padre, no un acceso inseguro.
    const newOrder: 'asc' | 'desc' = (this.sortKey === col.key && this.sortOrder === 'asc') ? 'desc' : 'asc';
    
    this.sortChange.emit({ key: col.key, order: newOrder });
  }
}
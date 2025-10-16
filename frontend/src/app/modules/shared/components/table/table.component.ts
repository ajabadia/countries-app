import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, booleanAttribute, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

// --- Componentes y Modelos ---
import { UiIconComponent } from '../ui-icon/ui-icon.component';
import { TableColumn } from '@services/table-column.model';
import { SelectionService } from '@services/selection.service';
import { ToggleCheckboxComponent, ToggleState } from '../toggle-checkbox/toggle-checkbox.component';
import { FlagIconComponent } from '../flag-icon/flag-icon.component';
import { UiButtonComponent } from '../ui-button/ui-button.component';

export interface SortChangeEvent {
  key: string;
  direction: 'asc' | 'desc';
}

export interface ActionEvent {
  action: string;
  item: any;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, UiIconComponent, ToggleCheckboxComponent, FlagIconComponent, UiButtonComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnChanges {
  @Input() columns: TableColumn<any>[] = [];
  @Input() items: any[] = [];
  // ✅ MEJORA: El servicio de selección ahora es opcional.
  @Input() selection?: SelectionService<any>;
  @Input() sortKey: string | null = null;
  @Input() sortOrder: 'asc' | 'desc' = 'asc';

  @Output() sortChange = new EventEmitter<SortChangeEvent>();
  @Output() action = new EventEmitter<ActionEvent>();

  // ✅ MEJORA: Estado para el checkbox de la cabecera con 3 estados.
  public headerCheckboxState: ToggleState = 'off';

  ngOnChanges(changes: SimpleChanges): void {
    // Si los items o la selección cambian, recalculamos el estado del checkbox de la cabecera.
    if (this.selection && (changes['items'] || changes['selection'])) {
      this.updateHeaderCheckboxState();
    }
  }

  /**
   * Maneja el clic en una cabecera de columna para ordenar.
   * @param key La clave de la columna.
   * @param sortable Indica si la columna es ordenable.
   */
  onSort(key: string | keyof any, sortable?: boolean): void {
    if (!sortable) return;

    if (this.sortKey === key) {
      // Si se hace clic en la misma columna, se invierte el orden
      const newDirection = this.sortOrder === 'asc' ? 'desc' : 'asc';
      this.sortChange.emit({ key, direction: newDirection });
    } else {
      // Si se hace clic en una nueva columna, se ordena ascendentemente por defecto
      this.sortChange.emit({ key: key as string, direction: 'asc' });
    }
  }

  /**
   * Emite un evento de acción.
   * @param actionName El nombre de la acción (ej: 'edit', 'delete').
   * @param item El objeto de la fila.
   */
  onAction(actionName: string, item: any): void {
    this.action.emit({ action: actionName, item });
  }

  /**
   * Obtiene de forma segura el valor de una propiedad, incluso si está anidada.
   * Por ejemplo, para una clave 'country.name', obtendrá el valor correcto.
   * @param item El objeto de la fila.
   * @param key La clave de la propiedad.
   * @returns El valor de la propiedad.
   */
  getCellValue(item: any, key: string | keyof any): any {
    // Reemplazo simple de lodash.get para evitar la dependencia
    const keyAsString = String(key);
    return keyAsString.split('.').reduce((o, i) => (o ? o[i] : undefined), item);
  }

  /**
   * Maneja el clic en una fila para la selección.
   * @param item El objeto de la fila.
   * @param event El evento del ratón.
   */
  onRowClick(item: any, event: MouseEvent): void {
    if (!this.selection) return;
    
    // El servicio de selección necesita una función para obtener la clave única del item.
    const getKey = (i: any) => i.id;

    // Permite selección múltiple con Ctrl/Cmd, o simple con un solo clic.
    // Evita la selección si se hace clic en un elemento interactivo dentro de la fila.
    if (event.ctrlKey || event.metaKey) this.selection.toggle(item, getKey);
    else this.selection.set([item]);
  }

  /**
   * Maneja el cambio de estado del checkbox de la cabecera (seleccionar/deseleccionar todo).
   */
  onToggleAll(): void {
    if (!this.selection) return;
    const getKey = (i: any) => i.id;

    if (this.headerCheckboxState === 'on') {
      this.selection.deselect(this.items, getKey);
    } else {
      this.selection.select(this.items, getKey);
    }
    this.updateHeaderCheckboxState();
  }

  /**
   * Actualiza el estado del checkbox de la cabecera (on, off, intermediate).
   */
  private updateHeaderCheckboxState(): void {
    if (!this.selection || !this.items || this.items.length === 0) {
      this.headerCheckboxState = 'off';
      return;
    }

    const numSelected = this.items.filter(item => this.selection!.has(item.id)).length;

    if (numSelected === 0) this.headerCheckboxState = 'off';
    else if (numSelected === this.items.length) this.headerCheckboxState = 'on';
    else this.headerCheckboxState = 'intermediate';
  }
}
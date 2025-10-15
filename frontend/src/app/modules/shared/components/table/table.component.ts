import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes y Modelos
import { UiIconComponent } from '../ui-icon/ui-icon.component';
import { TableColumn } from 'src/app/services/table-column.model';
import { SelectionService } from 'src/app/services/selection.service';

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
  imports: [CommonModule, UiIconComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() items: any[] = [];
  @Input({ transform: booleanAttribute })
  @Input() selection?: SelectionService<any>;
  @Input() sortKey: string | null = null;
  @Input() sortOrder: 'asc' | 'desc' = 'asc';

  @Output() sortChange = new EventEmitter<SortChangeEvent>();
  @Output() action = new EventEmitter<ActionEvent>();

  /**
   * Maneja el clic en una cabecera de columna para ordenar.
   * @param key La clave de la columna.
   */
  onSort(key: string): void {
    if (this.sortKey === key) {
      // Si se hace clic en la misma columna, se invierte el orden
      const newDirection = this.sortOrder === 'asc' ? 'desc' : 'asc';
      this.sortChange.emit({ key, direction: newDirection });
    } else {
      // Si se hace clic en una nueva columna, se ordena ascendentemente por defecto
      this.sortChange.emit({ key, direction: 'asc' });
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
  getCellValue(item: any, key: string): any {
    // Reemplazo simple de lodash.get para evitar la dependencia
    return key.split('.').reduce((o, i) => (o ? o[i] : undefined), item);
  }

  /**
   * Maneja el clic en una fila para la selección.
   * @param item El objeto de la fila.
   * @param event El evento del ratón.
   */
  onRowClick(item: any, event: MouseEvent): void {
    if (!this.selection) return;

    // ✅ FIX 1: Proporcionar la función `getKey` que espera el servicio de selección.
    // Asumimos que cada 'item' tiene una propiedad 'id' única.
    const getKey = (i: any) => i.id;

    // ✅ FIX 2: Usar la API actualizada de SelectionService.
    if (event.ctrlKey || event.metaKey) this.selection.toggle(item, getKey);
    else this.selection.set([item]);
  }
}
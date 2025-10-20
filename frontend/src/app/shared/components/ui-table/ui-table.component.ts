// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-table\ui-table.component.ts | Last Modified: 2025-10-19

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionService } from '@shared/services/selection.service';
import { TableColumn } from './table.types';
import { Sort, SortDirection } from '@shared/types/sort.type';
import { UiToggleCheckboxComponent, UiToggleState } from '@app/shared/components/ui-toggle-checkbox/ui-toggle-checkbox.component';

@Component({
  selector: 'app-ui-table',
  standalone: true,
  imports: [CommonModule, UiToggleCheckboxComponent],
  templateUrl: './ui-table.component.html',
  styleUrls: ['./ui-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTableComponent<T extends { id: number | string }> implements OnChanges {
  @Input({ alias: 'ui-table-data' }) data: T[] | null = [];
  @Input({ alias: 'ui-table-columns' }) columns: TableColumn<T>[] = [];
  @Input({ alias: 'ui-table-selection' }) selection: SelectionService<T> | null = null;
  @Input({ alias: 'ui-table-sort' }) sort: Sort<T> | null = null;
  @Input({ alias: 'ui-table-is-loading' }) isLoading = false;

  @Output('ui-table-sort-change') sortChange = new EventEmitter<Sort<T>>();

  // Permite al componente padre proyectar una plantilla para la columna de acciones
  @ContentChild('actions', { read: TemplateRef })
  actionsTemplate: TemplateRef<{ $implicit: T }> | null = null;

  // Estado para el checkbox de la cabecera con 3 estados.
  public headerCheckboxState: UiToggleState = 'ui-toggle-unchecked';

  ngOnChanges(changes: SimpleChanges): void {
    // Si los items o la selección cambian, recalculamos el estado del checkbox de la cabecera.
    if (this.selection && (changes['data'] || changes['selection'])) {
      this.updateHeaderCheckboxState();
    }
  }

  // Helper para acceder al valor de una celda, incluso si la clave es anidada (ej: 'user.name')
  getCellValue(item: T, key: keyof T | string): any {
    const keys = (key as string).split('.');
    let value: any = item;
    for (const k of keys) {
      if (value === null || value === undefined) {
        return '';
      }
      value = value[k];
    }
    return value;
  }

  onSort(column: TableColumn<T>): void {
    if (!column.sortable) {
      return;
    }

    let orderDir: SortDirection = 'asc';
    if (
      this.sort &&
      this.sort.orderBy === column.key &&
      this.sort.orderDir === 'asc'
    ) {
      orderDir = 'desc';
    }

    this.sortChange.emit({ orderBy: column.key as keyof T, orderDir });
  }

  isSorted(column: TableColumn<T>, dir: SortDirection): boolean {
    return (
      this.sort?.orderBy === column.key && this.sort?.orderDir === dir
    );
  }

  /**
   * Maneja el cambio de estado del checkbox de la cabecera (seleccionar/deseleccionar todo).
   */
  onToggleAll(): void {
    if (!this.selection || !this.data) return;

    this.selection.toggleAll(this.data);
    this.updateHeaderCheckboxState();
  }

  /**
   * Maneja el clic en una fila para la selección.
   * @param item El objeto de la fila.
   */
  onRowClick(item: T): void {
    if (!this.selection) return;
    this.selection.toggle(item);
    this.updateHeaderCheckboxState();
  }

  /**
   * Actualiza el estado del checkbox de la cabecera (on, off, intermediate).
   */
  private updateHeaderCheckboxState(): void {
    if (!this.selection || !this.data || this.data.length === 0) {
      this.headerCheckboxState = 'ui-toggle-unchecked';
      return;
    }

    // Contamos cuántos de los items de la página actual están seleccionados
    const numSelectedOnPage = this.data.filter(item => this.selection!.isSelected(item)).length;
    const totalItemsOnPage = this.data.length;

    if (numSelectedOnPage === 0) {
      this.headerCheckboxState = 'ui-toggle-unchecked';
    } else if (numSelectedOnPage === totalItemsOnPage) {
      this.headerCheckboxState = 'ui-toggle-checked';
    } else {
      this.headerCheckboxState = 'ui-toggle-indeterminate';
    }
  }
}

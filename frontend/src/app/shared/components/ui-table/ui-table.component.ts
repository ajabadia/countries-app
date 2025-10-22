// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-table\ui-table.component.ts | Last Modified: 2025-10-19

import {
  Component,
  input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ContentChildren,
  computed,
  effect,
  TemplateRef,
  OnChanges,
  SimpleChanges,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionService } from '@shared/services/selection.service';
import { TableColumn } from './table.types';
import { Sort, SortDirection } from '@shared/types/sort.type';
import { UiTableColumnDirective } from './ui-table-column.directive';
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
  // --- Inputs ---
  data = input<T[] | null | undefined>([], { alias: 'ui-table-data' });
  columns = input<TableColumn<T>[]>([], { alias: 'ui-table-columns' });
  selection = input<SelectionService<T> | null>(null, { alias: 'ui-table-selection' });
  sort = input<Sort<T> | null>(null, { alias: 'ui-table-sort' });
  isLoadingInput = input<boolean | undefined>(undefined, { alias: 'ui-table-is-loading' });

  // --- Estado Interno y Derivado ---
  isLoading = computed(() => this.isLoadingInput() ?? this.data() === null);

  @Output('ui-table-sort-change') sortChange = new EventEmitter<Sort<T>>();

  // Usamos ContentChildren para buscar todas las plantillas proyectadas.
  @ContentChildren(UiTableColumnDirective)
  private columnTemplates: QueryList<UiTableColumnDirective> | null = null;

  // Estado para el checkbox de la cabecera con 3 estados.
  public headerCheckboxState: UiToggleState = 'ui-toggle-unchecked';

  ngOnChanges(changes: SimpleChanges): void {
    // Si los items o la selección cambian, recalculamos el estado del checkbox de la cabecera.
    if (this.selection() && (changes['data'] || changes['selection'])) {
      this.updateHeaderCheckboxState();
    }
  }

  // Propiedad para acceder a la plantilla de acciones de forma más sencilla
  actionsTemplate = computed(() => {
    return this.getCellTemplate('actions');
  });

  // Helper para encontrar la plantilla de una columna específica
  getCellTemplate(columnKey: keyof T | string): TemplateRef<unknown> | null {
    if (!this.columnTemplates) {
      return null;
    }
    const templateDirective = this.columnTemplates.find(
      (tpl) => tpl.columnName === columnKey
    );
    return templateDirective ? templateDirective.templateRef : null;
  }

  // Helper para acceder al valor de una celda, incluso si la clave es anidada (ej: 'user.name')
  getCellValue(item: T, key: keyof T | string): unknown {
    const keys = (key as string).split('.');
    let value: unknown = item;
    for (const k of keys) {
      if (value === null || value === undefined) {
        return '';
      }
      value = (value as Record<string, unknown>)[k];
    }
    return value;
  }

  onSort(column: TableColumn<T>): void {
    if (!column.sortable) {
      return;
    }

    let orderDir: SortDirection = 'asc';
    if (
      this.sort() &&
      this.sort()!.orderBy === column.key &&
      this.sort()!.orderDir === 'asc'
    ) {
      orderDir = 'desc';
    }

    this.sortChange.emit({ orderBy: column.key as keyof T, orderDir });
  }

  isSorted(column: TableColumn<T>, dir: SortDirection): boolean {
    return (
      this.sort()?.orderBy === column.key && this.sort()?.orderDir === dir
    );
  }

  /**
   * Maneja el cambio de estado del checkbox de la cabecera (seleccionar/deseleccionar todo).
   */
  onToggleAll(): void {
    const selection = this.selection();
    if (!selection || !this.data()) return;

    selection.toggleAll(this.data()!);
    this.updateHeaderCheckboxState();
  }

  /**
   * Maneja el clic en una fila para la selección.
   * @param item El objeto de la fila.
   */
  onRowClick(item: T): void {
    const selection = this.selection();
    if (!selection) return;
    selection.toggle(item);
    this.updateHeaderCheckboxState();
  }

  /**
   * Actualiza el estado del checkbox de la cabecera (on, off, intermediate).
   */
  private updateHeaderCheckboxState(): void {
    const selection = this.selection();
    if (!selection || !this.data() || this.data()!.length === 0) {
      this.headerCheckboxState = 'ui-toggle-unchecked';
      return;
    }

    // Contamos cuántos de los items de la página actual están seleccionados
    const numSelectedOnPage = this.data()!.filter(item => selection.isSelected(item)).length;
    const totalItemsOnPage = this.data()!.length;

    if (numSelectedOnPage === 0) {
      this.headerCheckboxState = 'ui-toggle-unchecked';
    } else if (numSelectedOnPage === totalItemsOnPage) {
      this.headerCheckboxState = 'ui-toggle-checked';
    } else {
      this.headerCheckboxState = 'ui-toggle-indeterminate';
    }
  }
}

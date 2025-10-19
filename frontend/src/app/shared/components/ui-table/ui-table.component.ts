// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-table\ui-table.component.ts | Last Modified: 2025-10-19

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionService } from '@shared/services/selection.service';
import { TableColumn } from './table.types';
import { Sort, SortDirection } from '@shared/types/sort.type';

@Component({
  selector: 'app-ui-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-table.component.html',
  styleUrls: ['./ui-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTableComponent<T extends { id: number | string }> {
  @Input({ alias: 'ui-table-data' }) data: T[] | null = [];
  @Input({ alias: 'ui-table-columns' }) columns: TableColumn<T>[] = [];
  @Input({ alias: 'ui-table-selection' }) selection: SelectionService<T> | null = null;
  @Input({ alias: 'ui-table-sort' }) sort: Sort<T> | null = null;
  @Input({ alias: 'ui-table-is-loading' }) isLoading = false;

  @Output('ui-table-sort-change') sortChange = new EventEmitter<Sort<T>>();

  // Permite al componente padre proyectar una plantilla para la columna de acciones
  @ContentChild('actions', { read: TemplateRef })
  actionsTemplate: TemplateRef<{ $implicit: T }> | null = null;

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
}

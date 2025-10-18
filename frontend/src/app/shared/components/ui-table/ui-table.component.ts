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
import { SelectionService } from '../../services/selection.service';
import { TableColumn, Sort } from '../../types/table.types';
import { SortDirection } from '../../types/sort.type';

@Component({
  selector: 'app-ui-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-table.component.html',
  styleUrls: ['./ui-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTableComponent<T extends { id: number }> {
  @Input() data: T[] | null = [];
  @Input() columns: TableColumn<T>[] = [];
  @Input() selection: SelectionService<T> | null = null;
  @Input() sort: Sort<T> | null = null;
  @Input() isLoading = false;

  @Output() sortChange = new EventEmitter<Sort<T>>();

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
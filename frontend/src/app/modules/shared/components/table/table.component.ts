// src/app/modules/shared/components/table/table.component.ts

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionService } from 'src/app/modules/shared/components/services/selection/selection.service';
import { TableColumn } from 'src/app/modules/shared/models/table-column.model';
import { ToggleCheckboxComponent, ToggleState } from '../toggle-checkbox/toggle-checkbox.component';
import { UiIconComponent } from '../ui-icon/ui-icon.component';
import { FlagIconComponent } from '../flag-icon/flag-icon.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [ CommonModule, ToggleCheckboxComponent, UiIconComponent, FlagIconComponent ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() items: any[] = [];
  @Input() selectable: boolean = true;
  @Input({ required: true }) selection!: SelectionService<any>;
  @Input() sortKey: string | null = null;
  @Input() sortOrder: 'asc' | 'desc' = 'asc';

  @Output() selectionChange = new EventEmitter<any[]>();
  @Output() sortChange = new EventEmitter<{ key: string, order: 'asc' | 'desc' }>();
  @Output() rowClick = new EventEmitter<any>();

  get generalToggleState(): ToggleState {
    if (!this.selection || !this.items?.length) return 'unchecked';
    if (this.selection.allSelected(this.items)) return 'checked';
    if (this.selection.someSelected(this.items)) return 'indeterminate';
    return 'unchecked';
  }

  rowToggleState(row: any): 'checked' | 'unchecked' {
    return this.isSelected(row) ? 'checked' : 'unchecked';
  }

  /** ✅ CORREGIDO: El tipo del argumento es ahora 'ToggleState' */
  onGeneralToggle(state: ToggleState) {
    if (!this.selection) return;
    if (state === 'checked') {
      this.selection.selectAll(this.items);
    } else {
      this.selection.clear();
    }
    this.selectionChange.emit(this.selection.selectedArray);
  }

  onRowToggle(row: any) {
    if (!this.selection) return;
    this.selection.toggle(row);
    this.selectionChange.emit(this.selection.selectedArray);
  }

  onRowClick(row: any, event: MouseEvent): void {
    this.rowClick.emit(row);
    if (!this.selectable || !this.selection) return;
    if ((event.target as HTMLElement).closest('app-toggle-checkbox')) {
      return;
    }
    this.selection.select(row, this.items, event);
    this.selectionChange.emit(this.selection.selectedArray);
  }

  isSelected(row: any): boolean {
    return this.selection?.isSelected(row.id) ?? false;
  }

  onSort(col: TableColumn): void {
    if (!col.sortable) return;
    let newOrder: 'asc' | 'desc' = (this.sortKey === col.key && this.sortOrder === 'asc') ? 'desc' : 'asc';
    this.sortChange.emit({ key: col.key, order: newOrder });
  }

  getNestedValue(item: any, key: string): any {
    return key.split('.').reduce((obj, k) => (obj && obj[k] !== undefined) ? obj[k] : undefined, item);
  }
}
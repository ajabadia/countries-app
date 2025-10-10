import { Component, Input, Output, EventEmitter } from '@angular/core';

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
  @Input() selectedItems: any[] = [];
  @Output() selectionChange = new EventEmitter();
  @Output() sortChange = new EventEmitter<{ key: string, order: 'asc' | 'desc' }>();

  sortKey: string | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';

  getColStyle(col: Partial<TableColumn>): {[key: string]: string} {
    const style: {[key: string]: string} = {};
    if (col.width) style['width'] = col.width;
    if (col.minWidth) style['min-width'] = col.minWidth;
    if (col.maxWidth) style['max-width'] = col.maxWidth;
    return style;
  }

  isSelected(item: any): boolean {
    return this.selectedItems.includes(item);
  }

  isAllSelected(): boolean {
    return this.items.length > 0 && this.items.every(item => this.selectedItems.includes(item));
  }

  toggleAll(checked: boolean): void {
    if (checked) {
      this.selectedItems = [...this.items];
    } else {
      this.selectedItems = [];
    }
    this.selectionChange.emit(this.selectedItems);
  }

  onToggleCheckbox(item: any, checked: boolean): void {
    if (checked) {
      if (!this.selectedItems.includes(item)) {
        this.selectedItems.push(item);
      }
    } else {
      this.selectedItems = this.selectedItems.filter(i => i !== item);
    }
    this.selectionChange.emit(this.selectedItems);
  }

  onSortChange(col: TableColumn): void {
    if (!col.sortable) return;
    if (this.sortKey !== col.key) {
      this.sortKey = col.key;
      this.sortOrder = 'asc';
    } else {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    }
    this.sortChange.emit({ key: this.sortKey!, order: this.sortOrder });
  }
}

// src/app/modules/shared/components/paginator/paginator.component.ts

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnChanges {
  @Input() page: number = 1;
  @Input() totalPages: number = 1;
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;
  @Input() pageSizeOptions: number[] = [10, 25, 50, 100];

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  public gotoPage: number = 1;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['page']) {
      this.gotoPage = this.page;
    }
  }

  get startIdx(): number {
    return this.totalItems > 0 ? (this.page - 1) * this.pageSize + 1 : 0;
  }
  get endIdx(): number {
    return Math.min(this.page * this.pageSize, this.totalItems);
  }

  /** ✅ CORREGIDO: Método setPage restaurado */
  setPage(newPage: number): void {
    const newValidPage = Math.max(1, Math.min(newPage, this.totalPages));
    if (this.page !== newValidPage) {
      this.pageChange.emit(newValidPage);
    }
  }

  /** ✅ CORREGIDO: Método onPageSizeChange restaurado */
  onPageSizeChange(event: Event): void {
    const newSize = Number((event.target as HTMLSelectElement).value);
    this.pageSizeChange.emit(newSize);
  }

  /** ✅ CORREGIDO: Método onGotoPage restaurado */
  onGotoPage(): void {
    this.setPage(this.gotoPage);
  }
}
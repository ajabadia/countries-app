// src/app/modules/shared/components/paginator/paginator.component.ts

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageChangeEvent } from './paginator.model';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnChanges {
  @Input() currentPage: number = 1;
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;
  @Input() pageSizeOptions: number[] = [10, 25, 50, 100];

  // ✅ MEJORA: Un solo evento para todos los cambios de paginación.
  @Output() pageChange = new EventEmitter<PageChangeEvent>();

  public gotoPage: number = 1;
  public totalPages: number = 0; // ✅ MEJORA: El componente lo calcula solo.

  ngOnChanges(changes: SimpleChanges): void {
    // Mantenemos sincronizado el input de "ir a" con la página actual.
    if (changes['currentPage']) {
      this.gotoPage = this.currentPage;
    }
    this.recalculateTotalPages();
  }

  get startIdx(): number {
    return this.totalItems > 0 ? (this.currentPage - 1) * this.pageSize + 1 : 0;
  }
  get endIdx(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }

  goToPage(newPage: number): void {
    const newValidPage = Math.max(1, Math.min(newPage, this.totalPages));
    if (this.currentPage !== newValidPage) {
      this.emitPageChange(newValidPage, this.pageSize);
    }
  }

  onPageSizeChange(newSize: number): void {
    // Al cambiar el tamaño, volvemos a la primera página para evitar inconsistencias.
    this.emitPageChange(1, newSize);
  }

  onGotoPage(): void {
    this.goToPage(this.gotoPage);
  }

  private emitPageChange(page: number, pageSize: number): void {
    this.pageChange.emit({ page, pageSize });
  }

  private recalculateTotalPages(): void {
    this.totalPages = this.totalItems > 0 ? Math.ceil(this.totalItems / this.pageSize) : 0;
  }
}
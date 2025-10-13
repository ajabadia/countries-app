import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

/**
 * Paginador reutilizable para la interfaz de países.
 */
@Component({
  selector: 'country-paginator',
  templateUrl: './country-paginator.component.html',
  styleUrls: []
})
export class CountryPaginatorComponent implements OnChanges {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Input() maxPages = 5;
  @Output() pageChange = new EventEmitter<number>();

  visiblePages: (number | string)[] = [];

  /** Recalcula la paginación cuando cambian los inputs */
  ngOnChanges() {
    this.updateVisiblePages();
  }

  /** Cambia la página si es válida */
  goToPage(page: number) {
    if (page !== this.currentPage && typeof page === 'number' && page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }

  /** Comprueba si el valor es tipo número (para plantilla) */
  isNumber(val: any): boolean {
    return typeof val === 'number';
  }

  /** Calcula las páginas visibles y muestra elipsis donde corresponde */
  updateVisiblePages() {
    const pages: (number | string)[] = [];
    const total = this.totalPages;
    const current = this.currentPage;
    const max = this.maxPages;

    if (total <= max) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      const half = Math.floor(max / 2);
      let start = Math.max(1, current - half);
      let end = Math.min(total, current + half);

      if (start <= 1) {
        start = 1;
        end = max;
      } else if (end >= total) {
        start = total - max + 1;
        end = total;
      }

      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('…');
      }
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (end < total) {
        if (end < total - 1) pages.push('…');
        pages.push(total);
      }
    }
    this.visiblePages = pages;
  }
}

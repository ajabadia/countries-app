//paginator.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Componente genérico y reutilizable de paginación.
 * Úsalo en cualquier parte del proyecto para cualquier tipo de lista.
 * Todos los textos y props son agnósticos.
 */
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  /** Página actual */
  @Input() page: number = 1;
  /** Número total de páginas */
  @Input() totalPages: number = 1;
  /** Total de elementos paginables */
  @Input() totalItems: number = 0;
  /** Número de elementos por página */
  @Input() pageSize: number = 10;
  /** Opciones seleccionables para el tamaño de página */
  @Input() pageSizeOptions: number[] = [10, 25, 50, 100];

  /** Evento: se dispara cuando cambia la página */
  @Output() pageChange = new EventEmitter<number>();
  /** Evento: se dispara cuando cambia el tamaño de página */
  @Output() pageSizeChange = new EventEmitter<number>();

  /** Controla el input de "ir a página" */
  gotoPage: number = 1;

  /** Devuelve el índice de inicio del rango actual */
  get startIdx(): number {
    return ((this.page - 1) * this.pageSize) + 1;
  }

  /** Devuelve el índice de fin del rango actual */
  get endIdx(): number {
    return Math.min(this.page * this.pageSize, this.totalItems);
  }

  /**
   * Cambia la página, validando límites.
   */
  setPage(newPage: number) {
    if (newPage < 1) newPage = 1;
    if (newPage > this.totalPages) newPage = this.totalPages;
    if (this.page !== newPage) {
      this.page = newPage;
      this.pageChange.emit(this.page);
      this.gotoPage = newPage;
    }
  }

  /**
   * Procesa el input de "ir a página" que recibe el evento, convirtiendo a número.
   * Así evitas el error TS2339 por intentar usar Number en el template.
   */
  onGotoPageChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.setPage(Number(value));
  }

  /**
   * Cambia el tamaño de página; reinicia a la primera página.
   */
  onPageSizeChange(event: Event) {
    const newSize = Number((event.target as HTMLSelectElement).value);
    this.pageSizeChange.emit(newSize);
    this.page = 1; // Opcional: resetear a la primera página al cambiar tamaño
    this.pageChange.emit(this.page);
  }
}


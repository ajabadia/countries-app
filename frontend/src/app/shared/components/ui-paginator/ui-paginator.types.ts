// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-paginator\ui-paginator.types.ts | Last Modified: 2025-10-19

/**
 * Evento emitido cuando la página o el tamaño de página cambian.
 */
export interface PaginatorChangeEvent {
  page: number;
  pageSize: number;
}

/**
 * Opciones por defecto para el selector de tamaño de página.
 */
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];
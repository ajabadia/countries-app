export interface PageChangeEvent {
  page: number;
  pageSize: number;
}

// Opcional: Define las opciones de tamaño de página para que sean consistentes.
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];
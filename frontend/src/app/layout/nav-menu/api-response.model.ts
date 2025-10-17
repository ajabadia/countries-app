// src/app/services/api-response.model.ts

export interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface ApiResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
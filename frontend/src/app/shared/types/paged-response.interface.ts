// File: d:\desarrollos\countries2\frontend\src\app\shared\types\paged-response.interface.ts | Last Modified: 2025-10-19

export interface PagedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
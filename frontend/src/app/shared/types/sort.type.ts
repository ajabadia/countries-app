// File: d:\desarrollos\countries2\frontend\src\app\shared\types\sort.type.ts | Last Modified: 2025-10-19

export type SortDirection = 'asc' | 'desc';

export interface Sort<T> {
  orderBy: keyof T | string;
  orderDir: SortDirection;
}
export type SortDirection = 'asc' | 'desc';

export interface Sort<T> {
  orderBy: keyof T | string;
  orderDir: SortDirection;
}

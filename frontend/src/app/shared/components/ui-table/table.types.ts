import { SortDirection } from '@shared/types/sort.type';

export interface TableColumn<T> {
  key: keyof T | string; // 'string' para poder acceder a propiedades anidadas si fuera necesario
  label: string;
  sortable?: boolean;
}

export interface Sort<T> {
  orderBy: keyof T;
  orderDir: SortDirection;
}
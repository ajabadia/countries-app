// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-table\table.types.ts | Last Modified: 2025-10-19

export interface TableColumn<T> {
  key: keyof T | string; // 'string' para poder acceder a propiedades anidadas si fuera necesario
  label: string;
  sortable?: boolean;
}

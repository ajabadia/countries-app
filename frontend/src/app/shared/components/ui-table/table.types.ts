// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-table\table.types.ts | Last Modified: 2025-10-19

/**
 * Define la estructura de una columna para el componente UiTable.
 * @template T El tipo de dato de la fila.
 */
export interface TableColumn<T> {
  key: keyof T | string; // 'string' para poder acceder a propiedades anidadas si fuera necesario
  label: string;
  sortable?: boolean;
  type?: 'text' | 'date' | 'number'; // El tipo de dato, para aplicar formatos especiales.
  cssClass?: string; // Clases CSS adicionales para la celda o cabecera.
}

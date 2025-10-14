// src/app/modules/shared/models/table-column.model.ts

export interface TableColumn {
  key: string;          // La clave para acceder al dato en el objeto (ej: 'name' o 'country.name').
  label: string;        // El texto a mostrar en la cabecera.
  sortable?: boolean;   // Si la columna es ordenable.
  width?: string;       // Ancho fijo (ej: '150px').
  minWidth?: string;    // Ancho mínimo (ej: '100px').
  
  /**
   * MEJORA CLAVE: Define cómo se debe renderizar el contenido de la celda.
   * Esto hace la tabla increíblemente flexible. En lugar de solo texto,
   * podemos especificar 'flag' para renderizar un componente de bandera,
   * 'date' para formatear una fecha, etc.
   * Reemplaza a la antigua propiedad 'isFlag'.
   */
  cellType?: 'text' | 'flag' | 'date' | string;

  /**
   * MEJORA: Para celdas de tipo 'date', permite especificar un formato.
   * (ej: 'dd/MM/yyyy HH:mm'). Si no se provee, usará un formato por defecto.
   */
  dateFormat?: string;
}
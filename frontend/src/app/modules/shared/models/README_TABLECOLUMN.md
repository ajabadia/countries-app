# TableColumn model

> Fecha de definición: 2025-10-10 17:16 CEST

La interfaz **TableColumn** define la estructura de las columnas utilizadas en componentes de tipo tabla dentro del proyecto (principalmente el componente TableComponent). Esta interfaz permite tipar explícitamente la configuración de columnas, aportando flexibilidad y capacidad de personalización a las tablas reutilizables.

---

## Estructura

```typescript
export interface TableColumn {
    key: string;               // Clave/propiedad del objeto a mostrar en la celda
    label: string;             // Encabezado que se muestra en la tabla
    sortable?: boolean;        // Si permite ordenar por esta columna
    isFlag?: boolean;          // Si la columna renderiza banderas tipo FlagIconComponent
    flagArray?: boolean;       // Si es una columna de varias banderas
    width?: string;            // Anchura CSS de la columna
    minWidth?: string;         // Anchura mínima
    maxWidth?: string;         // Anchura máxima
    sticky?: 'left' | 'right'; // Fijar columna a la izquierda/derecha
}
```

---

## Propósito

- Permite que cada tabla defina su estructura de columnas de forma tipada y coherente.
- Facilita la configuración visual (anchos, sticky) y lógica (sortable, banderas) de las columnas.
- Hace que TableComponent sea desacoplable y versátil para cualquier tipo de entidad/listado.

---

## Ejemplo de uso

```typescript
const columns: TableColumn[] = [
  { key: 'alpha2may', label: 'Alpha-2', sortable: true, width: '85px', sticky: 'right' },
  { key: 'defaultname', label: 'Nombre', sortable: true, minWidth: '180px' },
  { key: 'flags', label: 'Banderas', isFlag: true, flagArray: true, width: '120px' }
];
```

Y en TableComponent:
```html
<app-table [columns]="columns" [items]="countries"></app-table>
```

---

## Notas

- Se recomienda mantener sincronizadas las claves `key` con las propiedades del array de items.
- Las flags (`isFlag` y `flagArray`) permiten renderizar componentes de bandera personalizados.
- El sticky y los anchos ayudan a UX/UI y tablas con muchas columnas horizontales.


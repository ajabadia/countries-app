<!-- File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-table\README.md | Last Modified: 2025-10-19 -->

# UI Table Component (`<app-ui-table>`)

Componente genérico y reutilizable para mostrar datos en una tabla. Está diseñado para ser altamente configurable y desacoplado de la lógica de negocio.

## Características

-   **Genérico**: Funciona con cualquier tipo de dato, siempre que el objeto tenga una propiedad `id`.
-   **Configurable**: Las columnas se definen mediante un array de configuración `TableColumn<T>`.
-   **Ordenación (Sorting)**: Gestiona la lógica de ordenación a través de un input `sort` y emite eventos `sortChange`.
-   **Selección**: Se integra con un `SelectionService` para gestionar la selección de filas.
-   **Proyección de Contenido para Acciones**: Permite al componente padre inyectar una plantilla (`<ng-template>`) para renderizar una columna de acciones personalizadas (ej. botones de editar/borrar).
-   **API Prefijada**: Todos sus inputs y outputs siguen la convención `ui-table-*`.

## Cómo Usarlo

El componente requiere una definición de columnas y un array de datos. Opcionalmente, se le puede pasar un servicio de selección y el estado de ordenación.

**En tu componente `.ts`:**
```typescript
import { Component } from '@angular/core';
import { TableColumn } from '@shared/components/ui-table/table.types';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  // ...
})
export class MyComponent {
  // Datos a mostrar
  users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User' },
  ];

  // Definición de las columnas
  columns: TableColumn<User>[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Nombre', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Rol', sortable: true },
  ];

  // Lógica para manejar la ordenación
  onSort(sort: Sort<User>) {
    // ... tu lógica para recargar los datos ordenados
  }
}
```

**En tu plantilla `.html`:**
```html
<app-ui-table
  [ui-table-data]="users"
  [ui-table-columns]="columns"
  [ui-table-is-loading]="isLoading"
  (ui-table-sort-change)="onSort($event)"
>
  <!--
    Proyección de la columna de acciones.
    La tabla iterará y nos dará cada 'item' en el contexto del template.
  -->
  <ng-template #actions let-item>
    <button app-ui-button ui-icon-name="icon-edit" ui-icon-position="only"></button>
    <button app-ui-button ui-icon-name="icon-trash" ui-icon-position="only" ui-button-color="danger"></button>
  </ng-template>
</app-ui-table>
```

## API

### Inputs

| Input                  | Tipo                      | Por Defecto | Descripción                                                                 |
| ---------------------- | ------------------------- | ----------- | --------------------------------------------------------------------------- |
| `ui-table-data`        | `T[] \| null`            | `[]`        | El array de objetos a mostrar en la tabla.                                  |
| `ui-table-columns`     | `TableColumn<T>[]`        | `[]`        | La configuración de las columnas a renderizar.                              |
| `ui-table-selection`   | `SelectionService<T> \| null` | `null`      | Una instancia del servicio de selección para manejar las casillas de verificación. |
| `ui-table-sort`        | `Sort<T> \| null`        | `null`      | El estado actual de la ordenación (campo y dirección).                      |
| `ui-table-is-loading`  | `boolean`                 | `false`     | Si es `true`, muestra un indicador de carga en la tabla.                    |

### Outputs

| Output                 | Emite      | Descripción                                                                 |
| ---------------------- | ---------- | --------------------------------------------------------------------------- |
| `ui-table-sort-change` | `Sort<T>`  | Se emite cuando el usuario hace clic en una columna ordenable.              |

### Interface `TableColumn<T>`

Define cómo se debe renderizar cada columna.

| Propiedad  | Tipo                   | Requerido | Descripción                                                                 |
| ---------- | ---------------------- | --------- | --------------------------------------------------------------------------- |
| `key`      | `keyof T \| string`   | Sí        | La clave del objeto de datos cuyo valor se mostrará en la celda.            |
| `label`    | `string`               | Sí        | El texto a mostrar en la cabecera de la columna.                            |
| `sortable` | `boolean`              | No        | Si la columna es ordenable.                                                 |

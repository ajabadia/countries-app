# TableComponent

> Fecha de definición: 2025-10-10 17:22 CEST

El componente **TableComponent** es una tabla flexible que soporta selección múltiple, ordenación, paginación y accesibilidad con teclado. Se apoya en el modelo TableColumn y en el servicio SelectionService para gestionar la interacción y el estado de filas.

---

## Principales inputs y outputs

- `@Input() columns: TableColumn[]` — Definición y configuración de columnas.
- `@Input() items: any[]` — Datos a mostrar (debe tener campo id único).
- `@Input() selectable: boolean` — Activa selección por clic/teclado.
- `@Input() selection: SelectionService` — Servicio compartido gestionando la selección.

- `@Output() selectionChange` — Emite array de seleccionados tras cualquier cambio.
- `@Output() sortChange` — Emite clave y orden cuando cambia la ordenación.

---

## Principales métodos y getters

- `generalToggleState` — Devuelve estado global de la selección (checked, unchecked, indeterminate).
- `onGeneralToggle(state)` — Selecciona/deselecciona todo.
- `rowToggleState(row)` — Estado checked/unchecked de una fila.
- `onRowToggle(row, state)` — Selecciona/deselecciona una fila desde toggle.
- `getColStyle(col: TableColumn)` — Devuelve estilos CSS dinámicos para cada columna (width, sticky, min/max-width).
- `isSelected(item)` — ¿Está seleccionado?
- `isFocused(index)` — ¿Está con foco de teclado?
- `onRowClick(row, event)` — Selecciona/deselecciona una fila con mouse o teclado.
- `onSort(col)` — Maneja el cambio de ordenación por columna.
- `onTableKeyDown(event)` — Soporta navegación accesible: flechas, espacio, Ctrl+A, Shift (delegado en SelectionService).

---

## Ejemplo de uso


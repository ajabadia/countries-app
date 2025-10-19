<!-- File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-toggle-checkbox\README.md | Last Modified: 2025-10-19 -->

# UI Toggle Checkbox Component (`<app-ui-toggle-checkbox>`)

Componente para renderizar un checkbox con tres estados (`checked`, `unchecked`, `indeterminate`), ideal para la cabecera de tablas o para cualquier escenario de selección múltiple.

## Características

-   **Tres Estados**: Soporta los estados `checked`, `unchecked`, y `indeterminate` para representar selecciones completas, vacías o parciales.
-   **Basado en Iconos**: Utiliza `app-ui-icon` para un renderizado visual consistente con el resto de la aplicación, mostrando los iconos `icon-check-square`, `icon-minus-square`, o `icon-square` según el estado.
-   **API Prefijada**: Sigue las directrices del proyecto con el input `[ui-toggle-state]` y el output `(ui-toggle-state-change)`.
-   **Accesibilidad**: Totalmente accesible vía teclado (Enter/Espacio) y para lectores de pantalla (`role="checkbox"`, `aria-checked`).
-   **Lógica de Usuario Clara**: Un clic del usuario solo alterna entre `checked` y `unchecked`. El estado `indeterminate` es puramente visual y solo se puede establecer a través del `Input`.

## Cómo Usarlo

El componente emite su nuevo estado cada vez que el usuario interactúa con él.

**En tu plantilla `.html`:**
```html
<!-- Checkbox para la cabecera de una tabla que refleja una selección parcial -->
<app-ui-toggle-checkbox
  [ui-toggle-state]="selectionState"
  (ui-toggle-state-change)="onToggleAllRows($event)"
></app-ui-toggle-checkbox>

<!-- Checkbox para una fila individual -->
<app-ui-toggle-checkbox
  [ui-toggle-state]="isRowSelected ? 'checked' : 'unchecked'"
  (ui-toggle-state-change)="onToggleRow()"
></app-ui-toggle-checkbox>
```

**En tu componente `.ts`:**
```typescript
// Lógica para el toggle de la cabecera
onToggleAllRows(newState: ToggleState) {
  // ... si el nuevo estado es 'checked', seleccionar todo
}

// Lógica para el toggle de una fila
onToggleRow() {
  // ... seleccionar/deseleccionar la fila
}
```

## API

### Inputs

| Input             | Tipo          | Por Defecto   | Descripción                                                                 |
| ----------------- | ------------- | ------------- | --------------------------------------------------------------------------- |
| `ui-toggle-state` | `ToggleState` | `'unchecked'` | El estado actual del checkbox: `'checked'`, `'unchecked'`, o `'indeterminate'`. |

### Outputs

| Output                   | Emite         | Descripción                                                                 |
| ------------------------ | ------------- | --------------------------------------------------------------------------- |
| `ui-toggle-state-change` | `ToggleState` | Emite el nuevo estado (`'checked'` o `'unchecked'`) tras la interacción del usuario. |

### Tipos

```typescript
export type ToggleState = 'checked' | 'unchecked' | 'indeterminate';
```

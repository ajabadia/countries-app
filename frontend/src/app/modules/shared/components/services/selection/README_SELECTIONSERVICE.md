# SelectionService

> Fecha de definición: 2025-10-10 17:17 CEST

El servicio **SelectionService** provee lógica para la gestión de selección de filas/items en cualquier componente tipo listado/tabla, facilitando tanto selección individual como múltiple (tipo rango o toggle), y navegación por teclado.

---

## Principales métodos y propiedades

- `selected: T[]` — Array de objetos seleccionados.
- `lastIndex: number | null` — Último índice seleccionado (para rangos tipo shift).
- `focusedIndex: number` — Índice actual enfocado (navegación y selección vía teclado).

### Métodos
- `select(row: T, list: T[], event?)` — Selecciona/deselecciona una fila. Soporta área por Shift y toggle individual.
- `clear()` — Limpia toda la selección.
- `selectAll(list: T[])` — Selecciona todos los elementos del listado.
- `moveFocus(list: T[], step: number)` — Cambia el foco dentro de la lista.
- `isSelected(id: string)` — Devuelve si un item está seleccionado.
- `keyboardHandler(event: KeyboardEvent, list: T[])` — Navega y selecciona vía teclado (flechas, barra espaciadora, Ctrl+A).

### Getters
- `allSelected(list: T[])` — ¿Todos? (devuelve true si todos seleccionados)
- `someSelected(list: T[])` — ¿Algunos? (más de uno, menos que todos)
- `anySelected` — ¿Hay alguno seleccionado?

---

## Uso típico

En cualquier componente tabla/listado:

```typescript
constructor(public selection: SelectionService) {}

// En plantilla:
<tr *ngFor="let row of items; let idx = index"
    [class.selected]="selection.isSelected(row.id)"
    (click)="selection.select(row, items, $event)"
    (keydown)="selection.keyboardHandler($event, items)">
  ...
</tr>
```

Botón de seleccionar todo:
```html
<button (click)="selection.selectAll(items)">Seleccionar todo</button>
```

---

## Características clave
- Permite trabajar tanto con mouse como teclado.
- Soporta selección por rangos (Shift) y toggle individual.
- Pensado para ser inyectado como servicio singleton (providedIn: 'root').
- Resulta muy útil cuando hay UI reactiva, accesibilidad y tablas extensas con selección múltiple.

---

## Notas
- Los ítems del listado deben tener campo `id: string` único.
- El servicio puede extenderse para gestionar selección cruzada de múltiples listados, si se quisiera.
- Ideal para usar junto a TableComponent y cualquier otro UI de listado complejo.

--------------------


# SelectionService

> Fecha de definición: 2025-10-10 17:33 CEST

El servicio **SelectionService** gestiona la selección múltiple y el enfoque de filas en listados/tablas, proporcionando métodos utilitarios para seleccionar rango, alternar, seleccionar todo, limpiar selección y navegar con el teclado.

---

## Propiedades principales

- `selected: T[]` — Lista de elementos actualmente seleccionados.
- `lastIndex: number | null` — Último índice alterado (para rangos).
- `focusedIndex: number` — Índice actual con foco.

---

## Métodos principales

- `select(row, list, event)` — Selecciona/des-selecciona un elemento; soporta Shift para rango y evento para teclas controladas.
- `clear()` — Limpia toda la selección.
- `selectAll(list)` — Selecciona todos los elementos del listado.
- `moveFocus(list, step)` — Desplaza el foco en la lista (+1/-1).
- `isSelected(id)` — Comprueba si el id está en selección.

- `allSelected(list)` — ¿Todos seleccionados?
- `someSelected(list)` — ¿Indeterminado/rango seleccionado?
- `anySelected()` — ¿Al menos uno seleccionado?

- `keyboardHandler(event, list)` — Gestiona flechas, espacio, Ctrl+A/Meta+A para accesibilidad/pleno control de selección.

---

## Ejemplo de uso

constructor(public selectionService: SelectionService) {}

ngOnInit() {
// Selección directa
this.selectionService.select(item, list);
// Para limpiar selección
this.selectionService.clear();
// Para selección total con Ctrl+A:
window.addEventListener('keydown', e => this.selectionService.keyboardHandler(e, list));
}

text

---

## Características claves

- Permite seleccionar por clic, rango (Shift), teclas rápidas (Ctrl+A), y navega con flechas.
- Sincroniza el estado con TableComponent y adaptable a cualquier listado genérico.
- Indispensable para tablas administrativas y formularios de selección masiva.

---

## Notas de implementación

- `@Injectable({ providedIn: 'root' })` permite singleton global para compartir la selección en todo el proyecto.
- Métodos preparados para integración fácil con componentes, especialmente TableComponent y Toggle.
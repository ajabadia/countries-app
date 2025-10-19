<!-- File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-search-box\README.md | Last Modified: 2025-10-19 -->

# Componente: `ui-search-box`

El `UiSearchBoxComponent` es un componente de búsqueda reutilizable que proporciona una caja de texto con un icono, un botón para limpiar el contenido y una lógica de "debounce" para optimizar el rendimiento.

## 1. Propósito y Funcionamiento

-   **Componente Controlado**: Funciona como un componente controlado, recibiendo su valor a través de un `@Input` y notificando los cambios a través de un `@Output`.
-   **Debounce**: Implementa una lógica de `debounce` utilizando RxJS. Esto significa que el evento `uiSearchBoxValueChange` solo se emite después de que el usuario ha dejado de escribir durante un período de tiempo configurable, evitando un exceso de eventos o llamadas a la API.
-   **API Prefijada**: Sigue las directrices del proyecto, utilizando prefijos en su API pública para evitar colisiones y mejorar la claridad.

## 2. API del Componente

### Entradas (`@Input`)

-   `uiSearchBoxValue: string` (opcional, por defecto `''`): El valor actual de la caja de búsqueda. Se puede usar con two-way binding `[(uiSearchBoxValue)]`.
-   `uiSearchBoxPlaceholder: string` (opcional, por defecto `'Buscar...'`): El texto que se muestra cuando el input está vacío.
-   `uiSearchBoxDebounceMs: number` (opcional, por defecto `300`): El tiempo en milisegundos que se espera después de la última pulsación de tecla antes de emitir el evento de cambio.

### Salidas (`@Output`)

-   `uiSearchBoxValueChange: string`: Se emite con el nuevo valor de búsqueda después de que se haya cumplido el tiempo de `debounce`.

## 3. Dependencias

-   `@shared/components/ui-button`: Utilizado para el botón de limpiar.
-   `@shared/components/ui-icon`: Para mostrar el icono de búsqueda y el de limpiar.

## 4. Uso Básico

El componente se puede integrar fácilmente en cualquier componente "padre" que necesite una funcionalidad de búsqueda.

```html
<!-- En tu-componente.component.html -->

<app-ui-search-box
  [(uiSearchBoxValue)]="searchTerm"
  [uiSearchBoxPlaceholder]="'Buscar por nombre de país...'"
></app-ui-search-box>
```

```typescript
// En tu-componente.component.ts

searchTerm = signal('');

constructor() {
  // Reacciona a los cambios en el término de búsqueda
  effect(() => {
    console.log('Nuevo término de búsqueda:', this.searchTerm());
    // Aquí iría la lógica para filtrar datos o llamar a una API
  });
}
```
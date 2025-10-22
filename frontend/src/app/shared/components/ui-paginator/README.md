<!-- File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-paginator\README.md | Last Modified: 2025-10-19 -->

# Componente: `ui-paginator`

El `UiPaginatorComponent` es un componente reutilizable para la navegación a través de conjuntos de datos paginados. Proporciona una interfaz de usuario estándar para cambiar de página, ir a una página específica y ajustar el número de registros por página.

## 1. Propósito y Funcionamiento

-   **Sincronización Inicial**: El componente emite su estado inicial (`page` y `pageSize`) en el ciclo de vida `ngOnInit`, asegurando que el componente padre esté sincronizado desde el principio.
-   **Componente "Tonto"**: El paginador no realiza ninguna llamada a la API. Su única responsabilidad es mostrar el estado de paginación actual y emitir eventos cuando el usuario interactúa con él.
-   **Basado en Signals**: Utiliza `signals` de Angular para una gestión de estado moderna y reactiva.
-   **API Clara**: Expone una API sencilla a través de `@Input`s prefijados y un único `@Output` para todos los cambios.

## 2. API del Componente

### Entradas (`@Input`)

-   `uiPaginatorTotalRecords: number` **(requerido)**: El número total de registros en el conjunto de datos.
-   `uiPaginatorPage: number` (opcional, por defecto `1`): La página actual que se está mostrando.
-   `uiPaginatorPageSize: number` (opcional, por defecto `10`): El número de registros por página.
-   `uiPaginatorPageSizeOptions: number[]` (opcional, por defecto `[10, 25, 50, 100]`): Las opciones a mostrar en el selector de tamaño de página.

### Salidas (`@Output`)

-   `uiPaginatorPageChange: number`: Se emite con el nuevo número de página cuando el usuario cambia de página.
-   `uiPaginatorPageSizeChange: number`: Se emite con el nuevo tamaño de página cuando el usuario lo cambia en el selector.

## 3. Dependencias

-   `@shared/components/ui-button`: Utilizado para los botones de navegación.
-   `@shared/components/ui-icon`: Para los iconos de los botones.

## 4. Uso Básico

El componente se integra en un componente "padre" que gestiona la lógica de obtención de datos.

```html
<!-- En tu-componente.component.html -->

<!-- ... tu tabla o lista de datos ... -->

<app-ui-paginator
  [uiPaginatorTotalRecords]="totalRecords()"
  [uiPaginatorPage]="currentPage()"
  [uiPaginatorPageSize]="pageSize()"
  (uiPaginatorPageChange)="onPageChange($event)"
  (uiPaginatorPageSizeChange)="onPageSizeChange($event)"
></app-ui-paginator>
```

```typescript
// En tu-componente.component.ts

onPageChange(event: PaginatorChangeEvent) {
  // Aquí actualizas tus signals de página y tamaño de página,
  // lo que provocará que se vuelvan a cargar los datos.
  this.currentPage.set(event.page);
  this.pageSize.set(event.pageSize);
}
```
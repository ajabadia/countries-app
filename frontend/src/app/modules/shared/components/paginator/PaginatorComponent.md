# PaginatorComponent

> Fecha de definición: 2025-10-10 17:36 CEST

El componente **PaginatorComponent** proporciona controles de paginación accesibles y reutilizables para navegar listados/componentes con muchas páginas.

---

## Inputs y outputs principales

- `@Input() page: number` — Página actual mostrada (comienza en 1).
- `@Input() totalPages: number` — Total de páginas disponibles.
- `@Output() pageChange` — Evento emitido al cambiar la página activa.

---

## Método fundamental

- `setPage(newPage: number)` — Cambia a una nueva página válida. No permite avanzar fuera de los límites ni repetir página.

---

## Ejemplo de uso

<app-paginator [page]="currentPage" [totalPages]="maxPages" (pageChange)="onPageChange($event)">
</app-paginator>

text

---

## Estructura básica de HTML sugerida (`paginator.component.html`)

<nav aria-label="Paginación"> <ul class="pagination"> <li> <button (click)="setPage(page - 1)" [disabled]="page === 1" aria-label="Anterior"> &laquo; </button> </li> <li *ngFor="let n of [].constructor(totalPages); let i = index"> <button (click)="setPage(i + 1)" [class.active]="page === i + 1"> {{ i + 1 }} </button> </li> <li> <button (click)="setPage(page + 1)" [disabled]="page === totalPages" aria-label="Siguiente"> &raquo; </button> </li> </ul> </nav> ```
Características clave
Cambia de página solo si es distinto y válido.

Llama a (pageChange) para notificar al componente superior.

Accesible mediante etiquetas ARIA.

Rápido de integrar en tablas/admins/listados extensos.

Notas
Añadir clases/scss para estilos visuales según el diseño del proyecto.

Mantiene la lógica mínima en el TypeScript y sólo emite cambios reales.
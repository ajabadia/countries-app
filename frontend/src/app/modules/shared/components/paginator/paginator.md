# PaginatorComponent

Componente Angular reutilizable para paginación avanzada de listas/tablas con enfoque BEM, UX y accesibilidad.

## Características

- Selección de página (con botones primero, anterior, siguiente, último)
- Salto directo a una página introduciendo número
- Selección de tamaño de página: 10, 25, 50, 100
- Muestra el rango real ("Mostrando ... de ...")
- Accesibilidad: roles, aria-labels, tabulable y teclado
- BEM CSS

---

## Uso

### HTML

<nav class="paginator" aria-label="Paginación de tabla"> <div class="paginator__block"> <button class="paginator__button" (click)="setPage(1)" [disabled]="page === 1" aria-label="Primera página">«</button> <button class="paginator__button" (click)="setPage(page - 1)" [disabled]="page === 1" aria-label="Página anterior">‹</button> <span class="paginator__info"> Página <b>{{page}}</b> de <b>{{totalPages}}</b> </span> <button class="paginator__button" (click)="setPage(page + 1)" [disabled]="page === totalPages" aria-label="Página siguiente">›</button> <button class="paginator__button" (click)="setPage(totalPages)" [disabled]="page === totalPages" aria-label="Última página">»</button> </div> <div class="paginator__block"> <label class="paginator__label" for="pageSize">Mostrar</label> <select id="pageSize" class="paginator__select" [(ngModel)]="pageSize" (change)="onPageSizeChange($event)"> <option *ngFor="let size of pageSizeOptions" [value]="size">{{size}}</option> </select> <span class="paginator__label">por página</span>
text
<label class="paginator__label" for="gotoPage">Ir a página:</label>
<input
  id="gotoPage"
  class="paginator__input"
  type="number"
  min="1"
  [max]="totalPages"
  [(ngModel)]="gotoPage"
  (change)="setPage(gotoPage)"
/>
</div> <div class="paginator__summary"> Mostrando países del {{startIdx}} al {{endIdx}} de {{totalCountries}} </div> </nav> ```
Inputs/Outputs (TypeScript)
text
@Input() page: number = 1;
@Input() totalPages: number = 1;
@Input() totalCountries: number = 0;
@Input() pageSize: number = 10;
@Output() pageChange = new EventEmitter<number>();
@Output() pageSizeChange = new EventEmitter<number>();
SCSS (BEM)
text
.paginator { ... }
.paginator__button { ... }
.paginator__block { ... }
.paginator__info { ... }
.paginator__summary { ... }
// ver paginator.component.scss para estilos completos
Integración padre ejemplo
text
<app-paginator
  [page]="page"
  [totalPages]="totalPages"
  [totalCountries]="totalCountries"
  [pageSize]="pageSize"
  (pageChange)="onPageChange($event)"
  (pageSizeChange)="onPageSizeChange($event)">
</app-paginator>
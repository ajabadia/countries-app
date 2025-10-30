<!-- File: d:\desarrollos\countries2\frontend\src\app\shared\utils\README.md | Last Modified: 2025-10-22 -->

# Utilidad: AdminPageManager

`AdminPageManager` es una clase de utilidad "headless" (sin plantilla) diseñada para encapsular y gestionar toda la lógica de estado de una página de administración CRUD (Crear, Leer, Actualizar, Borrar).

## Propósito

Tras los problemas encontrados con la `BaseAdminDirective` (ver `LESSONS_LEARNED.md`), se optó por un patrón más simple y robusto. Esta clase extrae la lógica de gestión de datos (paginación, búsqueda, ordenación) que antes estaba duplicada en los componentes, pero sin las complejidades del ciclo de vida y la inyección de dependencias de una directiva.

El objetivo es que los componentes de administración (`ContinentsAdminComponent`, `CountriesAdminComponent`, etc.) sean lo más "tontos" posible, delegando todo el trabajo pesado a una instancia de `AdminPageManager`.

## Características

-   **Gestión de Estado con Signals**: Utiliza `signals` para gestionar el estado de la página (página actual, tamaño, término de búsqueda, orden).
-   **Flujo de Datos Reactivo**: Orquesta las llamadas a la API mediante un `stream` de `RxJS` (`combineLatest` + `switchMap`), asegurando eficiencia y cancelando peticiones obsoletas.
-   **API Pública Clara**: Expone `signals` (`data`, `totalRecords`, `isLoading`) y métodos (`onSortChange`, `onSearch`, `onPageStateChange`) para que la plantilla del componente anfitrión se conecte fácilmente.
-   **Instanciación Manual**: **No es un servicio inyectable global**. Se debe crear una nueva instancia (`new AdminPageManager()`) en el constructor de cada componente de administración, lo que garantiza un ciclo de vida controlado y sin conflictos.
-   **Refresco de Datos**: Incluye un método `refreshData()` para forzar la recarga de los datos manteniendo los filtros, ordenación y paginación actuales.

## Cómo Usarlo

1.  **En el componente (`.ts`):**

    ```typescript
    import { AdminPageManager } from '@app/shared/utils/admin-page-manager';
    import { MyEntityService } from './my-entity.service';
    import { MyEntity } from '@app/types/my-entity.types';

    @Component({...})
    export class MyEntityAdminComponent implements OnDestroy {
      manager: AdminPageManager<MyEntity>;

      constructor() {
        this.manager = new AdminPageManager<MyEntity>();
        this.manager.init({
          service: inject(MyEntityService),
          injector: inject(Injector),
          searchableFields: ['name', 'description'], // Opcional
        });
      }

      ngOnDestroy(): void {
        this.manager.ngOnDestroy();
      }
    }
    ```

2.  **En la plantilla (`.html`):**

    ```html
    <app-ui-search-box (uiSearchBoxValueChange)="manager.onSearch($event)" />

    <app-ui-table
      [ui-table-data]="manager.data()"
      [ui-table-is-loading]="manager.isLoading()"
      [ui-table-sort]="manager.sort()"
      (ui-table-sort-change)="manager.onSortChange($event)"
    >
    </app-ui-table>

    <app-ui-paginator
      [uiPaginatorTotalRecords]="manager.totalRecords()"
      [uiPaginatorPage]="manager.page()"
      [uiPaginatorPageSize]="manager.pageSize()"
      (uiPaginatorPageStateChange)="manager.onPageStateChange($event)"
    ></app-ui-paginator>
    ```

3.  **Refrescando los datos (desde el componente):**

    Después de una operación CRUD (crear, editar, borrar), simplemente llama al método `refreshData()` para actualizar la tabla.

    ```typescript
    // Dentro de la lógica de guardado/borrado del componente
    this.manager.refreshData();
    ```
<!-- File: d:\desarrollos\countries2\frontend\src\app\shared\directives\README.md | Last Modified: 2025-10-19 -->

# Directivas Compartidas

Este directorio contiene directivas reutilizables en toda la aplicación.

---

## BaseAdminDirective (`[appBaseAdmin]`)

Esta no es una directiva común. Es una clase base abstracta, implementada como una directiva, que encapsula toda la lógica repetitiva necesaria para una página de administración (CRUD).

Al usarla, un componente de administración (ej. `CountriesAdminComponent`) puede centrarse exclusivamente en su plantilla y en la definición de su formulario, delegando toda la gestión del estado (paginación, ordenación, búsqueda, selección, carga, guardado, borrado) y la configuración de acciones a esta directiva.

### Características

-   **Gestión de Estado con Signals**: Utiliza `signals` de Angular para una gestión de estado moderna y eficiente.
-   **Desacoplada de la UI**: No renderiza ninguna plantilla. Proporciona la lógica y el estado para que la plantilla del componente que la usa los consuma.
-   **Integración con `ActionService`**: Utiliza el `ActionService` para obtener las definiciones de las acciones (ej. botones del modal) y las asocia con la lógica de negocio correspondiente.
-   **Basada en Servicios Genéricos**: Depende de `BaseCrudService` para las operaciones de datos.

### Cómo Usarlo

Un componente que quiera gestionar una entidad (ej. `Country`) debe aplicar la directiva en su selector y, opcionalmente, inyectarla para acceder a su API pública.

**1. En tu componente `.ts`:**

```typescript
import { Component, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseAdminDirective } from '@shared/directives/base-admin.directive.ts';
import { Country } from '@core/types/country.interface';
import { CountriesService } from '@core/services/countries.service';

@Component({
  selector: 'app-countries-admin',
  hostDirectives: [BaseAdminDirective],
  templateUrl: './countries-admin.component.html',
})
export class CountriesAdminComponent {
  // Inyectamos la directiva para tener una referencia a su API pública en la plantilla
  public baseAdmin = inject(BaseAdminDirective<Country>);

  // 1. Implementamos las propiedades abstractas obligatorias
  service = inject(CountriesService);
  form = this.fb.group({
    name: ['', Validators.required],
    iso2: ['', [Validators.required, Validators.maxLength(2)]],
  });

  constructor() {
    // La directiva se encarga de casi todo
  }
}
```

**2. En tu plantilla `.html`:**

La plantilla del componente tiene acceso a toda la API pública de `BaseAdminDirective` a través de la variable `baseAdmin`.

```html
<!-- La plantilla bindea las propiedades de la directiva al componente de modal -->

<app-ui-form-modal
  [ui-form-modal-visible]="baseAdmin.isModalVisible()"
  (cancelClick)="baseAdmin.closeModal()"
  [ui-form-modal-buttons]="baseAdmin.modalButtons" 
  [ui-form-modal-title]="baseAdmin.editingItem() ? 'Editar País' : 'Crear País'"
>
  <!-- El formulario se proyecta aquí -->
  <form [formGroup]="baseAdmin.form">
    <!-- ... campos del formulario ... -->
  </form>
</app-ui-form-modal>

<!-- Aquí iría la tabla, etc., que también consumirían datos de `baseAdmin` -->
```

### API Pública

La directiva expone las siguientes propiedades y métodos públicos para ser usados en la plantilla del componente anfitrión.

#### Propiedades

| Propiedad               | Tipo                        | Descripción                                                              |
| ----------------------- | --------------------------- | ------------------------------------------------------------------------ |
| `data`                  | `Signal<T[]>`               | Un array con los datos de la página actual.                              |
| `totalRecords`          | `Signal<number>`            | El número total de registros en la base de datos.                        |
| `isLoading`             | `WritableSignal<boolean>`   | `true` mientras se está cargando una nueva página de datos.              |
| `selectionService`      | `SelectionService<T>`       | Instancia para gestionar la selección de filas.                          |
| `isModalVisible`        | `WritableSignal<boolean>`   | Controla la visibilidad del modal de creación/edición.                   |
| `isConfirmModalVisible` | `WritableSignal<boolean>`   | Controla la visibilidad del modal de confirmación de borrado.            |
| `isSaving`              | `WritableSignal<boolean>`   | `true` mientras se está ejecutando una operación de guardado.            |
| `isDeleting`            | `WritableSignal<boolean>`   | `true` mientras se está ejecutando una operación de borrado.             |
| `editingItem`           | `WritableSignal<T \| null>`   | El item que se está editando actualmente, o `null` si se está creando uno nuevo. |
| `modalButtons`          | `ToolbarButtonConfig[]`     | La configuración de botones para el pie de página del modal, generada a través de `ActionService`. |

#### Métodos

| Método                 | Parámetros              | Descripción                                                              |
| ---------------------- | ----------------------- | ------------------------------------------------------------------------ |
| `onPageChange`         | `page: number`          | Se llama para cambiar a una nueva página.                                |
| `onSortChange`         | `sort: Sort<T>`         | Se llama para cambiar el orden de los datos.                             |
| `onSearch`             | `searchTerm: string`    | Se llama para filtrar los datos según un término de búsqueda.           |
| `refreshData`          | `void`                  | Fuerza una recarga de los datos de la tabla.                             |
| `openModal`            | `item?: T \| null`      | Abre el modal de creación/edición. Si se pasa un item, lo carga en el formulario. |
| `closeModal`           | `void`                  | Cierra el modal de creación/edición.                                     |
| `openConfirmDeleteModal` | `item: T`               | Abre el modal de confirmación para borrar un item.                       |
| `closeConfirmDeleteModal`| `void`                  | Cierra el modal de confirmación de borrado.                              |
| `onSave`               | `void`                  | Valida y guarda los datos del formulario (crea o actualiza).             |
| `onDelete`             | `void`                  | Borra el item seleccionado para borrado.                                 |
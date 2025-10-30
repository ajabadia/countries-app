# Frontend Architecture - Visión General del Proyecto

Este documento sirve como una guía completa de la arquitectura, patrones y convenciones utilizadas en el frontend de la aplicación. Su objetivo es documentar los patrones clave para asegurar la consistencia, reutilización y calidad del código.

## 1. Stack Tecnológico Principal

-   **Framework:** Angular (Standalone Components)
-   **Gestión de Estado:** Angular Signals
-   **Componentes UI:** Componentes propios reutilizables (ej. `ui-table`, `ui-form-modal`).
-   **Estilos:** SCSS con una arquitectura de estilos centralizada.

## 2. Patrón de Páginas de Administración (CRUD)

Para evitar la duplicación masiva de código en las páginas de administración (Países, Idiomas, Usuarios, etc.), se ha implementado un patrón de arquitectura basado en tres pilares fundamentales:

1.  **`BaseAdminPageComponent<T>` (Clase Lógica Base)**
2.  **`UiAdminPageLayoutComponent<T>` (Componente de Layout Reutilizable)**
3.  **`AdminPageManager<T>` (Gestor de Estado y Lógica)**

### 2.1. `BaseAdminPageComponent<T>`

-   **Ubicación:** `src/app/shared/base-classes/base-admin-page.component.ts`
-   **Propósito:** Es una clase `abstracta` que contiene toda la lógica común para una página CRUD:
    -   Manejo de modales (crear, editar, confirmar borrado).
    -   Operaciones CRUD (`onSave`, `onConfirmDelete`, `onDeleteSelected`).
    -   Inicialización del formulario (`FormGroup`).
    -   Gestión de estado de carga (`isSaving`, `isDeleting`).
-   **Contrato:** Cualquier componente que herede de esta clase **debe** implementar las siguientes propiedades abstractas:
    -   `actionId`: El ID único de la acción (usado para el título de la página).
    -   `service`: Una instancia de un servicio que herede de `BaseCrudService`.
    -   `columns`: La configuración de las columnas para la tabla.
    -   `formFields`: La configuración de los campos para el formulario dinámico.

### 2.2. `UiAdminPageLayoutComponent<T>`

-   **Ubicación:** `src/app/shared/components/ui-admin-page-layout/ui-admin-page-layout.component.ts`
-   **Propósito:** Es un componente "tonto" (dumb component) que se encarga exclusivamente de la presentación visual de la página de administración.
    -   Renderiza el título, la barra de búsqueda, los botones de acción, la tabla y el paginador.
    -   No contiene lógica de negocio.
-   **Comunicación:** Se comunica con el componente padre (ej. `CountriesAdminComponent`) a través de:
    -   `@Input()`: Para recibir todos los datos a mostrar (`title`, `columns`, `data`, `isLoading`, etc.).
    -   `@Output()`: Para notificar al padre sobre interacciones del usuario (`searchChange`, `sortChange`, `pageStateChange`, etc.).
-   **Personalización:** Utiliza **Proyección de Contenido (`<ng-content>`)** para permitir que el componente padre personalice el renderizado de celdas específicas de la tabla, usando la directiva `[appUiTableColumn]`.

### 2.3. `AdminPageManager<T>`

-   **Ubicación:** `src/app/shared/utils/admin-page-manager.ts`
-   **Propósito:** Es una clase que encapsula la lógica de gestión de datos de la tabla: paginación, ordenación, búsqueda y selección.
    -   Mantiene el estado de la tabla (`data`, `totalRecords`, `isLoading`, etc.) como `signals`.
    -   Expone métodos para reaccionar a eventos (`onSortChange`, `onSearch`, `onPageStateChange`).
    -   Se encarga de realizar las llamadas al servicio backend para obtener los datos.

### 2.4. Flujo de Implementación de una Nueva Página Admin

1.  **Crear el Componente:** Crear un nuevo componente `standalone` (ej. `RegionsAdminComponent`).
2.  **Heredar de la Clase Base:**
    ```typescript
    export class RegionsAdminComponent extends BaseAdminPageComponent<Region> { ... }
    ```
3.  **Implementar el Contrato:** En el `.ts`, definir las propiedades `actionId`, `service`, `columns` y `formFields`.
4.  **Usar el Layout en el HTML:** El archivo `.html` se reduce a su mínima expresión:
    ```html
    <div class="admin-page-container">
      <app-ui-admin-page-layout
        [title]="currentPageTitle()"
        [columns]="columns"
        [data]="manager.data()"
        ...etc...
        (searchChange)="manager.onSearch($event)"
        ...etc...
      >
        <!-- (Opcional) Proyectar plantillas para columnas personalizadas -->
        <ng-template [appUiTableColumn]="'customColumn'" let-item>
          <p>Renderizado especial para {{ item.name }}</p>
        </ng-template>
      </app-ui-admin-page-layout>
    </div>

    <!-- Modales de formulario y confirmación -->
    <app-ui-form-modal ... > ... </app-ui-form-modal>
    ```

Este patrón asegura que todas las páginas de administración sean consistentes, fáciles de crear y mantener, y que la lógica esté separada de la presentación.
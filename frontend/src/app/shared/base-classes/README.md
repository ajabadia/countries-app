<!-- File: d:\desarrollos\countries2\frontend\src\app\shared\base-classes\README.md | Last Modified: 2025-10-22 -->

# Base Classes

Este directorio contiene clases base `abstract` diseñadas para ser extendidas por otros componentes, promoviendo la reutilización de código y forzando una arquitectura consistente.

---

## `BaseAdminPageComponent<T>`

`BaseAdminPageComponent<T>` es una clase abstracta que sirve como el **esqueleto lógico** para todas las páginas de administración estándar (ej. `CountriesAdminComponent`, `ContinentsAdminComponent`, etc.).

### Propósito

Tras la creación de la utilidad `AdminPageManager`, se hizo evidente que, aunque la lógica de *datos* estaba centralizada, la lógica de *UI* (manejo de modales, acciones de guardado/borrado, etc.) y la estructura de la plantilla se repetirían en cada componente.
Esta clase base soluciona ese problema al:

1.  **Centralizar la Lógica Común**: Contiene la instancia de `AdminPageManager` y, en el futuro, contendrá toda la lógica para manejar modales, guardar, borrar y las acciones de la barra de herramientas.
   - **Actualización**: Ya contiene la lógica para la barra de herramientas, modales de formulario/confirmación y las operaciones `onSave`, `onDelete` y `onEditSelected`.
2.  **Establecer un Contrato Claro**: Al usar propiedades `abstract`, obliga a cualquier componente hijo a proporcionar la información específica que necesita para funcionar (el `service`, las `columns` de la tabla, el `form`, etc.). Esto garantiza la consistencia.
3.  **Simplificar los Componentes Hijos**: Reduce los componentes de administración a simples "clases de configuración", cuyo único trabajo es implementar el contrato de la clase base.

### Cómo Usarlo

Crear una nueva página de administración se vuelve trivial.

1.  **Crear el componente** y hacer que `extienda BaseAdminPageComponent<YourEntityType>`.
2.  **Implementar las propiedades abstractas**: Proporcionar `pageTitle`, `service`, `columns`, y `form`.
   - **Actualización**: Ya no se implementa `form` directamente. En su lugar, se debe implementar la propiedad `formFields: FormField[]`, que es un array de configuración para el formulario dinámico. La clase base se encargará de construir el `FormGroup`.
3.  **Llamar al constructor padre**: Asegurarse de llamar a `super()` en el constructor del hijo.
4.  **Crear la plantilla**: La plantilla del componente hijo contendrá los elementos de UI (`<app-ui-table>`, `<app-ui-toolbar-buttons>`, `<app-ui-form-modal>`, etc.) y los conectará a las propiedades y métodos heredados.

**Ejemplo (`areas-admin.component.ts`):**

```typescript
@Component({
  selector: 'app-areas-admin',
  standalone: true,
  imports: [/* Common UI modules */],
  templateUrl: './areas-admin.component.html',
})
export class AreasAdminComponent extends BaseAdminPageComponent<Area> {
  pageTitle = 'Gestión de Áreas';
  service = inject(AreasService);
  columns: TableColumn<Area>[] = [/* ... */];
  formFields: FormField[] = [/* ... */];

  constructor() {
    super();
  }
}
```
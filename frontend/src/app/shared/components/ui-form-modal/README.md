<!-- File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-form-modal\README.md | Last Modified: 2025-10-19 -->

# UI Form Modal Component (`<app-ui-form-modal>`)

Componente contenedor reutilizable y "tonto" (dumb component) para mostrar formularios de creación o edición dentro de un modal.

## Características

-   **Contenedor Genérico**: No contiene lógica de formulario. Utiliza proyección de contenido (`ng-content`) para mostrar cualquier formulario que se le pase.
-   **API Prefijada**: Todos sus inputs propios siguen la convención `ui-form-modal-*`.
-   **Configuración Externa de Botones**: No genera sus propios botones. Recibe la configuración completa de los botones del pie de página a través de un `Input`, lo que lo hace altamente reutilizable y desacoplado de la lógica de negocio.
-   **Componentes Anidados**: Utiliza `app-ui-heading` para la cabecera y `app-ui-toolbar-buttons` para el pie de página.
-   **Feedback Visual**: Admite una `variant` para cambiar el color de la cabecera y el icono, proporcionando feedback al usuario (ej. `error`, `success`).

## Cómo Usarlo

El componente es controlado entièrement por su padre. El padre define la visibilidad, el título y, más importante, la configuración de los botones del pie de página.

**En tu componente `.ts` (ej. `BaseAdminDirective`):**
```typescript
import { ToolbarButtonConfig } from '@shared/components/ui-toolbar-buttons/ui-toolbar-buttons.component';

// La directiva o componente padre es responsable de generar esta configuración.
// Idealmente, usando el ActionService.
modalButtons: ToolbarButtonConfig[] = [
  {
    id: 'cancel',
    label: 'Cancelar',
    action: () => this.closeModal(),
    variant: 'outline',
  },
  {
    id: 'save',
    label: 'Guardar',
    action: () => this.onSave(),
    variant: 'solid',
    disabled$: this.isSaving.asReadonly(), // El estado de carga se pasa aquí
  },
];
```

**En tu plantilla `.html`:**
```html
<app-ui-form-modal
  [ui-form-modal-visible]="isModalVisible()"
  (cancelClick)="closeModal()"
  [ui-form-modal-buttons]="modalButtons"
  ui-form-modal-title="Crear Nuevo País"
>
  <!-- El formulario se proyecta aquí -->
  <form [formGroup]="myForm">
    <!-- Contenido del formulario -->
  </form>
</app-ui-form-modal>
```

## API

### Inputs

| Input                       | Tipo                    | Por Defecto  | Descripción                                                                 |
| --------------------------- | ----------------------- | ------------ | --------------------------------------------------------------------------- |
| `ui-form-modal-visible`     | `boolean`               | `false`      | Controla si el modal es visible.                                            |
| `ui-form-modal-title`       | `string`                | `'Formulario'` | El título que se muestra en la cabecera.                                    |
| `ui-form-modal-variant`     | `ModalVariant`          | `'default'`  | La variante de color/icono (`default`, `info`, `success`, `error`, `warning`). |
| `ui-form-modal-buttons`     | `ToolbarButtonConfig[]` | `[]`         | La configuración para los botones que se mostrarán en el pie de página.     |
| `ui-heading-icon-name`      | `string`                | `undefined`  | (Pass-through) Permite sobreescribir el icono por defecto de la cabecera. |

### Outputs

| Output        | Emite      | Descripción                                                                 |
| ------------- | ---------- | --------------------------------------------------------------------------- |
| `cancelClick` | `void`     | Se emite cuando el usuario cierra el modal (botón cancelar, 'X' o backdrop). |

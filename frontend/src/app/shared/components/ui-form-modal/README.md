<!-- File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-form-modal\README.md | Last Modified: 2025-10-19 -->

# UI Form Modal Component (`<app-ui-form-modal>`)

Este es un componente contenedor reutilizable para mostrar formularios de creación o edición dentro de un modal.

## Características

-   **Contenedor Genérico**: No contiene lógica de formulario. Utiliza proyección de contenido (`ng-content`) para mostrar cualquier formulario que se le pase.
-   **API Prefijada**: Todos sus inputs propios siguen la convención `ui-form-modal-*`.
-   **Componentes Anidados**: Utiliza `app-ui-heading` para la cabecera y `app-ui-toolbar-buttons` para el pie de página, delegando en ellos la apariencia y comportamiento.
-   **Feedback Visual**: Admite una `variant` para cambiar el color de la cabecera y el icono, proporcionando feedback al usuario (ej. `error`, `success`).
-   **Paso de Parámetros (Pass-through)**: Permite personalizar los componentes hijos (cabecera y botones) desde el exterior.

## Cómo Usarlo

Se usa como un contenedor. El componente padre controla la visibilidad y proyecta el contenido del formulario.

**En tu componente `.ts`:**
```typescript
// Señal para controlar la visibilidad del modal
isModalVisible = signal(false);

// Lógica para abrir/cerrar el modal
openModal() { this.isModalVisible.set(true); }
closeModal() { this.isModalVisible.set(false); }

// Lógica para el guardado
onSave() { /* ... tu lógica de guardado ... */ }
```

**En tu plantilla `.html`:**
```html
<app-ui-form-modal
  [ui-form-modal-visible]="isModalVisible()"
  (cancel)="closeModal()"
  (save)="onSave()"
  ui-form-modal-title="Crear Nuevo País"
  [ui-form-modal-is-loading]="isSaving()"
>
  <!-- El formulario se proyecta aquí -->
  <form [formGroup]="myForm">
    <!-- Contenido del formulario -->
  </form>
</app-ui-form-modal>
```

## API

### Inputs Propios

| Input                       | Tipo           | Por Defecto  | Descripción                                                                 |
| --------------------------- | -------------- | ------------ | --------------------------------------------------------------------------- |
| `ui-form-modal-visible`     | `boolean`      | `false`      | Controla si el modal es visible.                                            |
| `ui-form-modal-title`       | `string`       | `'Formulario'` | El título que se muestra en la cabecera.                                    |
| `ui-form-modal-variant`     | `ModalVariant` | `'default'`  | La variante de color/icono (`default`, `info`, `success`, `error`, `warning`). |
| `ui-form-modal-is-loading`  | `boolean`      | `false`      | Si es `true`, deshabilita el botón de guardar y muestra un spinner.         |

### Inputs de Paso de Parámetros (Pass-through)

Estos inputs permiten controlar propiedades de los componentes anidados.

| Input                      | Para Componente   | Propósito                                                 |
| -------------------------- | ----------------- | --------------------------------------------------------- |
| `ui-heading-icon-name`     | `app-ui-heading`  | Permite sobreescribir el icono por defecto de la cabecera. |
| `ui-button-save-color`     | `app-ui-button`   | Permite cambiar el color del botón de guardar.            |
| `ui-button-cancel-color`   | `app-ui-button`   | Permite cambiar el color del botón de cancelar.           |

### Outputs

| Output   | Emite      | Descripción                                                                 |
| -------- | ---------- | --------------------------------------------------------------------------- |
| `save`   | `void`     | Se emite cuando el usuario hace clic en el botón de guardar.                |
| `cancel` | `void`     | Se emite cuando el usuario cierra el modal (botón cancelar, 'X' o backdrop). |

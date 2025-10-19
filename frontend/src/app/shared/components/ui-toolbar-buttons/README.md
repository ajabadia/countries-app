<!-- File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-toolbar-buttons\README.md | Last Modified: 2025-10-19 -->

# UI Toolbar Buttons Component (`<app-ui-toolbar-buttons>`)

Este es un componente de layout reutilizable que renderiza una lista de botones a partir de un array de configuración. Su principal ventaja es que crea un layout responsive y balanceado automáticamente.

## Características

-   **Configurable**: Se renderiza completamente a partir de un array de `ToolbarButtonConfig`.
-   **Layout Automático**: Utiliza `display: grid` con `auto-fit` para distribuir los botones de forma equitativa. En pantallas pequeñas, los botones se apilan verticalmente de forma natural.
-   **Delegación Pura**: No tiene estilos propios para los botones. Delega el 100% de la apariencia y comportamiento a `app-ui-button`, actuando como un simple contenedor de layout.

## Cómo Usarlo

El componente se usa pasándole un array de configuración a su input `[ui-toolbar-buttons]`.

**En tu componente `.ts`:**
```typescript
import { ToolbarButtonConfig } from '@shared/components/ui-toolbar-buttons/ui-toolbar-buttons.component';
import { of } from 'rxjs';

// ...

public myButtons: ToolbarButtonConfig[] = [
  {
    id: 'cancel',
    label: 'Cancelar',
    action: () => this.onCancel(),
    variant: 'outline',
    color: 'secondary',
  },
  {
    id: 'save',
    label: 'Guardar',
    action: () => this.onSave(),
    variant: 'solid',
    color: 'primary',
    disabled$: of(this.isSaving),
  },
];
```

**En tu plantilla `.html`:**
```html
<app-ui-toolbar-buttons [ui-toolbar-buttons]="myButtons"></app-ui-toolbar-buttons>
```

## API

### Input Principal

| Input                  | Tipo                    | Por Defecto | Descripción                                      |
| ---------------------- | ----------------------- | ----------- | ------------------------------------------------ |
| `ui-toolbar-buttons`   | `ToolbarButtonConfig[]` | `[]`        | El array de configuración para los botones a mostrar. |

### Interface `ToolbarButtonConfig`

Define la estructura de cada objeto en el array de configuración.

| Propiedad      | Tipo                      | Requerido | Descripción                                                                              |
| -------------- | ------------------------- | --------- | ---------------------------------------------------------------------------------------- |
| `id`           | `string`                  | Sí        | Un identificador único para el botón (usado en el `track` del `@for`).                   |
| `label`        | `string`                  | Sí        | El texto que se mostrará en el botón.                                                    |
| `action`       | `() => void`              | Sí        | La función que se ejecutará al hacer clic en el botón.                                   |
| `iconName`     | `string`                  | No        | El nombre del icono a pasar a `app-ui-button`.                                           |
| `color`        | `ButtonColor`             | No        | El color del botón (pasado a `app-ui-button`). Por defecto: `'primary'`.                 |
| `variant`      | `ButtonVariant`           | No        | La variante del botón (pasado a `app-ui-button`). Por defecto: `'solid'`.                |
| `size`         | `ButtonSize`              | No        | El tamaño del botón (pasado a `app-ui-button`). Por defecto: `'m'`.                      |
| `iconPosition` | `'left' \| 'right' \| 'only'` | No        | La posición del icono (pasado a `app-ui-button`). Por defecto: `'left'`.                 |
| `iconType`     | `UiIconType`              | No        | El tipo de icono (pasado a `app-ui-button`). Por defecto: `'system'`.                   |
| `disabled$`    | `Observable<boolean>`     | No        | Un observable que habilita/deshabilita el botón. Ideal para estados de carga.          |

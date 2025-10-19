<!-- File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-stat-card\README.md | Last Modified: 2025-10-19 -->

# UI Stat Card Component (`<app-ui-stat-card>`)

Componente reutilizable para mostrar una "tarjeta de estadística". Es ideal para dashboards y resúmenes visuales, mostrando un valor numérico o textual clave, una etiqueta descriptiva y un icono asociado.

## Estructura

El componente tiene un diseño de dos zonas verticales:

-   **Zona Superior**: Un área con un fondo oscuro (`--color-tertiary-dark`) que contiene el icono. El color del icono se contrasta automáticamente para ser visible.
-   **Zona Inferior**: Un área con el fondo principal de la tarjeta (`--color-surface`) que contiene el valor y la etiqueta.

## Características

-   **API Prefijada**: Todos sus inputs propios siguen la convención `ui-stat-card-*`.
-   **Navegación Opcional**: Si se le proporciona una ruta (`ui-stat-card-route`), toda la tarjeta se vuelve un elemento interactivo que navega a dicha ruta al hacer clic o presionar Enter/Espacio.
-   **Accesibilidad**: Implementa `role="button"`, `tabindex="0"` y `aria-label` para una correcta interacción con lectores de pantalla y teclado cuando es navegable.
-   **Integración con `ui-icon`**: Permite personalizar completamente el icono pasando las propiedades a través de sus inputs (`ui-icon-*`).

## Cómo Usarlo

```html
<app-ui-stat-card
  ui-stat-card-label="Total de Países"
  ui-stat-card-value="195"
  ui-icon-name="icon-world-globe"
  ui-stat-card-route="/admin/countries"
></app-ui-stat-card>
```

## API (Inputs)

### Inputs Propios

| Input                  | Tipo                | Requerido | Descripción                                                                 |
| ---------------------- | ------------------- | --------- | --------------------------------------------------------------------------- |
| `ui-stat-card-label`   | `string`            | Sí        | El texto descriptivo que aparece debajo del valor.                          |
| `ui-stat-card-value`   | `string \| number` | Sí        | El valor principal que se muestra en grande.                                |
| `ui-stat-card-route`   | `string \| any[]`  | No        | La ruta a la que navegar al hacer clic. Si no se provee, la tarjeta no es interactiva. |

### Inputs de Paso de Parámetros (Pass-through) para `app-ui-icon`

| Input              | Tipo                      | Por Defecto                               | Propósito                                                              |
| ------------------ | ------------------------- | ----------------------------------------- | ---------------------------------------------------------------------- |
| `ui-icon-name`     | `string`                  | `undefined`                               | El nombre del icono a mostrar.                                         |
| `ui-icon-type`     | `UiIconType`              | `'system'`                                | El tipo/carpeta del icono (ej. 'system', 'flags').                     |
| `ui-icon-color`    | `string`                  | `'var(--color-primary-contrast)'` | El color del icono. Por defecto es blanco para contrastar con el fondo. |
| `ui-icon-size`     | `UiIconSize \| string`    | `'l'`                                     | El tamaño del icono.                                                   |

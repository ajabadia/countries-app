<!-- File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-stat-card\README.md | Last Modified: 2025-10-19 -->

# UI Stat Card Component (`<app-ui-stat-card>`)

Este componente muestra una "tarjeta de estadística" visualmente atractiva, diseñada para dashboards y resúmenes de datos.

## Características

- **API Clara**: Usa inputs con alias (`ui-stat-card-*`) para una integración sencilla y predecible.
- **Reactiva**: Muestra un título, un valor y un icono.
- **Estado de Carga**: Incluye un estado de carga (`isLoading`) que muestra una animación de esqueleto, mejorando la experiencia del usuario mientras se obtienen los datos.
- **Accesibilidad**: Incluye atributos `aria-label` para ser accesible a lectores de pantalla.

## Cómo Usarlo

El componente se usa pasando los datos a través de sus inputs.

```html
<app-ui-stat-card
  [ui-stat-card-title]="'Países'"
  [ui-stat-card-value]="250"
  [ui-stat-card-icon]="'flag'"
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

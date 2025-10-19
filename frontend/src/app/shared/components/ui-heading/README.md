<!-- File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-heading\README.md | Last Modified: 2025-10-19 -->

# UI Heading Component (`<app-ui-heading>`)

Componente para renderizar encabezados semánticos (`<h1>` a `<h6>`) de forma consistente en toda la aplicación.

## Características

-   **API Prefijada**: Todos los inputs usan prefijos (`ui-heading-`, `ui-icon-`) para mayor claridad y para evitar colisiones de nombres.
-   **Semántico**: Renderiza la etiqueta de encabezado HTML correcta (`h1`, `h2`, etc.) según el `level` proporcionado.
-   **DRY (Don't Repeat Yourself)**: Utiliza una plantilla única y `ng-template` para evitar la duplicación de código.
-   **Jerarquía Visual Automática**: El tamaño del icono se ajusta automáticamente según el nivel del encabezado, creando una armonía visual sin esfuerzo.
-   **Integración con `ui-icon`**: Utiliza `app-ui-icon` para mostrar iconos opcionales a la izquierda o derecha del título.

## Cómo Usarlo

```html
<!-- Un encabezado de nivel 1 con un icono -->
<app-ui-heading
  ui-heading-level="1"
  ui-heading-title="Panel de Administración"
  ui-icon-name="settings">
</app-ui-heading>

<!-- Un encabezado de nivel 3 con el icono a la derecha -->
<app-ui-heading
  [ui-heading-level]="3"
  ui-heading-title="Lista de Países"
  ui-icon-name="world-globe"
  ui-icon-position="right">
</app-ui-heading>
```

## API (Inputs)

| Input                | Tipo                          | Por Defecto | Descripción                                                              |
| -------------------- | ----------------------------- | ----------- | ------------------------------------------------------------------------ |
| `ui-heading-title`   | `string`                      | `''`        | El texto que se mostrará en el encabezado.                               |
| `ui-heading-level`   | `1 \| 2 \| 3 \| 4 \| 5 \| 6`    | `1`         | El nivel semántico del encabezado. Determina la etiqueta (`h1` a `h6`). |
| `ui-icon-name`       | `string`                      | `undefined` | El nombre del icono a mostrar (pasado a `app-ui-icon`).                  |
| `ui-icon-position`   | `'left' \| 'right'`           | `'left'`    | La posición del icono en relación con el texto.                          |
| `ui-icon-type`       | `UiIconType`                  | `'system'`  | El tipo de icono a pasar a `app-ui-icon` (ej. 'system', 'flag').         |
| `ui-icon-size`       | `UiIconSize \| 'inherit' \| string` | `undefined` | El tamaño del icono. Si no se define, se ajusta al nivel del `heading`.  |
| `ui-icon-color`      | `string`                      | `undefined` | El color del icono (pasado a `app-ui-icon`).                             |

---

## Nota de Arquitectura

La versión anterior de este componente utilizaba un `ngSwitch` con múltiples casos para renderizar cada etiqueta de encabezado (`h1`, `h2`, etc.) por separado. Aunque esto implicaba repetición de código, se implementó para solucionar problemas de renderizado que surgieron en el pasado.

La implementación actual con `ng-template` es más limpia y sigue el principio DRY. Si surgieran problemas inesperados con esta nueva aproximación, la estructura anterior con `ngSwitch` puede ser considerada como un fallback válido a revisar.
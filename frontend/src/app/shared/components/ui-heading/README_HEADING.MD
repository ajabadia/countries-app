# UI Heading Component (`<app-ui-heading>`)

Componente para renderizar encabezados semánticos (`<h1>` a `<h6>`) de forma consistente en toda la aplicación.

## Características

-   **Semántico**: Renderiza la etiqueta de encabezado HTML correcta (`h1`, `h2`, etc.) según el `level` proporcionado.
-   **DRY (Don't Repeat Yourself)**: Utiliza una plantilla única y `ng-template` para evitar la duplicación de código.
-   **Jerarquía Visual Automática**: El tamaño del icono se ajusta automáticamente según el nivel del encabezado, creando una armonía visual sin esfuerzo.
-   **Integración con `ui-icon`**: Utiliza `app-ui-icon` para mostrar iconos opcionales a la izquierda o derecha del título.

## Cómo Usarlo

```html
<!-- Un encabezado de nivel 1 con un icono -->
<app-ui-heading
  heading-level="1"
  heading-title="Panel de Administración"
  icon-name="settings">
</app-ui-heading>

<!-- Un encabezado de nivel 3 con el icono a la derecha -->
<app-ui-heading
  [heading-level]="3"
  heading-title="Lista de Países"
  icon-name="globe"
  icon-position="right">
</app-ui-heading>
```

## API (Inputs)

| Input          | Tipo                          | Por Defecto | Descripción                                                              |
| -------------- | ----------------------------- | ----------- | ------------------------------------------------------------------------ |
| `title`        | `string`                      | `''`        | El texto que se mostrará en el encabezado.                               |
| `level`        | `1 \| 2 \| 3 \| 4 \| 5 \| 6`    | `1`         | El nivel semántico del encabezado. Determina la etiqueta (`h1` a `h6`). |
| `icon`         | `string`                      | `undefined` | El nombre del icono a mostrar (pasado a `app-ui-icon`).                  |
| `iconPosition` | `'left' \| 'right'`           | `'left'`    | La posición del icono en relación con el texto.                          |

---

## Nota de Arquitectura

La versión anterior de este componente utilizaba un `ngSwitch` con múltiples casos para renderizar cada etiqueta de encabezado (`h1`, `h2`, etc.) por separado. Aunque esto implicaba repetición de código, se implementó para solucionar problemas de renderizado que surgieron en el pasado.

La implementación actual con `ng-template` es más limpia y sigue el principio DRY. Si surgieran problemas inesperados con esta nueva aproximación, la estructura anterior con `ngSwitch` puede ser considerada como un fallback válido a revisar.

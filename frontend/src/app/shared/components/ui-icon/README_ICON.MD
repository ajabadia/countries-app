# UI Icon Component (`<app-ui-icon>`)

Este componente es el método estándar para mostrar iconos en toda la aplicación. Está diseñado para ser flexible, eficiente y fácil de usar.

## Características

-   **Carga Eficiente**: Utiliza `IconService` para cargar cada icono SVG una sola vez y lo cachea para usos futuros. Esto lo hace ideal para usar en grandes listas o tablas.
-   **Renderizado Dual**: Puede renderizar un icono como un SVG inyectado (por defecto) o como una etiqueta `<img>`.
-   **API Versátil**: Permite un control total sobre el tipo, nombre, tamaño y color del icono.
-   **Estilo Flexible**: Utiliza variables CSS para el tamaño y hereda el color del texto (`currentColor`), lo que facilita su integración con otros componentes como `ui-button`.

## Cómo Usarlo

```html
<app-ui-icon name="nombre-del-icono"></app-ui-icon>
```

## API (Inputs)

| Input        | Tipo                                   | Por Defecto | Descripción                                                                                             |
| -------------- | -------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------- |
| `name`       | `string`                               | **(req)**   | El nombre del archivo del icono (sin extensión).                                                        |
| `type`       | `'system' \| 'flag-circle' \| string`  | `'system'`  | El subdirectorio dentro de `/assets/icons/` donde se encuentra el icono.                                |
| `renderType` | `'svg' \| 'image'`                     | `'svg'`     | Cómo se debe renderizar el icono. `'svg'` para inyección de SVG, `'image'` para una etiqueta `<img>`. |
| `size`       | `'xs'...'xl' \| 'inherit' \| string` | `'m'`       | El tamaño del icono. Acepta tamaños predefinidos, `inherit` o un valor CSS válido (ej. '32px').        |
| `color`      | `string`                               | `undefined` | Un color CSS para aplicar directamente al icono. Sobrescribe el color heredado.                         |
| `class`      | `string`                               | `''`        | Clases CSS personalizadas para aplicar al elemento host del icono (ej. `grayscale`).                  |

## Ejemplos de Uso

### Icono Básico del Sistema

Busca `/assets/icons/system/edit.svg`.

```html
<app-ui-icon name="edit"></app-ui-icon>
```

### Icono de Bandera Circular (SVG)

Aplica los estilos de la clase `flag-circle` y busca el icono en `/assets/icons/flag-circle/es.svg`.

```html
<app-ui-icon name="es" type="flag-circle" class="flag-circle"></app-ui-icon>
```

### Icono de Bandera Rectangular (Imagen)

Renderiza como `<img>` buscando en `/assets/icons/flag-rect/es.png`.

```html
<app-ui-icon
  name="es"
  type="flag-rect"
  renderType="image"
  class="flag-rect">
</app-ui-icon>
```

### Icono con Tamaño y Color Específicos

```html
<app-ui-icon name="plus" size="l" color="green"></app-ui-icon>

<!-- O usando un tamaño personalizado -->
<app-ui-icon name="plus" size="32px"></app-ui-icon>
```

### Icono en Escala de Grises

Aplica los estilos definidos en `:host(.grayscale)`.

```html
<app-ui-icon name="es" type="flag-circle" class="flag-circle grayscale"></app-ui-icon>
```
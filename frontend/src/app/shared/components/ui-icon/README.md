<!-- File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-icon\README.md | Last Modified: 2025-10-19 -->

# UI Icon Component (`<app-ui-icon>`)

Este componente es el método estándar para mostrar iconos en toda la aplicación. Está diseñado para ser flexible, eficiente y fácil de usar.

## Características

-   **API Prefijada**: Todos los inputs usan el prefijo `ui-icon-` para mayor claridad.
-   **Carga Eficiente**: Utiliza `IconService` para cargar cada icono SVG una sola vez y lo cachea para usos futuros. Esto lo hace ideal para usar en grandes listas o tablas.
-   **Renderizado Dual**: Puede renderizar un icono como un SVG inyectado (por defecto) o como una etiqueta `<img>`.
-   **Estilo Flexible**: Utiliza variables CSS para el tamaño y hereda el color del texto (`currentColor`), lo que facilita su integración con otros componentes.

## Cómo Usarlo

```html
<app-ui-icon ui-icon-name="nombre-del-icono"></app-ui-icon>
```

## API (Inputs)

| Input                 | Tipo                                   | Por Defecto | Descripción                                                                                             |
| --------------------- | -------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------- |
| `ui-icon-name`        | `string`                               | **(req)**   | El nombre del archivo del icono (sin extensión).                                                        |
| `ui-icon-type`        | `string`                               | `'system'`  | El subdirectorio dentro de `/assets/icons/` donde se encuentra el icono (ej. 'system', 'flags').         |
| `ui-icon-render-type` | `'svg' \| 'image'`                     | `'svg'`     | Cómo se debe renderizar el icono. `'svg'` para inyección, `'image'` para una etiqueta `<img>` (busca `.png`). |
| `ui-icon-size`        | `'xs'...'xl' \| 'inherit' \| string` | `'m'`       | El tamaño del icono. Acepta tamaños predefinidos, `inherit` o un valor CSS válido (ej. '32px').        |
| `ui-icon-color`       | `string`                               | `undefined` | Un color CSS para aplicar directamente al icono. Sobrescribe el color heredado.                         |
| `ui-icon-class`       | `string`                               | `''`        | Clases CSS personalizadas para aplicar al elemento host del icono.                                      |

## Ejemplos de Uso

### Icono Básico del Sistema

Busca `/assets/icons/system/edit.svg`.

```html
<app-ui-icon ui-icon-name="edit"></app-ui-icon>
```

### Icono de Bandera (SVG)

Busca el icono en `/assets/icons/flags/es.svg`.

```html
<app-ui-icon ui-icon-name="es" ui-icon-type="flags"></app-ui-icon>
```

### Icono de Bandera (Imagen)

Renderiza como `<img>` buscando en `/assets/icons/flags/es.png`.

```html
<app-ui-icon
  ui-icon-name="es"
  ui-icon-type="flags"
  ui-icon-render-type="image">
</app-ui-icon>
```

### Icono con Tamaño y Color Específicos

```html
<app-ui-icon ui-icon-name="add" ui-icon-size="l" ui-icon-color="green"></app-ui-icon>

<!-- O usando un tamaño personalizado -->
<app-ui-icon ui-icon-name="add" ui-icon-size="32px"></app-ui-icon>
```
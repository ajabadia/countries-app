# UI Icon Component (`<app-ui-icon>`)

Componente reutilizable y de alto rendimiento para mostrar iconos SVG en toda la aplicación.

## Características

-   **API Prefijada**: Todos los inputs usan el prefijo `ui-icon-` para mayor claridad y consistencia.
-   **Carga Eficiente**: Utiliza `IconService` para cargar cada icono SVG una sola vez y lo cachea para usos futuros. Esto lo hace ideal para usar en grandes listas o tablas sin degradar el rendimiento.
-   **Renderizado Dual**: Puede renderizar un icono como un SVG inyectado en el DOM (por defecto) o como una etiqueta `<img>`, lo que ofrece flexibilidad.
-   **Estilo Flexible**: Utiliza variables CSS centralizadas en `_variables.scss` para los tamaños predefinidos (`--icon-size-xs`, `--icon-size-xl`, etc.) y permite tamaños personalizados. El color se puede especificar directamente.
-   **Fallback Automático**: Si un icono no se encuentra, el `IconService` está diseñado para cargar un icono de fallback (`UNK.svg`) para evitar errores visuales.

## Cómo Usarlo

### Icono Básico

Por defecto, usará el tamaño `m` y el color del texto del contenedor (`currentColor`).

```html
<app-ui-icon ui-icon-name="flag"></app-ui-icon>
```

### Icono con Tamaño y Color Específicos

```html
<app-ui-icon
  ui-icon-name="globe"
  ui-icon-size="xl"
  ui-icon-color="var(--color-primary)"
></app-ui-icon>

<!-- O usando un tamaño personalizado en píxeles -->
<app-ui-icon ui-icon-name="add" ui-icon-size="32px"></app-ui-icon>
```

## API (Inputs)

| Input | Tipo | Por Defecto | Descripción |
| --- | --- | --- | --- |
| `ui-icon-name` | `string` | **(req)** | El nombre del icono (sin la extensión `.svg`). |
| `ui-icon-type` | `'system' \| 'flags' \| ...` | `'system'` | La categoría o carpeta donde se encuentra el icono. |
| `ui-icon-render-type` | `'svg' \| 'image'` | `'svg'` | Cómo se debe renderizar el icono. |
| `ui-icon-size` | `UiIconSize \| 'inherit' \| string` | `'m'` | El tamaño del icono. Acepta tamaños predefinidos (`xs`, `s`, `m`, `l`, `xl`), `inherit` o un valor CSS válido como `'2rem'`. |
| `ui-icon-color` | `string` | `undefined` | El color del icono. Si no se especifica, hereda el color del texto (`currentColor`). |
| `ui-icon-class` | `string` | `''` | Clases CSS adicionales para aplicar al elemento host del icono. |
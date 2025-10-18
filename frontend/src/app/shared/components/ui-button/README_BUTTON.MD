<!-- File: /frontend/src/app/shared/components/ui-button/README.md -->

# UI Button Component (`<button app-ui-button>`)

Este es el componente estándar para todas las acciones clickeables (botones y enlaces) en la aplicación. Está diseñado para ser flexible, consistente y accesible, siguiendo una filosofía de "API Prefijada".

## Características

-   **API Prefijada**: Todos los inputs usan prefijos (`button-`, `icon-`) para mayor claridad y para evitar colisiones de nombres.
-   **Selector de Atributo**: Se usa como un atributo en elementos `<button>` o `<a>` (`<button app-ui-button>`), lo que lo hace semánticamente correcto.
-   **API Flexible**: Separa el color (`button-color`) de la variante (`button-variant`), permitiendo un sistema de diseño muy versátil.
-   **Integración con `ui-icon`**: Se integra perfectamente con `<app-ui-icon>`, actuando como un "conducto" transparente para las propiedades del icono.
-   **Detección Inteligente**: Detecta si el botón contiene texto o es solo un icono, aplicando los estilos apropiados automáticamente.
-   **Estados Incorporados**: Maneja los estados `disabled` y `loading` de forma nativa.
-   **Accesibilidad**: Gestiona el `aria-label` para botones de solo icono, mejorando la accesibilidad.

## Cómo Usarlo

```html
<!-- Botón sólido primario con icono -->
<button app-ui-button button-color="primary" button-variant="solid" icon-name="plus">
  Añadir Elemento
</button>

<!-- Botón de solo icono -->
<button app-ui-button icon-name="edit" icon-position="only" button-aria-label="Editar elemento"></button>

<!-- Enlace con apariencia de botón -->
<a app-ui-button href="/ruta" button-variant="outline">Ver Detalles</a>
```

## API (Inputs)

| Input                 | Tipo                                       | Por Defecto | Descripción                                                                                             |
| --------------------- | ------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------- |
| `button-color`        | `'primary' \| 'secondary' \| 'danger' ...` | `'primary'` | El color temático del botón.                                                                            |
| `button-variant`      | `'solid' \| 'outline' \| 'ghost'`          | `'solid'`   | El estilo visual del botón.                                                                             |
| `button-size`         | `'s' \| 'm' \| 'l'`                        | `'m'`       | El tamaño del botón (padding, font-size).                                                               |
| `button-disabled`     | `boolean`                                  | `false`     | Si el botón está deshabilitado.                                                                         |
| `button-loading`      | `boolean`                                  | `false`     | Si es `true`, muestra un spinner y deshabilita el botón.                                                |
| `button-full-width`   | `boolean`                                  | `false`     | Si el botón debe ocupar todo el ancho disponible.                                                       |
| `button-aria-label`   | `string`                                   | `undefined` | Etiqueta de accesibilidad. Esencial para botones de solo icono.                                         |
| `icon-name`           | `string`                                   | `undefined` | El nombre del icono a mostrar (pasado a `app-ui-icon`).                                                   |
| `icon-position`       | `'left' \| 'right' \| 'only'`              | `'left'`    | La posición del icono. `'only'` crea un botón de icono cuadrado.                                        |
| `icon-type`           | `UiIconType`                               | `'system'`  | El tipo de icono a pasar a `app-ui-icon` (ej. 'system', 'flag').                                        |

## Ejemplos de Uso

### Botón Sólido de Peligro

```html
<button app-ui-button button-color="danger" icon-name="delete">Borrar</button>
```

### Botón "Outline" Secundario

```html
<button app-ui-button button-color="secondary" button-variant="outline">Cancelar</button>
```

### Botón "Ghost" con Icono a la Derecha

```html
<button app-ui-button button-variant="ghost" icon-name="arrow-right" icon-position="right">
  Siguiente
</button>
```

### Botón de Solo Icono (Accesible)

El `button-aria-label` es crucial aquí para los lectores de pantalla.

```html
<button app-ui-button icon-name="settings" icon-position="only" button-aria-label="Configuración"></button>
```

### Botón en Estado de Carga

```html
<button app-ui-button [button-loading]="isSaving" (click)="save()">Guardar Cambios</button>
```
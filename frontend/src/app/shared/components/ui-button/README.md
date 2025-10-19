<!-- File: /frontend/src/app/shared/components/ui-button/README.md -->

# UI Button Component (`<button app-ui-button>`)

Este es el componente estándar para todas las acciones clickeables (botones y enlaces) en la aplicación. Está diseñado para ser flexible, consistente y accesible, siguiendo una filosofía de "API Prefijada".

## Características

-   **API Prefijada**: Todos los inputs usan prefijos (`ui-button-`, `ui-icon-`) para mayor claridad y para evitar colisiones de nombres.
-   **Selector de Atributo**: Se usa como un atributo en elementos `<button>` o `<a>` (`<button app-ui-button>`), lo que lo hace semánticamente correcto.
-   **API Flexible**: Separa el color (`ui-button-color`) de la variante (`ui-button-variant`), permitiendo un sistema de diseño muy versátil.
-   **Integración con `ui-icon`**: Se integra perfectamente con `<app-ui-icon>`, actuando como un "conducto" transparente para las propiedades del icono.
-   **Detección Inteligente**: Detecta si el botón contiene texto o es solo un icono, aplicando los estilos apropiados automáticamente.
-   **Estados Incorporados**: Maneja los estados `disabled` y `loading` de forma nativa.
-   **Accesibilidad**: Gestiona el `aria-label` para botones de solo icono, mejorando la accesibilidad.

## Cómo Usarlo

```html
<!-- Botón sólido primario con icono -->
<button app-ui-button ui-button-color="primary" ui-button-variant="solid" ui-icon-name="plus">
  Añadir Elemento
</button>

<!-- Botón de solo icono -->
<button app-ui-button ui-icon-name="edit" ui-icon-position="only" ui-button-aria-label="Editar elemento"></button>

<!-- Enlace con apariencia de botón -->
<a app-ui-button href="/ruta" ui-button-variant="outline">Ver Detalles</a>
```

## API (Inputs)

| Input                   | Tipo                                       | Por Defecto | Descripción                                                                                             |
| ----------------------- | ------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------- |
| `ui-button-color`       | `'primary' \| 'secondary' \| 'danger' ...` | `'primary'` | El color temático del botón.                                                                            |
| `ui-button-variant`     | `'solid' \| 'outline' \| 'ghost'`          | `'solid'`   | El estilo visual del botón.                                                                             |
| `ui-button-size`        | `'s' \| 'm' \| 'l'`                        | `'m'`       | El tamaño del botón (padding, font-size).                                                               |
| `ui-button-disabled`    | `boolean`                                  | `false`     | Si el botón está deshabilitado.                                                                         |
| `ui-button-loading`     | `boolean`                                  | `false`     | Si es `true`, muestra un spinner y deshabilita el botón.                                                |
| `ui-button-full-width`  | `boolean`                                  | `false`     | Si el botón debe ocupar todo el ancho disponible.                                                       |
| `ui-button-aria-label`  | `string`                                   | `undefined` | Etiqueta de accesibilidad. Esencial para botones de solo icono.                                         |
| `ui-icon-name`          | `string`                                   | `undefined` | El nombre del icono a mostrar (pasado a `app-ui-icon`).                                                   |
| `ui-icon-position`      | `'left' \| 'right' \| 'only'`              | `'left'`    | La posición del icono. `'only'` crea un botón de icono cuadrado.                                        |
| `ui-icon-type`          | `UiIconType`                               | `'system'`  | El tipo de icono a pasar a `app-ui-icon` (ej. 'system', 'flag').                                        |
| `ui-icon-size`          | `UiIconSize \| 'inherit' \| string`        | `undefined` | El tamaño del icono (pasado a `app-ui-icon`).                                                           |
| `ui-icon-color`         | `string`                                   | `undefined` | El color del icono (pasado a `app-ui-icon`).                                                            |
| `ui-icon-class`         | `string`                                   | `''`        | Clases CSS adicionales para el icono (pasado a `app-ui-icon`).                                          |

## Ejemplos de Uso

### Botón Sólido de Peligro

```html
<button app-ui-button ui-button-color="danger" ui-icon-name="delete">Borrar</button>
```

### Botón "Outline" Secundario

```html
<button app-ui-button ui-button-color="secondary" ui-button-variant="outline">Cancelar</button>
```

### Botón "Ghost" con Icono a la Derecha

```html
<button app-ui-button ui-button-variant="ghost" ui-icon-name="arrow-right" ui-icon-position="right">
  Siguiente
</button>
```

### Botón de Solo Icono (Accesible)

El `ui-button-aria-label` es crucial aquí para los lectores de pantalla.

```html
<button app-ui-button ui-icon-name="settings" ui-icon-position="only" ui-button-aria-label="Configuración"></button>
```

### Botón en Estado de Carga

```html
<button app-ui-button [ui-button-loading]="isSaving" (click)="save()">Guardar Cambios</button>
```

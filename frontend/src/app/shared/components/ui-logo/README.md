<!-- File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-logo\README.md | Last Modified: 2025-10-19 -->

# UI Logo Component (`<app-ui-logo>`)

Componente dedicado a mostrar el logotipo de la compañía de forma consistente.

## Características

-   **Configurable**: Permite especificar la ruta, el texto alternativo y el ancho del logo.
-   **Valores por Defecto**: Incluye valores por defecto para el logo principal de la compañía, facilitando su uso.
-   **Escalado Proporcional**: Mantiene la proporción correcta de la imagen al ajustar el ancho.
-   **API Prefijada**: Sigue las directrices del proyecto para los nombres de los inputs.

## Cómo Usarlo

```html
<!-- Usando los valores por defecto -->
<app-ui-logo></app-ui-logo>

<!-- Especificando un ancho diferente -->
<app-ui-logo [ui-logo-width]="200"></app-ui-logo>

<!-- Usando un logo completamente diferente -->
<app-ui-logo
  ui-logo-src="assets/images/otro-logo.svg"
  ui-logo-alt="Otro Logo"
  [ui-logo-width]="50">
</app-ui-logo>
```

## API (Inputs)

| Input           | Tipo             | Por Defecto                           | Descripción                                     |
| --------------- | ---------------- | ------------------------------------- | ----------------------------------------------- |
| `ui-logo-src`   | `string`         | `'assets/images/Ibercaja-logo-2025.svg'` | La ruta a la imagen del logo.                   |
| `ui-logo-alt`   | `string`         | `'Ibercaja Logo'`                     | El texto alternativo para la imagen.            |
| `ui-logo-width` | `string \| number` | `120`                                 | El ancho del logo en píxeles o como un string CSS. |

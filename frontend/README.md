<!-- File: d:\desarrollos\countries2\frontend\src\styles\README.md | Last Modified: 2025-10-19 -->

# Arquitectura de Estilos (Styling)

Este documento explica la arquitectura de estilos del proyecto, basada en una estructura similar a ITCSS (Inverted Triangle CSS), la metodología BEM y un sistema de theming con variables CSS.

## 1. Filosofía

-   **Modularidad**: Los estilos están divididos en ficheros parciales con responsabilidades únicas.
-   **Reutilización**: Se prioriza el uso de variables y mixins para mantener la consistencia.
-   **Theming**: El uso de variables CSS (`:root`) permite cambiar la apariencia de la aplicación (ej. tema claro/oscuro) de forma dinámica.
-   **BEM (Block, Element, Modifier)**: Todas las clases personalizadas deben seguir la sintaxis BEM para evitar colisiones y mejorar la legibilidad.

## 2. Estructura de Ficheros

La carpeta `src/styles` contiene todos los estilos globales, organizados de la siguiente manera:

-   `styles.scss`: **Punto de entrada principal**. Importa todos los demás parciales en el orden correcto de especificidad.
-   `_tools.scss`: **Índice de herramientas**. Reenvía (`@forward`) todos los ficheros de utilidades (variables, mixins) para que puedan ser consumidos desde un único punto con `@use 'styles/tools' as t;`.
-   `_variables.scss`: **Design Tokens (Tema Claro)**. Define todas las variables CSS para colores, espaciados, tipografía, sombras, etc. Es la fuente de la verdad del sistema de diseño.
-   `_variables-dark.scss`: **Design Tokens (Tema Oscuro)**. Contiene un mixin que sobreescribe las variables CSS para el tema oscuro.
-   `_reset.scss`: **Reseteo de CSS**. Normaliza los estilos por defecto de los navegadores.
-   `_base.scss`: **Estilos base**. Aplica estilos a etiquetas HTML desnudas (ej. `body`, `a`, `p`).
-   `_grid.scss`: **Sistema de Rejilla**. Define las clases `.grid` y `.grid__item` para el layout responsive.
-   `_components.scss`: **Estilos de componentes globales**. Contiene estilos para componentes de UI muy genéricos que se usan en toda la aplicación.
-   `_theme.scss`: **Utilidades de tema**. Clases de utilidad que aplican estilos directamente (ej. `.text-primary`, `.bg-surface`).

## 3. Cómo Utilizar el Sistema de Diseño

### 3.1. Uso de Variables

Nunca se deben "hardcodear" valores como colores o espaciados en los ficheros `.scss` de los componentes. Siempre se debe usar una variable CSS.

```scss
/* mal */
.mi-componente {
  background-color: #ffffff;
  padding: 16px;
}

/* bien */
.mi-componente {
  background-color: var(--color-surface);
  padding: var(--space-m);
}
```

### 3.2. Uso del Sistema de Rejilla

El sistema de rejilla es responsive. Usa 4 columnas en móvil y 12 en tablet y escritorio.

```html
<div class="grid">
  <!-- Ocupará 6 de 12 columnas en escritorio y 4 de 4 en móvil -->
  <div class="grid__item grid__item--span-6">
    ...
  </div>
  <!-- Ocupará 6 de 12 columnas en escritorio y 4 de 4 en móvil -->
  <div class="grid__item grid__item--span-6">
    ...
  </div>
</div>
```
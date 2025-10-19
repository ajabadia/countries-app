<!-- File: d:\desarrollos\countries2\frontend\src\styles\README.md | Last Modified: 2025-10-19 -->

# Arquitectura de Estilos y Sistema de Diseño

Este documento describe la filosofía, estructura y convenciones para la escritura de estilos (SCSS) en este proyecto.

## 1. Filosofía

Nuestra arquitectura de estilos se basa en tres pilares:

1.  **Modularidad (BEM)**: Usamos la metodología BEM (`Block__Element--Modifier`) para crear componentes de UI con estilos encapsulados, predecibles y sin colisiones.
2.  **Theming con Variables CSS**: Todos los valores de diseño (colores, espaciados, tipografía) se definen como variables CSS (`var(--nombre-variable)`). Esto nos permite implementar temas (como el modo oscuro) de forma sencilla y dinámica.
3.  **Sass Moderno (`@use` y `@forward`)**: Utilizamos el sistema de módulos de Sass para gestionar las dependencias de forma explícita, evitando la contaminación del espacio de nombres global que causaba `@import`.

## 2. Estructura de Archivos

Todos los estilos globales residen en `src/styles`. La estructura es la siguiente:

-   **`styles.scss`**: El punto de entrada principal. Su rol es minimalista: cargar el motor de estilos completo a través de `_tools.scss` y aplicar selectores de alto nivel como los temas (`[data-theme='dark']`).

-   **`_tools.scss`**: **El corazón de la arquitectura**. Este fichero tiene una doble responsabilidad:
    1.  **Reenvía (`@forward`)**: Expone todas las herramientas (variables, mixins, funciones) para que estén disponibles globalmente.
    2.  **Carga (`@use`)**: Importa todos los ficheros de estilos base (`_reset.scss`, `_base.scss`, etc.) en el orden correcto.

-   **`_variables.scss`**: Define todas las variables CSS para el tema por defecto (claro) dentro de `:root`. Aquí viven los *design tokens*: paleta de colores, espaciados, tipografía, sombras, etc.

-   **`_variables-dark.scss`**: Contiene un mixin (`dark-theme-variables`) que sobreescribe las variables CSS para el tema oscuro.

-   **`_mixins-definitions.scss`**: Contiene las definiciones de mixins genéricos de layout y UI (`flex-center`, `button-base`, etc.).

-   **`_reset.scss`**: Contiene un reseteo de CSS para normalizar los estilos por defecto de los navegadores y proporcionar una base consistente.

-   **`_base.scss`**: Define los estilos base para los elementos HTML (`body`, `h1`, `a`, etc.). Aquí se aplican los mixins de tipografía.

-   **`_typography.scss`**: Contiene el mixin dinámico `heading-styles($level)` y el mapa de configuración `$heading-styles-map` para todos los estilos de encabezado.

-   **`_grid.scss`**: Implementa el sistema de rejilla responsive del proyecto.

-   **`_components.scss`**: Estilos para componentes de UI globales definidos con clases (ej. `.btn`, `.card`).

-   **`_theme.scss`**: Contiene clases de utilidad y estilos relacionados con el tema que se aplican globalmente.

## 3. Cómo Usar el Sistema

### 3.1. Usar Variables (Design Tokens)

**Nunca** uses valores "hardcodeados" (ej. `color: #FFF`). Siempre utiliza las variables CSS definidas.

```scss
.mi-componente {
  // Correcto
  background-color: var(--color-surface);
  padding: var(--space-m);
  border-radius: var(--radius-lg);

  // Incorrecto
  background-color: white;
  padding: 16px;
}
```

### 3.2. Usar Mixins

Para acceder a los mixins globales, importa `tools` en tu archivo SCSS y úsalos con el alias. El patrón para mixins de tipografía ha sido refactorizado para ser más dinámico y mantenible.

```scss
@use 'styles/tools' as t;

.titulo-de-mi-componente {
  @include t.heading-styles('h2'); // Aplica los estilos de un H2 desde el mapa de configuración.
}
```

### 3.3. Usar el Sistema de Rejilla

El sistema de rejilla es responsive (4 columnas en móvil, 12 en escritorio).

```html
<div class="grid">
  <!-- Ocupará 6 de 12 columnas en escritorio y 4 de 4 en móvil -->
  <div class="grid__item grid__item--span-6">...</div>
  <!-- Ocupará 6 de 12 columnas en escritorio y 4 de 4 en móvil -->
  <div class="grid__item grid__item--span-6">...</div>
</div>
```
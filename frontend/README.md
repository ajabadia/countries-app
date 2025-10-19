<!-- File: d:\desarrollos\countries2\frontend\README.md | Last Modified: 2025-10-19 -->

# Frontend - Aplicación de Países

Este proyecto es una Single-Page Application (SPA) desarrollada con Angular para visualizar y gestionar información sobre países del mundo.

## 1. Stack Tecnológico

-   **Framework**: Angular v17+
-   **Lenguaje**: TypeScript
-   **Estilos**: SCSS con metodología BEM y variables CSS para theming.
-   **Arquitectura de Componentes**: `standalone: true` como estándar para una mayor modularidad.
-   **Gestión de Estado**: Uso nativo de `Signals` de Angular para el estado reactivo y `RxJS` para la gestión de flujos de datos asíncronos complejos (ej. eventos de UI con `debounce`).

## 2. Arquitectura

El proyecto sigue una arquitectura modular y escalable, organizada por funcionalidades (`core`, `features`, `shared`). Para una explicación detallada de la estructura de directorios y los principios de diseño, consulta el documento de arquitectura:

-   **Ver Arquitectura del Frontend**

-   `/core`: Servicios singleton, interceptores y guardias.
-   `/features`: Módulos de negocio (páginas).
-   `/shared`: Componentes, directivas y pipes reutilizables.

## 3. Guías y Convenciones

Todas las directrices de código, convenciones y buenas prácticas están documentadas en los siguientes archivos. Es de lectura obligatoria antes de contribuir al proyecto:

-   **Directrices de Trabajo**: Reglas sobre formato de código, nomenclatura, estilos y convenciones de Angular.
-   **Registro de Progreso**: Historial detallado de los cambios y decisiones tomadas durante el desarrollo.

## 4. Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm start`

Inicia la aplicación en modo de desarrollo. Abre http://localhost:4200 para verla en tu navegador. La página se recargará automáticamente si realizas cambios.

### `npm test`

Ejecuta los tests unitarios a través de Karma.

### `npm run build`

Compila la aplicación para producción en el directorio `dist/`. La compilación optimiza el código para obtener el mejor rendimiento.
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
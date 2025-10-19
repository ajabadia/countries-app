<!-- File: d:\desarrollos\countries2\frontend\README.md | Last Modified: 2025-10-19 -->

# Proyecto Frontend - Countries App v2

Este documento es el punto de entrada principal para entender la arquitectura, las convenciones y el funcionamiento del frontend de la aplicación.

## 1. Descripción General

El proyecto es una aplicación web construida con **Angular (v20+)** que permite visualizar y gestionar datos de países. Está diseñada siguiendo las prácticas más modernas del framework, incluyendo el uso exclusivo de **componentes Standalone**, una fuerte apuesta por la reutilización de código y una arquitectura modular y escalable.

## 2. Conceptos Clave de la Arquitectura

La estructura del código está diseñada para ser intuitiva y mantenible. Para una explicación más profunda, consulta [FRONTEND_ARCHITECTURE.md](./FRONTEND_ARCHITECTURE.md).

### 2.1. Estructura de Directorios (`/src/app`)

-   `/core`: Contiene la lógica fundamental que se carga una sola vez, como servicios de autenticación, interceptores HTTP y guardias de ruta.
-   `/features`: Contiene los módulos de funcionalidad o "páginas" de la aplicación (ej. `home`, `admin`, `auth`). Está pensado para la carga diferida (`lazy loading`).
-   `/shared`: El corazón de la reutilización. Contiene componentes, directivas y servicios genéricos diseñados para ser usados en cualquier parte de la aplicación.

### 2.2. Filosofía de Componentes

Todos los componentes reutilizables en `/shared/components` siguen una estricta filosofía para asegurar la consistencia:

-   **Standalone**: Todos los componentes son `standalone: true`.
-   **OnPush**: Usan `ChangeDetectionStrategy.OnPush` para un rendimiento óptimo.
-   **API Prefijada**: Los `@Input` públicos usan un alias con el prefijo del componente (ej. `[ui-button-color]`, `[ui-table-data]`) para evitar colisiones y mejorar la legibilidad.

### 2.3. Sistema de Estilos (Styling)

El proyecto utiliza **SCSS** con una arquitectura de ITCSS (Inverted Triangle CSS) y sigue la metodología **BEM** para el nombrado de clases.

-   **Theming con Variables CSS**: Todos los colores, espaciados, fuentes y radios están definidos como variables CSS en `src/styles/_variables.scss`. **No se deben usar colores hardcodeados**.
-   **Ficheros Globales**: Los estilos globales, mixins y placeholders se gestionan en el directorio `src/styles`.

## 3. Abstracciones para Acelerar el Desarrollo

El proyecto cuenta con abstracciones de alto nivel para minimizar el código repetitivo en las tareas más comunes.

-   **`BaseCrudService`**: Una clase base `abstract` que proporciona toda la lógica para las operaciones CRUD (`getAll`, `getById`, `create`, `update`, `delete`) contra la API. Los servicios de entidad (ej. `CountriesService`) heredan de ella.
-   **`BaseAdminDirective`**: Una directiva que funciona como una clase base para las páginas de administración. Encapsula toda la lógica de estado para la paginación, ordenación, búsqueda y manejo de modales, permitiendo que los componentes se centren solo en su plantilla.

## 4. Scripts Disponibles

| Comando           | Descripción                                                                   |
| ----------------- | ----------------------------------------------------------------------------- |
| `npm start`       | Inicia el servidor de desarrollo en `http://localhost:4200/`.                 |
| `npm run build`   | Compila la aplicación para producción en el directorio `/dist`.                |
| `npm run lint`    | Ejecuta el linter (ESLint) para analizar el código y detectar errores de estilo. |
| `npm run format`  | Formatea automáticamente el código usando Prettier.                           |

## 5. Documentación del Proyecto

Para una información más detallada, consulta los siguientes documentos en la raíz del proyecto:

-   [**WORKING_GUIDELINES.md**](./WORKING_GUIDELINES.md): Las reglas y convenciones de código que **deben** seguirse.
-   [**FRONTEND_ARCHITECTURE.md**](./FRONTEND_ARCHITECTURE.md): Explicación detallada de la estructura de directorios y la arquitectura.
-   [**BACKEND_API_GUIDE.md**](./BACKEND_API_GUIDE.md): Guía de referencia de la API del backend.
-   [**FRONTEND_PROGRESS_LOG.md**](./FRONTEND_PROGRESS_LOG.md): Un registro cronológico de los cambios y refactorizaciones realizadas.
-   [**LESSONS_LEARNED.md**](./LESSONS_LEARNED.md): Conclusiones y aprendizajes clave obtenidos durante el desarrollo.

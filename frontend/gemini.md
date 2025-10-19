<!-- File: d:\desarrollos\countries2\gemini.md | Last Modified: 2025-10-19 -->

# Master Prompt del Proyecto `countries2`

Este documento sirve como un resumen ejecutivo y un "prompt" de alto nivel para Gemini Code Assist. Centraliza los principios arquitectónicos, las convenciones y las fuentes de verdad del proyecto, tanto para el backend como para el frontend.

## 1. Visión General del Proyecto

El proyecto `countries2` es una aplicación web full-stack que consta de:

-   Un **backend** en Node.js/Express que sirve una API RESTful.
-   Un **frontend** en Angular (SPA) que consume la API.

Ambas partes del proyecto tienen una arquitectura bien definida y una documentación detallada que debe ser consultada para obtener información específica.

---

## 2. Arquitectura del Backend

El backend está diseñado para ser robusto, escalable y fácil de mantener.

-   **Stack**: Node.js, Express, TypeScript, `better-sqlite3`.
-   **Documentación Principal**: `frontend/BACKEND_API_REFERENCE.md`

### Principios Clave del Backend:

1.  **Patrón CRUD Genérico**: La lógica para crear, leer, actualizar y eliminar entidades se abstrae en un `BaseService<T>` y una factoría `createCrudController`. Esto evita la duplicación de código y acelera el desarrollo de nuevos endpoints.

2.  **Manejo de Errores Centralizado**: Los controladores y servicios **lanzan errores semánticos** (ej. `NotFoundError`, `ValidationError`). Un único middleware (`errorHandler.ts`) se encarga de capturarlos y formatear la respuesta HTTP. No se usan bloques `try/catch` para errores HTTP en la lógica de negocio.

3.  **Seguridad**: La autenticación se basa en un sistema de **Access Tokens** (corta duración, enviados por cabecera) y **Refresh Tokens** (larga duración, almacenados en cookies `HttpOnly`) para máxima seguridad.

---

## 3. Arquitectura del Frontend

El frontend está construido con Angular v17+ siguiendo las prácticas más modernas.

-   **Stack**: Angular, TypeScript, SCSS, Signals, RxJS.
-   **Documentación Principal**:
    -   `frontend/FRONTEND_ARCHITECTURE.md` (Estructura de directorios).
    -   `frontend/WORKING_GUIDELINES.md` (Convenciones de código).

### Principios Clave del Frontend:

1.  **Estructura Modular**: El código se organiza en tres directorios principales:
    -   `core`: Servicios singleton, guardias e interceptores (cargado una vez).
    -   `features`: Módulos de negocio y páginas de la aplicación (cargados con lazy loading).
    -   `shared`: Componentes, directivas y servicios reutilizables (la base del principio DRY).

2.  **Componentes Modernos**: Todos los componentes son `standalone: true` y usan `ChangeDetectionStrategy.OnPush` para un rendimiento óptimo.

3.  **Gestión de Estado Reactiva**: Se utilizan `Signals` de Angular para el estado síncrono y `RxJS` para manejar flujos de datos asíncronos complejos (ej. peticiones HTTP, eventos de UI con `debounce`).

4.  **Centralización de Acciones (ActionService)**: Un servicio en `core` (`ActionService`) actúa como única fuente de la verdad para todas las acciones de la UI (botones, enlaces de menú). Los componentes de UI (como la barra de herramientas o el menú) consumen este servicio y adaptan las acciones a su formato, manteniendo los componentes "tontos" y la lógica de negocio centralizada.

5.  **Sistema de Diseño Estricto**:
    -   Los estilos siguen la metodología **BEM**.
    -   Está **prohibido "hardcodear" colores**. Siempre se deben usar las variables CSS definidas en `src/styles/_variables.scss` (ej. `var(--color-primary)`).

---

## 4. Historial de Cambios

Cualquier cambio significativo en la arquitectura o implementación se registra en `frontend/FRONTEND_PROGRESS_LOG.md`. Este archivo es una fuente valiosa para entender la evolución del proyecto.
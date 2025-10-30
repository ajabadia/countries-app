<!-- File: d:\desarrollos\countries2\README.md | Last Modified: 2025-10-28 -->

# Proyecto `countries2` - Guía Principal

## 1. Arquitectura General

El proyecto sigue una arquitectura de aplicación web moderna con una clara separación entre el frontend y el backend:

-   **Frontend:** Una Single-Page Application (SPA) desarrollada con **Angular**, enfocada en la reactividad, reusabilidad y rendimiento.
-   **Backend:** Una API RESTful construida sobre **Node.js** y **Express**, con una arquitectura por capas y patrones genéricos para escalabilidad.
-   **Base de Datos:** **SQLite** a través de `better-sqlite3`.

## 2. Estado Actual del Proyecto

El proyecto ha alcanzado un hito de estabilidad y calidad excepcionales. Se han completado con éxito todas las fases del plan de refactorización, abordando la deuda técnica crítica, unificando la arquitectura del frontend y mejorando el rendimiento y la seguridad del backend.

La aplicación es ahora robusta, mantenible y escalable. El código sigue un conjunto de directrices claras y documentadas, lo que facilita el desarrollo futuro y la incorporación de nuevas funcionalidades.

## 3. Arquitectura del Backend

El backend se ha consolidado como una API RESTful eficiente y segura, construida sobre Node.js, Express y TypeScript. Su diseño se basa en los siguientes pilares:

-   **Patrón CRUD Genérico**: La combinación de un `BaseService<T>` y una factoría `createCrudController` ha eliminado la duplicación de código, permitiendo que la creación de nuevos endpoints para entidades sea un proceso rápido y estandarizado.
-   **Autenticación Segura**: Se utiliza un sistema de autenticación de dos tokens (Access y Refresh) con cookies `HttpOnly`, lo que proporciona un alto nivel de seguridad contra ataques XSS.
-   **Separación de Responsabilidades**: La lógica de negocio está claramente delimitada. Un ejemplo clave es la separación de las rutas de autenticación (`/api/auth`) de las de administración de usuarios (`/api/admin/users`), lo que mejora la claridad y la seguridad.
-   **Optimización de Base de Datos**: Las operaciones de escritura ahora utilizan la cláusula `RETURNING *` de SQLite, reduciendo las consultas a la base de datos y mejorando la latencia.

## 4. Arquitectura del Frontend

El frontend ha sido la pieza central de la refactorización, transformándose en una aplicación Angular moderna, modular y extremadamente eficiente.

-   **Estructura Modular (`core`, `features`, `shared`)**: La organización del código es clara y escalable, con una estricta separación entre la lógica de negocio, los servicios singleton y los componentes reutilizables.

-   **Patrón de Páginas de Administración**: Este es el logro más significativo. La arquitectura para las páginas CRUD se basa en tres componentes clave que trabajan en conjunto:
    1.  **`BaseAdminPageComponent`**: Una clase base abstracta de la que heredan todas las páginas de administración. Centraliza toda la lógica de UI común (manejo de modales, acciones de guardado/borrado).
    2.  **`UiAdminPageLayoutComponent`**: Un componente de presentación genérico que renderiza toda la estructura visual (título, tabla, paginador). Esto ha eliminado la duplicación masiva de HTML.
    3.  **`AdminPageManager`**: Una clase de utilidad "headless" que gestiona todo el estado y la lógica de los datos de la tabla (paginación, búsqueda, ordenación, selección).
    4.  **`FormBuilderService` y Registro de Metadatos**: Para eliminar la duplicación en la definición de formularios, se ha implementado un `FormBuilderService`. Este servicio lee una configuración centralizada (`field-definitions.config.ts`) que actúa como la "fuente única de la verdad" para todos los campos de la aplicación (etiquetas, validaciones, etc.) y construye dinámicamente los formularios. Los componentes de administración ya no definen sus campos manualmente.

-   **`ActionService` como Fuente Única de Verdad**: Este servicio centraliza la definición de todas las acciones de la UI (menús, botones de la barra de herramientas). Los componentes simplemente consumen las acciones que necesitan, desacoplando la lógica de la presentación.

El resultado es que la creación de una nueva página de administración se ha reducido a una tarea de configuración, en lugar de un proyecto de desarrollo.

## 5. Documentación Clave

Para una comprensión más profunda, consulta los siguientes documentos en la carpeta `/documentación`:

-   **`REFACTORING_PLAN.md`**: La hoja de ruta que guió las mejoras del proyecto.
-   **`FRONTEND_ARCHITECTURE_GUIDE.md`**: Detalles sobre la arquitectura del frontend.
-   **`BACKEND_API_GUIDE.md`**: Guía de referencia para la API del backend.
-   **`WORKING_GUIDELINES.md`**: Convenciones de código y buenas prácticas.
-   **`LESSONS_LEARNED.md`**: Resumen de los aprendizajes técnicos clave obtenidos.

## 6. Scripts Disponibles

En el directorio raíz del proyecto, puedes ejecutar:

### `npm run dev`

Inicia la aplicación en modo de desarrollo, lanzando **simultáneamente** el servidor del frontend (`localhost:4200`) y el del backend (`localhost:3000`). La página se recargará automáticamente si realizas cambios.

### `npm test`

Ejecuta los tests unitarios.

### `npm run build`

Compila la aplicación para producción en el directorio `dist/`.

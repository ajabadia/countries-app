Este documento es una guía de arquitectura y un "prompt" de referencia para el desarrollo del proyecto. Su objetivo es documentar los patrones de diseño establecidos, asegurar la consistencia del código y definir una hoja de ruta para futuras mejoras.

## 1. Arquitectura General

El proyecto sigue una arquitectura de aplicación web moderna con una clara separación entre el frontend y el backend:

-   **Frontend:** Una Single-Page Application (SPA) desarrollada con **Angular**, enfocada en la reactividad, reusabilidad y rendimiento.
-   **Backend:** Una API RESTful construida sobre **Node.js** y **Express**, con una arquitectura por capas y patrones genéricos para escalabilidad.
-   **Base de Datos:** **SQLite** a través de `better-sqlite3`.

## 2. Patrones y Arquitectura del Frontend (`/frontend`)

El frontend demuestra un alto nivel de madurez, aplicando prácticas modernas de Angular y un fuerte enfoque en la reusabilidad y el rendimiento.

### Puntos Fuertes y Patrones de Diseño

-   **Componentes Modernos (`standalone` y `OnPush`):**
    -   Se adopta el patrón de **Standalone Components** (ej. `SearchBoxComponent`, `UiHeadingComponent`), lo que simplifica la gestión de módulos y dependencias, alineándose con las prácticas actuales de Angular.
    -   El uso de `ChangeDetectionStrategy.OnPush` es la norma en los componentes, una práctica excelente para optimizar el rendimiento al minimizar los ciclos de detección de cambios.

-   **Gestión de Estado Reactivo con RxJS:**
    -   Se utiliza `BehaviorSubject` y `Subject` para gestionar el estado de la UI (ej. `page$`, `search$`, `sort$` en `BaseAdminComponent`).
    -   Se combinan múltiples flujos de estado con `combineLatest` para reaccionar a los cambios y disparar la recarga de datos de forma eficiente.
    -   Se usa `debounceTime` y `distinctUntilChanged` para optimizar la entrada del usuario (ej. en `SearchBoxComponent`), previniendo un exceso de peticiones a la API.

-   **Abstracción y Reusabilidad (Patrones Clave):**
    -   **`BaseCrudService<T>`:** Un servicio genérico que centraliza toda la lógica de comunicación con los endpoints CRUD del backend. Las clases hijas (`CountriesService`, `LanguagesService`, etc.) simplemente heredan y especifican el nombre del endpoint, eliminando código repetido.
    -   **`BaseAdminComponent<T>`:** Una clase base abstracta (`@Directive`) que implementa toda la lógica de una página de administración (obtener datos, paginar, buscar, ordenar, gestionar modales y selección). Los componentes concretos (`AdminLanguagesComponent`) solo necesitan proporcionar la configuración específica (servicio, columnas de la tabla, formulario), siguiendo el **patrón Template Method**.
    -   **`SelectionService<T>`:** Un servicio genérico y reutilizable para gestionar la selección de elementos en una lista. Su `providedIn: 'any'` es una decisión de diseño inteligente que crea una instancia única por cada componente que lo inyecta, aislando el estado de la selección.
    -   **`IconService`:** Centraliza la carga y cacheo de iconos SVG, optimizando el rendimiento al evitar peticiones HTTP duplicadas.

## 3. COLISIONES A MEJORAR (Frontend vs. Backend)

Esta sección identifica inconsistencias entre la implementación actual del frontend y la API del backend. Es prioritario alinear estos puntos para asegurar el correcto funcionamiento.

1.  **Parámetros de Paginación y Ordenación:**
    -   **Frontend (`BaseAdminComponent`) envía:** `sort` y `order`.
    -   **Backend (`BaseService`) espera:** `orderBy` y `orderDir`.
    -   **Acción:** Modificar `BaseAdminComponent` para que envíe `orderBy` y `orderDir` en las peticiones `getAll`.

2.  **Endpoint de Eliminación (`delete`):**
    -   **Frontend (`BaseAdminComponent`) envía:** Una petición `DELETE` con un array de IDs en el body para eliminación múltiple.
    -   **Backend (`baseController`) espera:** Una petición `DELETE` a un endpoint con un único ID en la URL (ej. `/api/entities/:id`). No soporta eliminación múltiple.
    -   **Acción:** Modificar el `onConfirmDelete` del frontend para que itere sobre los IDs seleccionados y envíe una petición `DELETE` por cada uno, o bien, evolucionar el backend para que acepte un array de IDs.

3.  **Estructura de la Respuesta `getAll`:**
    -   **Frontend (`admin-dashboard.component.ts`) espera:** Una respuesta con `{ data: T[], total: number }`.
    -   **Backend (`baseController.ts`) devuelve:** Una respuesta con `{ data: T[], total: number }`.
    -   **Estado:** **¡Correcto!** La comunicación para obtener el total de registros ya está alineada.

## 4. Mejoras Futuras y Próximos Pasos (Frontend)

1.  **Autenticación y Gestión de Tokens:**
    -   **Interceptor HTTP:** Crear un `HttpInterceptor` para añadir automáticamente el `Authorization: Bearer <token>` a todas las peticiones salientes. Esto centraliza la lógica y limpia los servicios.
    -   **Servicio de Autenticación:** Implementar un `AuthService` que gestione el estado de autenticación del usuario (login, logout, almacenamiento seguro del token) y la lógica para refrescar el token usando el endpoint del backend.
    -   **Guardias de Ruta (`CanActivate`):** Proteger las rutas del panel de administración para que solo usuarios autenticados (y con el rol adecuado) puedan acceder.

2.  **Manejo de Estado Global:**
    -   Para una gestión de estado más compleja y predecible, considerar la adopción de una librería como **NgRx** o **Elf**. Esto sería beneficioso si la aplicación crece y necesita compartir estado entre módulos no relacionados.

3.  **Optimización y Carga Diferida (Lazy Loading):**
    -   Configurar el enrutador de Angular para que cargue los módulos (`AdminModule`, `PublicModule`) de forma diferida (`loadChildren`). Esto mejorará drásticamente el tiempo de carga inicial de la aplicación.

4.  **Manejo de Errores y Notificaciones:**
    -   Implementar un `HttpInterceptor` para capturar errores HTTP de forma centralizada.
    -   Crear un servicio de notificaciones (ej. `ToastService`) para mostrar mensajes de éxito o error al usuario de forma no intrusiva, mejorando la experiencia de usuario.

5.  **Refactorización de Rutas y Plantillas:**
    -   **Plantilla Genérica de Administración:** El componente `admin-languages.component.ts` apunta a su propia plantilla. Se debe crear una plantilla genérica (ej. `admin-base-page.component.html`) que contenga la estructura común (`ui-heading`, `toolbar-buttons`, `table`, etc.) y hacer que todos los componentes de administración la reutilicen.
    -   **Alias de Rutas:** Aunque las rutas relativas son robustas, el uso consistente de alias (`@shared`, `@services`, `@models`) configurados en `tsconfig.json` puede mejorar la legibilidad y facilitar la refactorización. Se debe asegurar que estos alias se usen de forma coherente en todo el proyecto.


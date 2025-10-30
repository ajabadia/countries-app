<!-- File: d:\desarrollos\countries2\documentación\FRONTEND_DIRECTORY_DIAGRAM.md | Last Modified: 2025-10-29 -->

# Diagrama de Estructura de Directorios del Frontend

Este diagrama ilustra la arquitectura de directorios principal de la aplicación frontend, destacando la separación de responsabilidades entre las carpetas `core`, `features`, `shared` y `types`.

```mermaid
graph TD
    subgraph "Estructura Principal"
        A(src)
    end

    A --> app("<b>app</b><br/>Contenedor principal de la aplicación")
    A --> assets("<b>assets</b><br/>Recursos estáticos (iconos, imágenes)")
    A --> environments("<b>environments</b><br/>Variables de entorno")

    subgraph "app - Lógica de la Aplicación"
        direction LR
        app --> core("
            <b>core</b><br/>
            Servicios Singleton<br/>
            Guardias e Interceptores<br/>
            <i>(Se carga una sola vez)</i>
        ")
        app --> features("
            <b>features</b><br/>
            Páginas y funcionalidades<br/>
            de negocio<br/>
            <i>(Carga diferida)</i>
        ")
        app --> shared("
            <b>shared</b><br/>
            Componentes y lógica<br/>
            reutilizable<br/>
            <i>(Principio DRY)</i>
        ")
        app --> types("
            <b>types</b><br/>
            Interfaces y tipos<br/>
            globales de datos<br/>
            <i>(Ej: User, Country)</i>
        ")
    end

    subgraph "features - Ejemplos"
        features --> admin("admin/")
        features --> auth("auth/")
        features --> user("user/")
    end

    subgraph "shared - Ejemplos"
        shared --> components("components/ (ui-table, ui-button)")
        shared --> services("services/ (base-crud.service)")
        shared --> base_classes("base-classes/ (base-admin-page)")
        shared --> utils("utils/ (admin-page-manager)")
    end

    subgraph "core - Ejemplos"
        core --> auth_core("auth/ (auth.service, auth.guard)")
        core --> services_core("services/ (action.service, toast.service)")
    end

    classDef folder fill:#E6F2FF,stroke:#007BFF,stroke-width:2px;
    classDef file fill:#FFF,stroke:#333,stroke-width:1px;

    class app,assets,environments,core,features,shared,types,admin,auth,user,components,services,base_classes,utils,auth_core,services_core folder;
    class A,main_ts,styles_scss file;
```

Este diagrama proporciona una visión clara y de alto nivel de cómo está organizado el frontend, lo que es extremadamente útil para la incorporación de nuevos desarrolladores y para mantener una comprensión compartida de la arquitectura.

---

## Descripción de Directorios Principales

### `core`
-   **Propósito**: Contiene la lógica fundamental que se carga **una sola vez** al iniciar la aplicación. Son los cimientos del frontend.
-   **Contenido Típico**:
    -   Servicios Singleton (`AuthService`, `ActionService`, `LayoutService`).
    -   Guardias de Ruta (`AuthGuard`, `AdminGuard`).
    -   Interceptores HTTP (`AuthInterceptor`).

### `features`
-   **Propósito**: El corazón de la aplicación. Cada subdirectorio representa una funcionalidad o "página" principal, diseñada para ser cargada de forma diferida (`lazy loading`).
-   **Contenido Típico**:
    -   Páginas de administración (`/admin`).
    -   Páginas de autenticación (`/auth`).
    -   Páginas de perfil de usuario (`/user`).

### `shared`
-   **Propósito**: El arsenal de componentes y utilidades **reutilizables** en diferentes `features`. Es la clave de la filosofía DRY (Don't Repeat Yourself).
-   **Contenido Típico**:
    -   Componentes de UI "tontos" (`ui-table`, `ui-button`, `ui-form-modal`).
    -   Clases base (`BaseAdminPageComponent`).
    -   Servicios genéricos (`BaseCrudService`).

### `types`
-   **Propósito**: Ubicación centralizada para todas las definiciones de tipos e interfaces de datos globales (`User`, `Country`, `Continent`, etc.).
-   **Beneficio**: Desacopla las definiciones de datos de la lógica del `core`, mejorando la organización y claridad del proyecto.
<!--
[PROMPT_SUGGESTION]Sí, me parece perfecto. Empecemos por modificar el `UiDynamicFormComponent` y la interfaz `FormField` para que soporten el nuevo tipo `select`.[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Ahora que la documentación está completa, crea un script SQL (`init_db.sql`) que contenga todas las sentencias `CREATE TABLE` para ambas bases de datos.[/PROMPT_SUGGESTION]

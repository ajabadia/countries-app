# Sugerencias de Estructura de Archivos

Este documento propone mejoras en la organización de los archivos del proyecto para aumentar la claridad, modularidad y mantenibilidad.

## Backend

### 1. Unificar Lógica de Gestión de Usuarios

-   **Sugerencia:** Consolidar los endpoints de administración de usuarios.
-   **Contexto:** Actualmente, la lógica para gestionar usuarios está dividida. `routes/auth.ts` contiene endpoints para que un administrador cambie roles, pero `routes/users.ts` contiene el CRUD completo (crear, leer, actualizar, eliminar) para usuarios, también para administradores. Esto puede ser confuso.
-   **Propuesta:** Mover toda la lógica de **administración de usuarios** a `users.ts` y dejar `auth.ts` exclusivamente para operaciones de autenticación del propio usuario (login, registro, perfil, logout, refresh token). Las rutas en `users.ts` podrían prefijarse con `/api/admin/users` para mayor claridad.
-   **Beneficio:** Separación de responsabilidades más clara y estricta.

## Frontend

### 1. Reorganizar la Carpeta `core`

-   **Sugerencia (✅ Implementada):** Mover los tipos de datos (`types`) fuera de la carpeta `core`.
-   **Contexto:** La carpeta `core` está destinada a servicios singleton e interceptores que se cargan una vez. Los tipos de datos (`*.types.ts`) no son servicios, sino definiciones de estructuras de datos que se usan en toda la aplicación.
-   **Propuesta:**
    1.  Crear una nueva carpeta en la raíz de `app`: `src/app/types`.
    2.  Mover todos los archivos de tipos (ej. `user.types.ts`, `country.types.ts`) a esta nueva carpeta.
    3.  Actualizar los alias de importación en `tsconfig.json` para que `@app/types` apunte a esta nueva carpeta.
-   **Beneficio:** La carpeta `core` tiene un propósito más definido y los tipos de datos están en una ubicación más lógica y centralizada.

### 2. Estructura de Componentes `shared`

-   **Sugerencia:** Agrupar los componentes compartidos por funcionalidad.
-   **Contexto:** La carpeta `shared/components` es una lista larga de componentes. A medida que la aplicación crezca, será difícil de navegar.
-   **Propuesta:** Crear subcarpetas dentro de `shared/components` para agrupar componentes relacionados. Por ejemplo:
    -   `shared/components/ui/` para componentes de UI puros (button, icon, heading).
    -   `shared/components/form/` para componentes relacionados con formularios (dynamic-form, form-modal).
    -   `shared/components/layout/` para componentes de estructura (toolbar, paginator).
-   **Beneficio:** Mejor organización y más fácil de encontrar componentes reutilizables.

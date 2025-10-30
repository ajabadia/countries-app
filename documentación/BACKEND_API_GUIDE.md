<!-- File: d:\desarrollos\countries2\documentación\BACKEND_API_GUIDE.md | Last Modified: 2025-10-27 -->

# Backend API - Visión General del Proyecto

Este documento sirve como una guía completa de la arquitectura, patrones y convenciones utilizadas en el backend de la aplicación. Su objetivo es documentar el estado actual del proyecto y actuar como un "prompt" de referencia para el desarrollo futuro, asegurando la consistencia y la calidad del código.

## 1. Stack Tecnológico

-   **Runtime:** Node.js
-   **Framework:** Express.js
-   **Lenguaje:** TypeScript
-   **Base de Datos:** `better-sqlite3` (SQLite). Se utilizan dos bases de datos separadas: `countries.db` para datos de la aplicación y `auth.db` para usuarios y autenticación.
-   **Manejo de Errores Asíncronos:** `express-async-handler`
-   **Validación de Peticiones:** `express-validator`
-   **Autenticación:** `jsonwebtoken` (JWT) para tokens, `bcryptjs` para hashing de contraseñas.
-   **Seguridad:** `express-rate-limit` para prevenir ataques de fuerza bruta, `cookie-parser` para gestionar cookies seguras.
-   **Logging:** `winston` y `winston-daily-rotate-file` para un registro de eventos robusto y con rotación de archivos.
-   **Peticiones HTTP:** `morgan` para el logging de peticiones, integrado con Winston.

## 2. Estructura del Proyecto

El backend sigue una arquitectura por capas, con una clara separación de responsabilidades:

-   `/config`: Contiene la configuración de servicios externos, como el logger (`logger.ts`).
-   `/db`: Contiene la lógica de conexión a las bases de datos (`database.ts`, `authDatabase.ts`) y los ficheros de base de datos (`.db`).
-   `/errors`: Define clases de error personalizadas (`HttpError`, `NotFoundError`, `ValidationError`) para un manejo semántico y centralizado.
-   `/middleware`: Contiene los middlewares de Express, como el manejador de errores (`errorHandler.ts`) y el de autenticación (`authMiddleware.ts`).
-   `/routes`: Define los endpoints de la API, sus verbos HTTP y las reglas de validación de entrada.
-   `/services`: Encapsula la lógica de negocio y la interacción con la base de datos.
-   `/controllers`: Orquesta el flujo de las peticiones, llamando a los servicios y manejando la respuesta HTTP.
-   `/types`: Contiene las interfaces de TypeScript que definen los modelos de datos (ej: `Country`, `Language`).
-   `index.ts`: Punto de entrada de la aplicación. Configura y arranca el servidor Express.

## 3. Patrones de Arquitectura Clave

La API está construida sobre varios patrones reutilizables que son fundamentales para su escalabilidad y mantenibilidad.

### 3.1. Patrón CRUD Genérico

Para evitar la duplicación de código, se utiliza una combinación de un servicio base y una factoría de controladores.

-   **`BaseService<T>`:** Una clase genérica que implementa toda la lógica CRUD común (`getAll`, `getById`, `create`, `update`, `remove`, y `removeMany`), incluyendo paginación, búsqueda y ordenación.
-   **`createCrudController<T>`:** Una función factoría que recibe una instancia de un servicio y devuelve un objeto con todos los controladores CRUD (`getAll`, `getById`, etc.) listos para ser usados en las rutas.

### 3.2. Patrón de Manejo de Errores Centralizado

Toda la lógica de respuesta a errores reside en `middleware/errorHandler.ts`. Los controladores lanzan errores semánticos (ej. `NotFoundError`) y el middleware se encarga de generar la respuesta HTTP correcta.

### 3.3. Patrón de Autenticación y Seguridad

La autenticación se basa en un sistema de **Access Tokens** y **Refresh Tokens**.

-   **Access Token (JWT):** Corta duración (2h), se envía en la cabecera `Authorization`.
-   **Refresh Token (JWT):** Larga duración (7d), se almacena en una **cookie `HttpOnly`**, lo que impide su acceso desde JavaScript. Se usa para generar nuevos Access Tokens de forma silenciosa.

### 3.4. Inicialización de la Base de Datos desde JSON
### 3.5. Seguridad Adicional: Bloqueo de Cuenta

-   **Descripción**: Para prevenir ataques de fuerza bruta, el sistema implementa un mecanismo de bloqueo de cuenta temporal.
-   **Reglas**:
    -   **Intentos Fallidos Máximos**: 5 (`MAX_FAILED_ATTEMPTS`).
    -   **Tiempo de Bloqueo**: 15 minutos (`LOCKOUT_TIME_MINUTES`).
-   **Funcionamiento**: Si un usuario introduce una contraseña incorrecta 5 veces seguidas, su cuenta se bloqueará y no podrá iniciar sesión durante 15 minutos. Cualquier intento de login durante este período devolverá un error `403 Forbidden` con el mensaje "Account is locked. Please try again in X minutes."

#### Desbloqueo Manual para Desarrollo

Durante el desarrollo y las pruebas, puede ser necesario desbloquear una cuenta manualmente. Para ello, se debe ejecutar la siguiente consulta SQL en la base de datos de autenticación (`backend/db/auth.db`):

```sql
UPDATE users
SET
  lockUntil = NULL,
  failedLoginAttempts = 0
WHERE
  email = 'tu-email@ejemplo.com';
```

### 3.4. Inicialización de la Base de Datos desde JSON

-   **Descripción:** El esquema y los datos iniciales de las bases de datos no se definen con sentencias `CREATE TABLE` en el código. En su lugar, al arrancar la aplicación, el sistema lee los archivos `db/db_export/countries-db-export.json` y `db/db_export/auth-db-export.json`.
-   **Proceso:**
    1.  Si el archivo `.db` no existe, se crea.
    2.  Se lee el archivo `.json` correspondiente.
    3.  Se ejecutan las sentencias DDL (`CREATE TABLE ...`) contenidas en el JSON.
    4.  Si la tabla recién creada está vacía, se puebla con los datos (`rows`) del JSON.
-   **Ventaja:** Permite gestionar el esquema y los datos iniciales de forma declarativa y versionable.

## 4. Endpoints de la API

La API expone endpoints CRUD estándar para las siguientes entidades:

-   `/api/countries`
-   `/api/continents`
-   `/api/languages`
-   `/api/users` (Administración)
-   ... y más.

### 4.1. Endpoints CRUD Comunes

Para cada entidad (ej. `countries`), se exponen los siguientes endpoints:

-   `GET /api/countries`: Devuelve una lista paginada de elementos.
-   `GET /api/countries/:id`: Devuelve un elemento por su ID.
-   `POST /api/countries`: Crea un nuevo elemento.
-   `PUT /api/countries/:id`: Actualiza un elemento existente.
-   `DELETE /api/countries/:id`: Elimina un elemento específico.
-   `DELETE /api/countries`: **Elimina múltiples elementos**. Requiere un body con un array de IDs: `{ "ids": ["1", "2", "3"] }`.

### 4.2. Parámetros de Consulta Comunes (para `GET /`)

-   `page`: Número de página (defecto: 1).
-   `pageSize`: Tamaño de la página (defecto: 10).
-   `orderBy`: Campo por el que ordenar (defecto: `id`).
-   `orderDir`: Dirección de ordenación (`asc` o `desc`, defecto: `asc`).
-   `search`: Término de búsqueda a aplicar en los campos definidos por defecto en el servicio.
-   `searchFields`: **(Opcional)** Un array o string de campos específicos en los que buscar. Permite al frontend anular los campos de búsqueda por defecto. Ejemplo: `?search=test&searchFields=name&searchFields=description`.

### 4.3. Endpoints de Autenticación (`/api/auth`)

-   `POST /register`: Registra un nuevo usuario.
-   `POST /login`: Autentica un usuario y devuelve un Access Token, estableciendo el Refresh Token en una cookie.
-   `POST /refresh-token`: Genera un nuevo Access Token usando el Refresh Token de la cookie.
-   `POST /logout`: Invalida el Refresh Token en la base de datos y limpia la cookie.
-   `GET /profile`: Devuelve el perfil del usuario autenticado.
-   `PUT /profile`: Actualiza el perfil del usuario.
-   `PUT /profile/password`: Cambia la contraseña del usuario.

### 4.4. Endpoints de Administración (`/api/users`)

Estas rutas están protegidas y solo accesibles para administradores.

-   `GET /api/users`: Lista todos los usuarios.
-   `DELETE /api/users/:id`: Elimina un usuario.
-   ... (CRUD completo para usuarios).

## 5. Cómo Ejecutar el Servidor

-   **Instalar dependencias:** `npm install`
-   **Modo desarrollo (con auto-recarga):** `npm run dev`
-   **Compilar para producción:** `npm run build`
-   **Iniciar en producción:** `npm start`
-   **Ejecutar tests:** `npm test`

<!-- File: d:\desarrollos\countries2\frontend\BACKEND_API_REFERENCE.md | Last Modified: 2025-10-19 -->

# Backend API - Visión General del Proyecto

Este documento sirve como una guía completa de la arquitectura, patrones y convenciones utilizadas en el backend de la aplicación. Su objetivo es documentar el estado actual del proyecto y actuar como un "prompt" de referencia para el desarrollo futuro, asegurando la consistencia y la calidad del código.

## 1. Stack Tecnológico

-   **Runtime:** Node.js
-   **Framework:** Express.js
-   **Lenguaje:** TypeScript
-   **Base de Datos:** `better-sqlite3` (SQLite)
-   **Manejo de Errores Asíncronos:** `express-async-handler`
-   **Validación de Peticiones:** `express-validator`
-   **Autenticación:** `jsonwebtoken` (JWT) para tokens, `bcryptjs` para hashing de contraseñas.
-   **Seguridad:** `express-rate-limit` para prevenir ataques de fuerza bruta, `cookie-parser` para gestionar cookies seguras.
-   **Logging:** `winston` y `winston-daily-rotate-file` para un registro de eventos robusto y con rotación de archivos.
-   **Peticiones HTTP:** `morgan` para el logging de peticiones, integrado con Winston.

## 2. Estructura del Proyecto

El backend sigue una arquitectura por capas, con una clara separación de responsabilidades:

-   `/config`: Contiene la configuración de servicios externos, como el logger (`logger.ts`).
-   `/db`: Contiene la configuración de la conexión a la base de datos (`database.ts`) y el fichero de la base de datos.
-   `/errors`: Define clases de error personalizadas (`HttpError`, `NotFoundError`, `ValidationError`) para un manejo semántico y centralizado.
-   `/middleware`: Contiene los middlewares de Express, como el manejador de errores (`errorHandler.ts`) y el de autenticación (`authMiddleware.ts`).
-   `/routes`: Define los endpoints de la API, sus verbos HTTP y las reglas de validación de entrada.
-   `/services`: Encapsula la lógica de negocio y la interacción con la base de datos.
-   `/controllers`: Orquesta el flujo de las peticiones, llamando a los servicios y manejando la respuesta HTTP.
-   `/types`: Contiene las interfaces de TypeScript que definen los modelos de datos (ej: `Country`, `Language`).
-   `index.ts`: Punto de entrada de la aplicación. Configura y arranca el servidor Express.

## 3. Patrones de Arquitectura Clave

La API está construida sobre dos patrones genéricos y reutilizables que son fundamentales para su escalabilidad y mantenibilidad.

### 3.1. Patrón CRUD Genérico

Para evitar la duplicación de código, se utiliza una combinación de un servicio base y una factoría de controladores, ambos completamente asíncronos.

-   **`BaseService<T>`:** Una clase genérica que implementa toda la lógica CRUD común (getAll, getById, create, update, remove), incluyendo paginación, búsqueda y ordenación.
-   **`createCrudController<T>`:** Una función factoría que recibe una instancia de un servicio, el nombre de la entidad y una función `sanitizer`. Devuelve un objeto con todos los controladores CRUD (`getAll`, `getById`, etc.) ya implementados y listos para ser usados en las rutas.

#### Cómo Añadir una Nueva Entidad (Ej: `regions`)

1.  **Crear el Tipo:** `backend/types/region.types.ts`
    ```typescript
    export interface Region { id: string; name: string; }
    ```
2.  **Crear el Servicio:** `backend/services/regionsService.ts`. El servicio hereda de `BaseService` y es un singleton.
    ```typescript
    import BaseService from './baseService.js';
    import type { Region } from '../types/region.types.js';

    class RegionsService extends BaseService<Region> {
      constructor() {
        super('regions', ['name']); // 1. Nombre de la tabla, 2. Campos de búsqueda
      }
    }
    export default new RegionsService();
    ```
3.  **Crear el Controlador:** `backend/controllers/regionsController.ts`. Se usa la factoría para generar los controladores.
    ```typescript
    import { createCrudController } from './baseController.js';
    import regionsService from '../services/regionsService.js';
    import type { Region } from '../types/region.types.js';

    // Función para limpiar y validar el body de la petición
    const sanitizeRegion = (body: any): Partial<Region> => ({ name: body.name });

    export const { 
      getAll: getAllRegions, 
      getById: getRegionById, 
      create: createRegion, 
      update: updateRegion, 
      delete: deleteRegion 
    } = createCrudController(regionsService, 'Region', sanitizeRegion);
    ```
4.  **Crear las Rutas:** `backend/routes/regions.ts`. Se definen los endpoints y se asocian los controladores y validaciones.
    ```typescript
    import { Router } from 'express';
    import { getAllRegions, getRegionById, createRegion, updateRegion, deleteRegion } from '../controllers/regionsController.js';
    import { body, param } from 'express-validator';
    
    const router = Router();
    router.get('/', getAllRegions);
    router.get('/:id', getRegionById);
    router.post('/', body('name').notEmpty(), createRegion);
    // ... resto de rutas
    export default router;
    ```
5.  **Registrar en `index.ts`:**
    ```typescript
    import regionsRouter from './routes/regions.js';
    app.use('/api/regions', regionsRouter);
    ```

### 3.2. Patrón de Manejo de Errores Centralizado

Toda la lógica de respuesta a errores reside en `middleware/errorHandler.ts`. Los controladores y servicios no usan bloques `try/catch` para errores HTTP, sino que **lanzan errores semánticos** definidos en `errors/httpErrors.ts`. El middleware `express-async-handler` captura estas excepciones y las delega al `errorHandler`.

-   `throw new NotFoundError('Recurso no encontrado')` -> El `errorHandler` lo convierte en una respuesta **404**.
-   `throw new ValidationError(errors.array())` -> El `errorHandler` lo convierte en una respuesta **400** con el detalle de los errores de validación.
-   `throw new AuthenticationError('Credenciales inválidas')` -> Respuesta **401**.
-   `throw new ForbiddenError('Acceso denegado')` -> Respuesta **403**.

### 3.3. Patrón de Autenticación y Seguridad

La autenticación se basa en un sistema de **Access Tokens** y **Refresh Tokens** para una mayor seguridad y una mejor experiencia de usuario.

-   **Access Token (JWT):**
    -   Corta duración (ej. 2 horas).
    -   Se envía en la cabecera `Authorization: Bearer <token>`.
    -   Se valida en rutas protegidas por el middleware `protect`.
-   **Refresh Token (JWT):**
    -   Larga duración (ej. 7 días).
    -   Se almacena en una **cookie `HttpOnly`**, lo que impide su acceso desde JavaScript en el cliente, mitigando ataques XSS.
    -   Se utiliza en el endpoint `/api/auth/refresh-token` para generar un nuevo Access Token sin que el usuario tenga que volver a iniciar sesión.
-   **Seguridad Adicional:**
    -   **Bloqueo de Cuentas:** Se implementa una política de bloqueo temporal de cuentas tras múltiples intentos de login fallidos para prevenir ataques de fuerza bruta.
    -   **Rate Limiting:** El endpoint de login está protegido con `express-rate-limit` para limitar el número de intentos desde una misma IP.
    -   **Auditoría:** Eventos críticos como cambios de rol o bloqueos de cuenta se registran usando un `auditLogService`.

## 4. Logging

Se utiliza `winston` para un sistema de logging avanzado y estructurado.

-   **Niveles de Log:** `error`, `warn`, `info`, `http`, `debug`.
-   **Transportes:**
    -   **Consola:** Logs coloridos y legibles en desarrollo.
    -   **Archivos:** Logs en formato JSON para producción, separados por nivel (`error.log`, `combined.log`).
-   **Rotación de Archivos:** Se usa `winston-daily-rotate-file` para rotar los logs diariamente, comprimir los antiguos y eliminarlos tras un periodo configurable (ej. 14 días).
-   **Integración con Morgan:** Las peticiones HTTP se capturan con `morgan` y se redirigen al stream de `winston`, centralizando todos los logs.

## 5. Endpoints de la API

La API expone endpoints CRUD estándar para las siguientes entidades:

-   `/api/countries`
-   `/api/continents`
-   `/api/languages`
-   `/api/areas`
-   `/api/dependencies`
-   `/api/multilingualnames`

### 5.1. Parámetros de Consulta Comunes (para `GET /`)

-   `page`: Número de página (defecto: 1).
-   `pageSize`: Tamaño de la página (defecto: 10).
-   `orderBy`: Campo por el que ordenar (defecto: `id`).
-   `orderDir`: Dirección de ordenación (`asc` o `desc`, defecto: `asc`).
-   `search`: Término de búsqueda a aplicar en los campos definidos en el servicio.

### 5.2. Endpoints de Autenticación (`/api/auth`)

-   `POST /register`: Registra un nuevo usuario.
-   `POST /login`: Autentica un usuario y devuelve un Access Token, estableciendo el Refresh Token en una cookie.
-   `GET /refresh-token`: Genera un nuevo Access Token usando el Refresh Token de la cookie.
-   `POST /logout`: Invalida el Refresh Token en la base de datos y limpia la cookie.
-   `GET /profile`: Devuelve el perfil del usuario autenticado.
-   `PUT /profile`: Actualiza el perfil del usuario.
-   `PUT /profile/password`: Cambia la contraseña del usuario.
-   `POST /forgot-password`: Inicia el proceso de recuperación de contraseña.
-   `PUT /reset-password/:token`: Finaliza el proceso de recuperación.

### 5.3. Endpoints de Administración (Protegidos)

-   `GET /api/auth/users`: Lista todos los usuarios.
-   `DELETE /api/auth/users/:id`: Elimina un usuario.
-   `PUT /api/auth/users/:id/role`: Cambia el rol de un usuario.
-   `GET /api/auth/audit-logs`: Obtiene los logs de auditoría.

## 6. Mejoras Futuras y Oportunidades

1.  **Gestión de Configuración:** Centralizar la carga y validación de variables de entorno (`.env`) en un único módulo de configuración para asegurar que la aplicación no se inicie si faltan variables críticas.
2.  **Migraciones de Base de Datos:** Implementar un sistema de migraciones (ej. usando una librería como `node-pg-migrate` adaptada o scripts SQL versionados) para gestionar los cambios de esquema de la base de datos de forma controlada y reversible.
3.  **Capa de Caché:** Reintroducir una capa de caché con **Redis** para los endpoints de lectura más frecuentes (ej. `GET /api/countries`). Esto reducirá la carga en la base de datos y mejorará drásticamente los tiempos de respuesta.
4.  **Testing:** Ampliar la cobertura de tests de integración para incluir las rutas de `login`, `profile` y las rutas protegidas por roles. Simular (mock) dependencias externas como `nodemailer` para que las pruebas no envíen correos reales.
5.  **Documentación de API (Swagger/OpenAPI):** Integrar `swagger-jsdoc` y `swagger-ui-express` para generar documentación interactiva de la API automáticamente a partir de los comentarios JSDoc en las rutas y controladores.

## 7. Cómo Ejecutar el Servidor

-   **Instalar dependencias:** `npm install`
-   **Modo desarrollo (con auto-recarga):** `npm run dev`
-   **Compilar para producción:** `npm run build`
-   **Iniciar en producción:** `npm start`
-   **Ejecutar tests:** `npm test`
# Backend API - Visión General del Proyecto

Este documento sirve como una guía completa de la arquitectura, patrones y convenciones utilizadas en el backend de la aplicación. Su objetivo es documentar el estado actual y actuar como un "prompt" de referencia para el desarrollo futuro.

## 1. Stack Tecnológico

-   **Runtime:** Node.js
-   **Framework:** Express.js
-   **Lenguaje:** TypeScript
-   **Base de Datos:** `better-sqlite3` para SQLite
-   **Manejo de Errores:** `express-async-handler`
-   **Validación:** `express-validator`
-   **Autenticación:** `jsonwebtoken` (JWT)

## 2. Estructura del Proyecto

El backend sigue una arquitectura por capas, con una clara separación de responsabilidades:

-   `/db`: Contiene la configuración de la conexión a la base de datos (`database.ts`) y el fichero de la base de datos.
-   `/errors`: Define clases de error personalizadas (`HttpError`, `NotFoundError`, `ValidationError`) para un manejo semántico y centralizado.
-   `/middleware`: Contiene los middlewares de Express, como el manejador de errores (`errorHandler.ts`) y el de autenticación (`auth.ts`).
-   `/routes`: Define los endpoints de la API, sus verbos HTTP y las reglas de validación de entrada.
-   `/services`: Encapsula la lógica de negocio y la interacción con la base de datos.
-   `/controllers`: Orquesta el flujo de las peticiones, llamando a los servicios y manejando la respuesta HTTP.
-   `/types`: Contiene las interfaces de TypeScript que definen los modelos de datos (ej: `Country`, `Language`).
-   `index.ts`: Punto de entrada de la aplicación. Configura y arranca el servidor Express.

## 3. Patrones de Arquitectura Clave

La API está construida sobre dos patrones genéricos y reutilizables que son fundamentales para su escalabilidad y mantenibilidad.

### 3.1. Patrón CRUD Genérico

Para evitar la duplicación de código, se utiliza una combinación de un servicio base y una factoría de controladores.

-   **`BaseService<T>`:** Una clase genérica que implementa toda la lógica CRUD común (getAll, getById, create, update, remove), incluyendo paginación, búsqueda y ordenación.
-   **`createCrudController<T>`:** Una función factoría que recibe una instancia de un servicio, el nombre de la entidad y una función `sanitizer`. Devuelve un objeto con todos los controladores CRUD (`getAll`, `getById`, etc.) ya implementados y listos para ser usados en las rutas.

#### Cómo Añadir una Nueva Entidad (Ej: `regions`)

1.  **Crear el Tipo:** `backend/types/region.types.ts`
    ```typescript
    export interface Region { id: string; name: string; }
    ```
2.  **Crear el Servicio:** `backend/services/regionsService.ts`
    ```typescript
    import BaseService from './baseService.js';
    import type { Region } from '../types/region.types.js';

    class RegionsService extends BaseService<Region> {
      constructor() {
        super('regions', ['name']); // Nombre de la tabla y campos de búsqueda
      }
    }
    export default new RegionsService();
    ```
3.  **Crear el Controlador:** `backend/controllers/regionsController.ts`
    ```typescript
    import { createCrudController } from './baseController.js';
    import regionsService from '../services/regionsService.js';
    import type { Region } from '../types/region.types.js';

    const sanitizeRegion = (body: any): Partial<Region> => { /* ... */ };
    export const { getAll, getById, create, update, delete: remove } = createCrudController(regionsService, 'Region', sanitizeRegion);
    ```
4.  **Crear las Rutas:** `backend/routes/regions.ts`
    ```typescript
    import { Router } from 'express';
    import { getAll, getById, create, update, remove } from '../controllers/regionsController.js';
    // ... definir router.get, router.post, etc. con sus validaciones
    export default router;
    ```
5.  **Registrar en `index.ts`:**
    ```typescript
    import regionsRouter from './routes/regions.js';
    app.use('/api/regions', regionsRouter);
    ```

### 3.2. Manejo de Errores Centralizado

Toda la lógica de respuesta a errores reside en `middleware/errorHandler.ts`. Los controladores no construyen respuestas de error, sino que **lanzan errores semánticos** definidos en `errors/httpErrors.ts`.

-   `throw new NotFoundError('Recurso no encontrado')` -> El `errorHandler` lo convierte en una respuesta **404**.
-   `throw new ValidationError(errors.array())` -> El `errorHandler` lo convierte en una respuesta **400** con el detalle de los errores de validación.

## 4. Endpoints de la API

La API expone endpoints CRUD estándar para las siguientes entidades:

-   `/api/countries`
-   `/api/continents`
-   `/api/languages`
-   `/api/areas`
-   `/api/dependencies`
-   `/api/multilingualnames`

### Parámetros de Consulta Comunes (para `GET /`)

-   `page`: Número de página (defecto: 1).
-   `pageSize`: Tamaño de la página (defecto: 10).
-   `sort`: Campo por el que ordenar (defecto: `id`).
-   `order`: Dirección de ordenación (`asc` o `desc`, defecto: `asc`).
-   `search`: Término de búsqueda a aplicar en los campos definidos en el servicio.

### Endpoints Especiales

-   `GET /api/countries/:id/translations`: Devuelve todas las traducciones asociadas a un país específico.

## 5. Autenticación

Se ha implementado un middleware de autenticación (`middleware/auth.ts`) basado en **JWT**. Este middleware verifica la presencia y validez de un token `Bearer` en la cabecera `Authorization`.

**Para proteger un endpoint**, se debe añadir el `authMiddleware` en la definición de la ruta, antes del controlador.

**Próximos pasos:**
1.  Configurar la variable de entorno `JWT_SECRET`.
2.  Crear los endpoints `/api/auth/login` y `/api/auth/register` para generar los tokens.

## 6. Cómo Ejecutar el Servidor

-   **Instalar dependencias:** `npm install`
-   **Modo desarrollo (con auto-recarga):** `npm run dev`
-   **Compilar para producción:** `npm run build`
-   **Iniciar en producción:** `npm start`
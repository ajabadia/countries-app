<!-- File: d:\desarrollos\countries2\documentación\ONBOARDING.md | Last Modified: 2025-10-28 -->

# Guía de Inicio Rápido para Nuevos Desarrolladores

¡Bienvenido al proyecto `countries2`! Esta guía te ayudará a configurar tu entorno de desarrollo y a entender los conceptos clave de nuestra arquitectura para que puedas empezar a contribuir rápidamente.

---

## 1. Requisitos Previos

Asegúrate de tener instalado el siguiente software en tu máquina:

-   **Node.js**: Versión 18.x o superior.
-   **npm**: Se instala automáticamente con Node.js.
-   **Git**: Para el control de versiones.
-   **Editor de Código**: Se recomienda **Visual Studio Code**.

---

## 2. Puesta en Marcha (Getting Started)

Sigue estos pasos para tener el proyecto funcionando en tu máquina local:

1.  **Clonar el Repositorio**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd countries2
    ```

2.  **Instalar Dependencias**
    Desde el directorio raíz del proyecto, ejecuta el siguiente comando. Esto instalará las dependencias tanto para el frontend como para el backend.
    ```bash
    npm install
    ```

3.  **Iniciar los Servidores de Desarrollo**
    Este es el único comando que necesitas para trabajar. Lanza simultáneamente el frontend y el backend en modo de desarrollo con recarga automática.
    ```bash
    npm run dev
    ```

4.  **Acceder a la Aplicación**
    -   **Frontend**: Abre tu navegador y ve a `http://localhost:4200`
    -   **Backend**: La API estará disponible en `http://localhost:3000`

---

## 3. Arquitectura del Proyecto: Un Vistazo Rápido

El proyecto está dividido en dos partes principales:

### Backend
-   **Stack**: Node.js, Express, TypeScript.
-   **Arquitectura**: Una API RESTful construida sobre un **patrón CRUD genérico** (`BaseService` + `createCrudController`) que permite crear nuevos endpoints con un mínimo de código.
-   **Seguridad**: Utiliza un sistema de autenticación robusto con **Access y Refresh Tokens** almacenados en cookies `HttpOnly`.

### Frontend
-   **Stack**: Angular (Standalone Components, Signals, RxJS).
-   **Arquitectura**: Una SPA modular (`core`, `features`, `shared`) con un patrón de páginas de administración altamente reutilizable.

---

## 4. Conceptos Clave que Debes Entender

Para ser productivo, es crucial que entiendas estos dos patrones:

### 4.1. El Patrón de Páginas de Administración (Frontend)

Es el corazón de nuestra arquitectura de UI. En lugar de duplicar código, las páginas CRUD se construyen combinando tres piezas:

1.  **`BaseAdminPageComponent`**: Una clase base que contiene **toda la lógica** (manejo de modales, guardado, borrado).
2.  **`UiAdminPageLayoutComponent`**: Un componente "tonto" que renderiza **toda la vista** (tabla, paginador, etc.).
3.  **`AdminPageManager`**: Una clase de utilidad que gestiona **todo el estado de los datos** (paginación, búsqueda, ordenación).

**Impacto**: Crear una nueva página de administración es ahora una tarea de **configuración**, no de desarrollo. Simplemente heredas de la clase base, defines tus columnas y campos, y usas el componente de layout en la plantilla.

### 4.2. `ActionService` (Frontend)

Este servicio es la **única fuente de la verdad** para todas las acciones de la UI (menús, botones de la barra de herramientas).

-   **Cómo funciona**: En lugar de que un componente decida qué botones mostrar, simplemente le pide al `ActionService` las acciones para un contexto determinado (ej. "dame las acciones para la barra de herramientas de administración").
-   **Beneficio**: Desacopla la lógica de la presentación y centraliza la configuración de la UI.

---

## 5. Documentación Esencial (Tu Hoja de Ruta)

Antes de escribir código, dedica tiempo a leer estos documentos. Te ahorrarán horas de depuración.

1.  **`README.md` (Raíz del proyecto)**: Visión general y scripts.
2.  **`documentación/WORKING_GUIDELINES.md`**: **¡Lectura obligatoria!** Contiene todas nuestras convenciones de código.
3.  **`documentación/FRONTEND_ARCHITECTURE_GUIDE.md`**: Explica en detalle la estructura del frontend.
4.  **`documentación/BACKEND_API_GUIDE.md`**: Referencia completa de la API del backend.
5.  **`documentación/LESSONS_LEARNED.md`**: Aprende de los errores y decisiones clave que hemos tomado.

---

## 6. Tus Primeros Pasos

1.  Sigue la guía de "Puesta en Marcha" y asegúrate de que puedes ejecutar el proyecto.
2.  Lee la documentación esencial listada arriba.
3.  Navega por la aplicación, inicia sesión y explora las diferentes páginas de administración.
4.  Intenta crear una nueva página de administración para una entidad simple. ¡Es la mejor manera de entender la arquitectura!

¡Bienvenido al equipo!<!-- File: d:\desarrollos\countries2\documentación\ONBOARDING.md | Last Modified: 2025-10-28 -->

# Guía de Inicio Rápido para Nuevos Desarrolladores

¡Bienvenido al proyecto `countries2`! Esta guía te ayudará a configurar tu entorno de desarrollo y a entender los conceptos clave de nuestra arquitectura para que puedas empezar a contribuir rápidamente.

---

## 1. Requisitos Previos

Asegúrate de tener instalado el siguiente software en tu máquina:

-   **Node.js**: Versión 18.x o superior.
-   **npm**: Se instala automáticamente con Node.js.
-   **Git**: Para el control de versiones.
-   **Editor de Código**: Se recomienda **Visual Studio Code**.

---

## 2. Puesta en Marcha (Getting Started)

Sigue estos pasos para tener el proyecto funcionando en tu máquina local:

1.  **Clonar el Repositorio**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd countries2
    ```

2.  **Instalar Dependencias**
    Desde el directorio raíz del proyecto, ejecuta el siguiente comando. Esto instalará las dependencias tanto para el frontend como para el backend.
    ```bash
    npm install
    ```

3.  **Iniciar los Servidores de Desarrollo**
    Este es el único comando que necesitas para trabajar. Lanza simultáneamente el frontend y el backend en modo de desarrollo con recarga automática.
    ```bash
    npm run dev
    ```

4.  **Acceder a la Aplicación**
    -   **Frontend**: Abre tu navegador y ve a `http://localhost:4200`
    -   **Backend**: La API estará disponible en `http://localhost:3000`

---

## 3. Arquitectura del Proyecto: Un Vistazo Rápido

El proyecto está dividido en dos partes principales:

### Backend
-   **Stack**: Node.js, Express, TypeScript.
-   **Arquitectura**: Una API RESTful construida sobre un **patrón CRUD genérico** (`BaseService` + `createCrudController`) que permite crear nuevos endpoints con un mínimo de código.
-   **Seguridad**: Utiliza un sistema de autenticación robusto con **Access y Refresh Tokens** almacenados en cookies `HttpOnly`.

### Frontend
-   **Stack**: Angular (Standalone Components, Signals, RxJS).
-   **Arquitectura**: Una SPA modular (`core`, `features`, `shared`) con un patrón de páginas de administración altamente reutilizable.

---

## 4. Conceptos Clave que Debes Entender

Para ser productivo, es crucial que entiendas estos dos patrones:

### 4.1. El Patrón de Páginas de Administración (Frontend)

Es el corazón de nuestra arquitectura de UI. En lugar de duplicar código, las páginas CRUD se construyen combinando tres piezas:

1.  **`BaseAdminPageComponent`**: Una clase base que contiene **toda la lógica** (manejo de modales, guardado, borrado).
2.  **`UiAdminPageLayoutComponent`**: Un componente "tonto" que renderiza **toda la vista** (tabla, paginador, etc.).
3.  **`AdminPageManager`**: Una clase de utilidad que gestiona **todo el estado de los datos** (paginación, búsqueda, ordenación).

**Impacto**: Crear una nueva página de administración es ahora una tarea de **configuración**, no de desarrollo. Simplemente heredas de la clase base, defines tus columnas y campos, y usas el componente de layout en la plantilla.

### 4.2. `ActionService` (Frontend)

Este servicio es la **única fuente de la verdad** para todas las acciones de la UI (menús, botones de la barra de herramientas).

-   **Cómo funciona**: En lugar de que un componente decida qué botones mostrar, simplemente le pide al `ActionService` las acciones para un contexto determinado (ej. "dame las acciones para la barra de herramientas de administración").
-   **Beneficio**: Desacopla la lógica de la presentación y centraliza la configuración de la UI.

---

## 5. Documentación Esencial (Tu Hoja de Ruta)

Antes de escribir código, dedica tiempo a leer estos documentos. Te ahorrarán horas de depuración.

1.  **`README.md` (Raíz del proyecto)**: Visión general y scripts.
2.  **`documentación/WORKING_GUIDELINES.md`**: **¡Lectura obligatoria!** Contiene todas nuestras convenciones de código.
3.  **`documentación/FRONTEND_ARCHITECTURE_GUIDE.md`**: Explica en detalle la estructura del frontend.
4.  **`documentación/BACKEND_API_GUIDE.md`**: Referencia completa de la API del backend.
5.  **`documentación/LESSONS_LEARNED.md`**: Aprende de los errores y decisiones clave que hemos tomado.

---

## 6. Tus Primeros Pasos

1.  Sigue la guía de "Puesta en Marcha" y asegúrate de que puedes ejecutar el proyecto.
2.  Lee la documentación esencial listada arriba.
3.  Navega por la aplicación, inicia sesión y explora las diferentes páginas de administración.
4.  Intenta crear una nueva página de administración para una entidad simple. ¡Es la mejor manera de entender la arquitectura!

¡Bienvenido al equipo!

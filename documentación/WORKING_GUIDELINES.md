<!-- File: d:\desarrollos\countries2\frontend\WORKING_GUIDELINES.md | Last Modified: 2025-10-19 -->

# Directrices de Trabajo y Convenciones del Proyecto

Este documento es la **fuente única de verdad** para todas las reglas, convenciones y buenas prácticas del frontend. Su cumplimiento es obligatorio para mantener la consistencia, calidad y mantenibilidad del código.

## 1. Principios Fundamentales

### 1.1. Principio DRY (Don't Repeat Yourself)

Evitar la duplicación de código es una prioridad máxima. Busca siempre abstraer la lógica, componentes o estilos reutilizables en el directorio `/shared`.

### 1.2. Uso de Código de Referencia

El código proveniente de otros proyectos debe ser tratado como una **referencia funcional**, no como una implementación final. Se espera que dicho código sea analizado, refactorizado y mejorado para alinearlo con la arquitectura y las directrices de este proyecto.

## 2. Gestión de Archivos y Documentación

### 2.1. Cabecera de Archivo Obligatoria

Cada archivo que sea creado o modificado **debe** incluir como primera línea una cabecera que indique su ruta completa y la fecha y hora de su última modificación.

-   **Formato para `.md`, `.html`**: `<!-- File: [ruta completa] | Last Modified: YYYY-MM-DD HH:MM:SS -->`
-   **Formato para `.ts`, `.scss`**: `// File: [ruta completa] | Last Modified: YYYY-MM-DD HH:MM:SS`

### 2.2. Nomenclatura de Archivos

-   Los nombres de archivo deben usar `kebab-case` (ej. `ui-button.component.ts`).
-   La documentación de un componente o directorio debe llamarse `README.md`.

### 2.3. Documentación de Componentes Reutilizables

Cada componente reutilizable dentro del directorio `src/app/shared/components` **debe** tener su propio archivo `README.md`. Este documento explicará el propósito del componente, su API pública (`@Input` y `@Output`) y proporcionará ejemplos de uso.

### 2.4. Comentarios en el Código

Todo código nuevo o modificado que no sea auto-explicativo debe ser convenientemente comentado. El objetivo es aclarar el ***porqué*** de una implementación, no el *qué*.

### 2.5. Registro de Cambios

Cualquier cambio significativo en el código o la estructura del proyecto debe ser registrado en el archivo `FRONTEND_PROGRESS_LOG.md`. Cada entrada debe tener un título descriptivo, la fecha y una descripción clara de la acción realizada y su propósito.

## 3. Convenciones de Estilos (SCSS)

### 3.1. Metodología BEM

Para la escritura de CSS/SCSS, se debe seguir la metodología BEM (Block, Element, Modifier) para crear estilos modulares, específicos y fáciles de mantener.

-   **Bloque**: El componente raíz (ej. `.ui-button`).
-   **Elemento**: Una parte del bloque (ej. `.ui-button__icon`).
-   **Modificador**: Una variante del bloque (ej. `.ui-button--primary`, `.ui-button--loading`).

### 3.2. Uso de Variables CSS para Theming

Está **estrictamente prohibido** usar valores de color "hardcodeados" (ej. `#FFFFFF`, `black`) o variables SASS (`$mi-color`) para colores en los estilos de los componentes.

-   **Siempre** se deben usar las variables CSS definidas en `src/styles/_variables.scss` (ej. `color: var(--color-primary);`).
-   Esto asegura que los componentes respondan correctamente a los cambios de tema (ej. tema oscuro).

### 3.3. Preferir `Mixins` sobre `@extend`

Para reutilizar bloques de estilos, se debe preferir el uso de `@mixin` en lugar de `@extend`. Los `mixins` ofrecen un mayor control sobre el CSS generado y evitan la creación de selectores complejos y con alta especificidad, lo que mejora la mantenibilidad.

## 4. Convenciones de Angular

-   **Componentes Standalone**: Todos los nuevos componentes, directivas y pipes deben ser `standalone` (`standalone: true`).
-   **Change Detection OnPush**: Para optimizar el rendimiento, todos los componentes deben usar la estrategia de detección de cambios `ChangeDetectionStrategy.OnPush`.
-   **Alias de Ruta**: Utilizar siempre los alias de `tsconfig.json` (`@shared`, `@core`, `@features`) para las importaciones, en lugar de rutas relativas (`../../`).

### 4.1. API de Componentes Compartidos

La API pública de los componentes reutilizables (`/shared`) debe ser explícita y prefijada para evitar colisiones de nombres en las plantillas.

-   **@Input**: Deben usar un alias con el prefijo del componente.
    -   Ejemplo: `@Input({ alias: 'uiButtonVariant' }) variant: ButtonVariant = 'default';`
    -   Uso: `<button app-ui-button [uiButtonVariant]="'primary'"></button>`
-   **@Output**: Deben usar un alias con el prefijo del componente.
    -   Ejemplo: `@Output('uiButtonClick') clickEvent = new EventEmitter<void>();`
    -   Uso: `<button app-ui-button (uiButtonClick)="onClick()"></button>`

### 4.2. Gestión de Estado: Signals vs. RxJS

La gestión de estado reactivo se rige por las siguientes normas:

-   **Signals**: Es la opción **preferida y por defecto** para gestionar el estado dentro de los componentes. Úsalos para cualquier valor que pueda cambiar y deba reflejarse en la vista.
-   **RxJS**: Se reserva para la gestión de **flujos de eventos asíncronos complejos**. Su uso principal es en los servicios para manejar peticiones HTTP y en componentes para orquestar eventos de UI (ej. `debounceTime` en un campo de búsqueda).

### 4.3. Accesibilidad (a11y)

### 4.3. Patrón para Páginas de Administración (CRUD)

Se ha establecido un patrón de **herencia** como el estándar para las páginas de administración.

1.  **Clase Base `BaseAdminPageComponent`**: Todos los componentes de administración (ej. `CountriesAdminComponent`) **deben** heredar de `BaseAdminPageComponent`.
2.  **Implementación del Contrato**: El componente hijo debe implementar todas las propiedades `abstract` de la clase base (`pageTitle`, `service`, `columns`, `form`).
   - **Actualización**: El componente hijo ya no implementa `form` directamente, sino que debe implementar `formFields: FormField[]`, que es un array de configuración a partir del cual la clase base construye el `FormGroup`.
3.  **Lógica Centralizada**: La clase base se encarga de instanciar el `AdminPageManager` y de toda la lógica común de la UI (gestión de modales, acciones de guardado/borrado, configuración de la barra de herramientas). El componente hijo no debe contener esta lógica.
4.  **Plantilla Propia**: Cada componente hijo es responsable de su propia plantilla HTML y de importar los componentes de UI que necesite (`UiTableComponent`, `UiPaginatorComponent`, etc.).

### 4.4. Accesibilidad (a11y)

La accesibilidad es un requisito no negociable.

-   Todos los elementos interactivos (botones, enlaces) deben ser accesibles por teclado.
-   Los elementos no semánticos con eventos de click (ej. `(click)` en un `<div>`) deben tener un `role="button"` y un `tabindex="0"`.
-   Las imágenes deben tener un atributo `alt` descriptivo.
-   Los controles de formulario deben estar asociados a una etiqueta (`<label>`).

## 5. Arquitectura de la Aplicación

### 5.1. Estructura de Directorios

La aplicación se organiza en tres directorios principales, tal y como se detalla en `FRONTEND_ARCHITECTURE.md`:

-   `core`: Servicios singleton, guardias e interceptores.
-   `features`: Módulos de negocio y páginas de la aplicación.
-   `shared`: Componentes, directivas y servicios reutilizables.

### 5.2. Patrón `ActionService`

El `ActionService` (`@core/services`) es la **única fuente de la verdad** para las acciones de la UI (botones de la barra de herramientas, enlaces de menús, etc.).
-   **Lógica Centralizada**: Los componentes de página (en `features`) son responsables de definir y registrar las acciones que necesitan en el `ActionService`.
-   **Componentes de UI "Tontos"**: Los componentes de UI (como `UiToolbarButtonsComponent` o `UiHamburgerMenuComponent`) consumen las acciones del `ActionService` y se limitan a renderizarlas. No deben contener lógica sobre qué acciones mostrar.

## 6. Proceso de Desarrollo y Colaboración

### 6.1. Flujo de Trabajo

Se sigue un flujo de "Diagnóstico y Ejecución Iterativa" para asegurar la precisión y el control sobre los cambios, tal y como se detalla en el `gemini.md` principal.

### 6.2. Lecciones Aprendidas

Tras resolver un bug complejo o finalizar una refactorización significativa, los aprendizajes clave deben ser documentados en `LESSONS_LEARNED.md` para fomentar la mejora continua.
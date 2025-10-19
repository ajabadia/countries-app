<!-- File: d:\desarrollos\countries2\frontend\WORKING_GUIDELINES.md | Last Modified: 2025-10-19 -->

# Directrices de Trabajo y Convenciones del Proyecto

Este documento centraliza todas las reglas, convenciones y buenas prácticas que deben seguirse durante el desarrollo de este proyecto. El objetivo es mantener la consistencia, calidad y mantenibilidad del código.

## 1. Gestión de Archivos

### 1.1. Cabecera de Archivo Obligatoria

Cada archivo que sea creado o modificado **debe** incluir como primera línea una cabecera que indique su ruta completa y la fecha y hora de su última modificación.

-   **Formato para `.md`, `.html`**: `<!-- File: [ruta completa] | Last Modified: YYYY-MM-DD HH:MM:SS -->`
-   **Formato para `.ts`, `.scss`**: `// File: [ruta completa] | Last Modified: YYYY-MM-DD HH:MM:SS`

### 1.2. Nomenclatura de Archivos

-   Los nombres de archivo deben usar `kebab-case` (ej. `ui-button.component.ts`).
-   La documentación de un componente o directorio debe llamarse `README.md`.

## 2. Desarrollo de Código

### 2.1. Comentarios en el Código

Todo código nuevo o modificado que no sea auto-explicativo debe ser convenientemente comentado. El objetivo es aclarar el *porqué* de una implementación, no el *qué*.

### 2.2. Principio DRY (Don't Repeat Yourself)

Evitar la duplicación de código es una prioridad. Busca siempre abstraer la lógica, componentes o estilos reutilizables en el directorio `/shared`.

### 2.3. Estilos con BEM

Para la escritura de CSS/SCSS, se debe seguir la metodología BEM (Block, Element, Modifier) para crear estilos modulares, específicos y fáciles de mantener.

-   **Bloque**: El componente raíz (ej. `.ui-button`).
-   **Elemento**: Una parte del bloque (ej. `.ui-button__icon`).
-   **Modificador**: Una variante del bloque (ej. `.ui-button--primary`, `.ui-button--loading`).

### 2.4. Uso de Estilos y Colores

-   **Reutilizar Estilos Generales**: Antes de escribir nuevos estilos, verificar si ya existen estilos o variables globales que cumplan la misma función.
-   **No Hardcodear Colores**: Nunca se deben usar colores directamente en los archivos de estilos de los componentes (ej. `#FFFFFF`, `black`). Siempre se debe usar una variable CSS del sistema de diseño (ej. `var(--color-surface)`, `var(--color-text-primary)`). La única excepción es la definición de estos colores en los archivos de variables globales.

### 2.5. Uso de Código de Referencia

Cuando se proporciona código de un proyecto anterior, debe ser tratado como una **referencia funcional**, no como una implementación final. Se espera que el código sea analizado, refactorizado y mejorado para alinearlo con la arquitectura y las buenas prácticas de este proyecto.

## 3. Convenciones de Angular

Se deben seguir las siguientes buenas prácticas ya establecidas en el proyecto:

-   **Componentes Standalone**: Todos los nuevos componentes, directivas y pipes deben ser `standalone` (`standalone: true`).
-   **Change Detection OnPush**: Para optimizar el rendimiento, todos los componentes deben usar la estrategia de detección de cambios `ChangeDetectionStrategy.OnPush`.
-   **API de Componentes Prefijada**: Los `@Input` de los componentes reutilizables deben usar un alias con un prefijo que identifique al componente para evitar colisiones y mejorar la legibilidad (ej. `[ui-button-color]`, `[ui-icon-name]`).
-   **Alias de Ruta**: Utilizar siempre los alias de `tsconfig.json` (`@shared`, `@core`, `@features`) para las importaciones, en lugar de rutas relativas (`../../`).

## 4. Registro de Cambios

Cualquier cambio significativo en el código o la estructura del proyecto debe ser registrado en el archivo `FRONTEND_PROGRESS_LOG.md`.

-   Cada entrada debe tener un título descriptivo, la fecha y hora del cambio, y una descripción clara de la acción realizada y su propósito.

## 5. Estrategia de Interacción y Desarrollo

### 5.1. Flujo Estándar: Diagnóstico y Ejecución Iterativa

Se sigue un flujo de trabajo de "Diagnóstico y Ejecución Iterativa" para asegurar la precisión y el control sobre los cambios.

1.  **Diagnóstico Completo**: Analizar todos los errores y el contexto proporcionado para entender la causa raíz de un problema.
2.  **Planificación Obligatoria**: Antes de aplicar cualquier cambio, se debe presentar un plan de acción conciso y numerado. No se debe ejecutar ningún código en este paso.
3.  **Ejecución Fragmentada con Aprobación**: Tras la aprobación del plan, se debe solicitar autorización para proceder con cada punto del plan, uno por uno.
4.  **Límite de Cambios**: Cada paso de ejecución debe proponer un cambio que no exceda las 50 líneas de código modificadas para facilitar la revisión. Si un cambio es mayor, debe ser subdividido.

### 5.2. Excepción: Modo Autónomo

En situaciones donde se requiera una alta velocidad de ejecución para una tarea concreta, el usuario puede conceder una **excepción de modo autónomo**.

-   Al recibir esta excepción, el agente debe preguntar por su **duración** (ej. "2 horas").
-   Durante este periodo, el agente puede ejecutar un plan de acción completo sin necesidad de solicitar aprobación para cada paso intermedio.
-   Al finalizar la tarea o el tiempo concedido, el agente debe intentar compilar y verificar su trabajo, corrigiendo los errores que surjan de sus propias modificaciones de forma autónoma.
-   Una vez completado el ciclo, el agente volverá al modo de operación estándar.

### 5.3. Ciclo de Retroalimentación con Lecciones Aprendidas

Para asegurar que el conocimiento adquirido se retiene y se aplica, se seguirá el siguiente ciclo al abordar errores:

1.  **Consultar Lecciones Previas**: Antes de iniciar la corrección de un nuevo conjunto de errores, se debe consultar el fichero `LESSONS_LEARNED.md` para aplicar aprendizajes de situaciones pasadas.
2.  **Corregir Errores**: Aplicar el flujo de trabajo estándar (o el modo autónomo si está activo) para solucionar los problemas.
3.  **Documentar Nuevas Lecciones**: Tras resolver los errores, si se han obtenido nuevas conclusiones sobre la arquitectura, las herramientas o las convenciones del proyecto, estas deben añadirse a `LESSONS_LEARNED.md`.

## 6. Registro de Lecciones Aprendidas

Para fomentar la mejora continua y la transferencia de conocimiento, se establece un proceso para documentar las lecciones aprendidas.

-   Tras la resolución de un bug complejo, la finalización de una refactorización significativa o una sesión de auditoría, se deben destilar las conclusiones y los aprendizajes clave.
-   Estos aprendizajes se registrarán en el fichero `LESSONS_LEARNED.md`, explicando el problema, la solución y la conclusión o buena práctica a reforzar en el futuro.
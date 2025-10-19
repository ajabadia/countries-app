<!-- File: d:\desarrollos\countries2\frontend\LESSONS_LEARNED.md | Last Modified: 2025-10-19 -->

# Lecciones Aprendidas del Proyecto

Este documento resume las conclusiones y lecciones clave obtenidas durante el desarrollo para fomentar la mejora continua y evitar errores recurrentes.

---

## Proceso y Herramientas

### 1. La Configuración del Linter debe Servir a las Convenciones, no al Revés

La lección más importante fue el conflicto entre las reglas por defecto de ESLint para Angular y las directrices establecidas en `WORKING_GUIDELINES.md`. Las reglas del linter (como `no-input-rename`) contradecían directamente la convención de usar prefijos en los alias de los `@Input`.

-   **Conclusión**: Es fundamental adaptar la configuración de las herramientas de linting (`.eslintrc.json`) para que se alineen con las decisiones de arquitectura del proyecto. Forzar el cambio del código para satisfacer al linter habría implicado una refactorización masiva e innecesaria que violaba una directriz explícita.

### 2. Auditar la Estructura Existente Antes de Proponer Cambios Globales

Al intentar implementar un nuevo sistema de diseño, se ignoró la arquitectura de estilos existente en `src/styles/` y se creó una nueva en `src/assets/styles/`, sobrescribiendo el punto de entrada `src/styles.scss`. Esto causó una regresión y la pérdida del trabajo previo.

-   **Conclusión**: Antes de realizar cambios que afecten a toda la aplicación (como la estructura de estilos, el enrutamiento o la configuración), es imperativo realizar una auditoría completa de la estructura existente. No se puede asumir que una parte del proyecto es simple o inexistente solo porque no se ha interactuado con ella previamente. El contexto proporcionado debe ser analizado en su totalidad.

---

## Arquitectura y Calidad de Código

### 3. La Auditoría Revela Inconsistencias Silenciosas

El código contenía varias desviaciones de las directrices que no rompían la compilación, pero generaban deuda técnica: componentes sin `ChangeDetectionStrategy.OnPush`, uso de colores hardcodeados, etc.

-   **Conclusión**: Las auditorías proactivas y la validación mediante un linter bien configurado son cruciales para mantener la coherencia y la calidad del código a largo plazo.

### 4. Las Dependencias Implícitas No Son Visibles a Simple Vista

La búsqueda inicial de usos del componente `<app-ui-form-modal>` no arrojó resultados. Solo tras analizar la directiva `BaseAdminDirective.ts` se pudo entender que la directiva provee la lógica, pero es un futuro componente (aún no creado) el que debe implementar la plantilla HTML que usa el modal.

-   **Conclusión**: No se puede asumir que un componente no se usa solo porque una búsqueda de texto en las plantillas no dé resultados. Es necesario entender la arquitectura y cómo las diferentes partes (especialmente directivas y componentes) se interconectan.

### 5. La Accesibilidad (a11y) Requiere Atención Deliberada

El linter detectó problemas de accesibilidad en el modal (`ui-form-modal`) que se habían pasado por alto: un elemento con evento de `(click)` no era accesible por teclado.

-   **Conclusión**: La accesibilidad no es automática. Las reglas de linting enfocadas en accesibilidad (`@angular-eslint/template/accessibility`) son una red de seguridad indispensable para crear interfaces usables por todos.

---

## Convenciones Específicas de Angular

### 6. La Sintaxis de Alias para `@Input` y `@Output` es Diferente

Durante la refactorización para aplicar la API prefijada, se cometió un error al asumir que la sintaxis para crear un alias era la misma para los `@Input` y los `@Output`.

-   **`@Input`**: Acepta un objeto de configuración: `@Input({ alias: 'prefijo-nombre' })`.
-   **`@Output`**: Acepta el alias como un `string` directamente: `@Output('prefijo-nombre')`.

-   **Conclusión**: Confundir esta sintaxis resulta en un error de compilación (`NG1010`). Es un detalle importante de la API de Angular que debe tenerse en cuenta al refactorizar o crear componentes con APIs públicas.

### 7. La Sintaxis de `Signals` en las Plantillas es Crucial

Durante la implementación del `UiHamburgerMenuComponent`, se produjo un error de compilación (`NG8002`) que impedía el binding de datos. La causa fue intentar acceder a un `computed signal` como si fuera una propiedad (`[items]="accordionItems"`) en lugar de invocarlo como una función (`[items]="accordionItems()"`).

-   **Conclusión**: A diferencia de las propiedades de clase o los observables con el pipe `async`, los `signals` (tanto `signal` como `computed`) deben ser **invocados como funciones** cuando se leen sus valores dentro de las plantillas HTML.

### 8. Entender la API de Proyección de Contenido (`ng-template`)

La integración entre `UiHamburgerMenuComponent` y `UiAccordionComponent` falló inicialmente con errores `TS2322` y `NG8002`. El problema radicaba en un intento de pasar una plantilla (`ng-template`) a través de un `@Input` directamente en el HTML. La API del `UiAccordionComponent` estaba diseñada para recibir la referencia a la plantilla a través de la lógica del componente (`.ts`) usando `@ViewChild`.

-   **Conclusión**: No se puede asumir cómo funciona la API de un componente, especialmente con patrones complejos como la proyección de contenido con `ng-template`. Es fundamental **consultar la documentación del componente (`README.md`)** para entender si la API espera un binding directo en la plantilla o una referencia programática desde la clase del componente.
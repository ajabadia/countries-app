<!-- File: d:\desarrollos\countries2\frontend\LESSONS_LEARNED.md | Last Modified: 2025-10-19 -->

# Lecciones Aprendidas Durante la Auditoría y Corrección

Este documento resume las conclusiones y lecciones clave obtenidas durante la auditoría de código y la configuración del linter del 19 de octubre de 2025.

---

### 1. La configuración del Linter debe servir a las Convenciones, no al revés

La lección más importante fue el conflicto entre las reglas por defecto de ESLint para Angular y las directrices establecidas en `WORKING_GUIDELINES.md`. Las reglas del linter (como `no-input-rename`) contradecían directamente la convención de usar prefijos en los alias de los `@Input`.

-   **Conclusión**: Es fundamental adaptar la configuración de las herramientas de linting (`.eslintrc.json`) para que se alineen con las decisiones de arquitectura del proyecto. Forzar el cambio del código para satisfacer al linter habría implicado una refactorización masiva e innecesaria que violaba una directriz explícita.

---

### 2. La Auditoría Reveló Inconsistencias Silenciosas

El código contenía varias desviaciones de las directrices que no rompían la compilación, pero generaban deuda técnica:

-   Componentes sin `ChangeDetectionStrategy.OnPush`.
-   Uso de colores hardcodeados en lugar de variables CSS.
-   Uso de variables SASS (`$variable`) en lugar de variables CSS (`var(--variable)`), contrario a la arquitectura de theming.

-   **Conclusión**: Las auditorías proactivas y la validación mediante un linter bien configurado son cruciales para mantener la coherencia y la calidad del código a largo plazo.

---

### 3. La Accesibilidad (a11y) Requiere Atención Deliberada

El linter detectó problemas de accesibilidad en el modal (`ui-form-modal`) que se habían pasado por alto: un elemento con evento de `(click)` no era accesible por teclado.

-   **Conclusión**: La accesibilidad no es automática. Las reglas de linting enfocadas en accesibilidad (`@angular-eslint/template/accessibility`) son una red de seguridad indispensable para crear interfaces usables por todos.

---

### 4. Las Dependencias Implícitas No Son Visibles a Simple Vista

La búsqueda inicial de usos del componente `<app-ui-form-modal>` no arrojó resultados. Solo tras analizar la directiva `BaseAdminDirective.ts` se pudo entender que la directiva provee la lógica, pero es un futuro componente (aún no creado) el que debe implementar la plantilla HTML que usa el modal.

-   **Conclusión**: No se puede asumir que un componente no se usa solo porque una búsqueda de texto en las plantillas no dé resultados. Es necesario entender la arquitectura y cómo las diferentes partes (especialmente directivas y componentes) se interconectan.

---

### 5. La Sintaxis de Alias para `@Input` y `@Output` es Diferente

Durante la refactorización para aplicar la API prefijada, se cometió un error al asumir que la sintaxis para crear un alias era la misma para los `@Input` y los `@Output`.

-   **`@Input`**: Acepta un objeto de configuración: `@Input({ alias: 'prefijo-nombre' })`.
-   **`@Output`**: Acepta el alias como un `string` directamente: `@Output('prefijo-nombre')`.

-   **Conclusión**: Confundir esta sintaxis resulta en un error de compilación (`NG1010`). Es un detalle importante de la API de Angular que debe tenerse en cuenta al refactorizar o crear componentes con APIs públicas.
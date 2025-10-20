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

### 9. Entender el Orden de Carga y las Dependencias Circulares en Sass

Durante la refactorización de la arquitectura de estilos, se produjo un error de "Module loop" o dependencia circular. El fichero `_base.scss` intentaba importar `_tools.scss` (`@use 'tools'`), pero `_tools.scss` ya estaba importando `_base.scss`.

-   **Conclusión**: La arquitectura de carga de Sass debe ser unidireccional. Un fichero "agregador" como `_tools.scss` puede importar muchos parciales, pero esos parciales no deben intentar importar de vuelta al agregador. Si un parcial (`_base.scss`) necesita un mixin, ese mixin debe ser definido en un fichero que se importe *antes* que el parcial dentro del agregador. Esto refuerza la importancia de `_tools.scss` como el único orquestador del orden de carga.

### 10. Las Rutas de Importación en Componentes son Relativas al Fichero

Se produjeron múltiples errores de "Can't find stylesheet to import" porque los ficheros SCSS de los componentes usaban `@use 'styles/tools' as t;`. Esta ruta asume una configuración global en `angular.json` que no estaba presente.

-   **Conclusión**: A menos que se configure explícitamente un `includePaths` en las opciones del preprocesador de Sass, todas las importaciones (`@use`) dentro de los ficheros de estilo de un componente deben usar rutas relativas (ej. `@use '../../../../styles/tools' as t;`) para que el compilador pueda resolverlas correctamente.

### 11. El Ámbito (Scope) de los Módulos de Sass con `@use`

Se produjo un error de `Undefined mixin` en `_base.scss` después de solucionar una dependencia circular. Aunque `_tools.scss` importaba tanto `_mixins-definitions.scss` como `_base.scss`, los mixins del primero no estaban disponibles en el segundo.

-   **Conclusión**: La directiva `@use` crea un ámbito encapsulado. Un fichero no hereda automáticamente los miembros de otros ficheros que son importados al mismo nivel en un fichero "agregador". Si un parcial (`_base.scss`) necesita un mixin, debe importarlo explícitamente con su propia directiva `@use` (ej. `@use 'mixins-definitions' as m;`). Esto garantiza la encapsulación y previene conflictos de nombres.

### 12. Completando el Patrón de Dependencias Unidireccionales en Sass

El último error de `Module loop` se encontró en `_theme.scss`, que seguía el mismo patrón incorrecto que `_base.scss` y `_components.scss`: intentaba importar el fichero agregador `_tools.scss`, que a su vez ya lo importaba a él.

-   **Conclusión**: Esta serie de errores refuerza una regla arquitectónica fundamental para nuestro sistema de estilos: **La carga de módulos debe ser estrictamente unidireccional.** El fichero agregador (`_tools.scss`) es el único que importa los parciales base. Estos parciales, a su vez, deben importar directamente sus dependencias específicas (ej. `_mixins-definitions.scss`) en lugar de intentar acceder al agregador. Con esta última corrección, la arquitectura de estilos ha quedado completamente estabilizada y libre de dependencias circulares.

### 13. `ActionService` es el Registro Central de Navegación

Se detectó que, tras crear una nueva página principal (`HomeComponent`), esta no aparecía en el menú de navegación. El problema era que la acción correspondiente no había sido registrada.

-   **Conclusión**: El `ActionService` actúa como la única fuente de verdad para todos los elementos de navegación de la UI. Por tanto, cada vez que se crea una nueva página o "feature" principal que deba ser accesible desde menús globales, es **mandatorio** añadir su correspondiente objeto `AppAction` al array `allActions` dentro de `action.service.ts`. Olvidar este paso hará que la nueva sección sea inaccesible desde la navegación principal.


---

## 2025-10-20: Depuración y Corrección del Menú de Navegación (`UiHamburgerMenuComponent`)

Se ha llevado a cabo un proceso de depuración exhaustivo para solucionar los problemas que impedían el correcto funcionamiento del menú principal de la aplicación.

### Problemas Solucionados:

1.  **Iconos no visibles (`app-ui-icon`)**:
    -   **Diagnóstico**: Se confirmó que el `IconService` funcionaba correctamente, pero no encontraba los ficheros SVG en las rutas esperadas. Su mecanismo de fallback, que terminaba mostrando un `?`, era el comportamiento correcto ante un fichero no encontrado.
    -   **Solución**: Se identificó que la causa raíz era una incorrecta ubicación de los ficheros de iconos. Al moverlos a `/assets/icons/system/`, el problema se resolvió.

2.  **Enlaces del menú no se renderizaban**:
    -   **Diagnóstico**: El problema principal era que el `UiAccordionComponent` no mostraba el contenido (los enlaces) que le pasaba el `UiHamburgerMenuComponent`, a pesar de que los datos llegaban correctamente.
    -   **Solución en Cadena**: La solución requirió varios ajustes finos:
        1.  **Race Condition**: Se detectó una condición de carrera entre el cálculo de los `accordionItems` (que dependían de la plantilla) y la resolución de dicha plantilla con `viewChild`. Se solucionó cambiando de un `computed` a un `signal` que se actualiza mediante un `effect`, asegurando que el cálculo se realiza solo cuando la plantilla está disponible.
        2.  **Proyección de Contenido**: Se encontró el error clave en `ui-accordion.component.html`. No se estaba pasando el contexto de datos (`item.data`) a la plantilla proyectada. Se solucionó añadiendo `[ngTemplateOutletContext]="{ $implicit: item.data }"`.
        3.  **Tipado de Datos**: Lo anterior causó un error de compilación porque la interfaz `AccordionItem` no tenía definida la propiedad `data`. Se actualizó `ui-accordion.types.ts` para incluirla.

3.  **Enrutamiento del Dashboard**:
    -   **Diagnóstico**: Se detectó una inconsistencia entre la ruta definida en el `ActionService` (`/admin/dashboard`) y la configuración real del enrutador, que asignaba el `DashboardAdminComponent` a la ruta `/admin`.
    -   **Solución**: Se corrigió el `routerLink` en `action.service.ts` a `/admin`.

### Resultado:

El menú de navegación (`UiHamburgerMenuComponent`) ahora es completamente funcional. Muestra correctamente todas las categorías y enlaces definidos en el `ActionService`, los iconos se cargan adecuadamente y la navegación a las distintas secciones funciona como se espera. El código de depuración ha sido eliminado.
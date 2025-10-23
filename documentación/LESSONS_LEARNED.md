<!-- File: d:\desarrollos\countries2\frontend\LESSONS_LEARNED.md | Last Modified: 2025-10-22 -->

### 25. El Flujo de Autenticación es una Cadena: Un Eslabón Roto la Rompe Entera

**Lección:** La depuración del flujo de login/registro reveló que un fallo no es un evento aislado, sino una cadena de dependencias entre el frontend, el backend y la base de datos. Un error en un punto puede manifestarse como un síntoma completamente diferente en otro.

**Conclusión:**
1.  **Error 404 en la API**: El primer síntoma fue un error 404 en el frontend. La causa no era la ruta, sino la falta de un **proxy de desarrollo** (`proxy.conf.json`) para comunicar `localhost:4200` con `localhost:3000`.
2.  **Error de Validación (`Name is required`)**: El registro fallaba con un error de validación. La causa era una **discrepancia de nombres** entre el `FormGroup` del frontend (`username`) y el campo esperado por el backend (`name`).
3.  **Error Fatal en el Backend (`REFRESH_TOKEN_SECRET is not defined`)**: El login parecía funcionar, pero el backend fallaba al generar tokens. La causa era una **variable de entorno faltante** en el archivo `.env` del backend.
4.  **Error de Base de Datos (`no such column: refreshToken`)**: Una vez solucionado lo anterior, el login seguía fallando. La causa era que el **esquema de la base de datos** no se había actualizado para incluir la nueva columna que el código del backend ya esperaba.
5.  **Error de Credenciales (`Invalid credentials`)**: Incluso con todo lo anterior correcto, el login podía fallar si los datos en la base de datos eran inconsistentes (ej. contraseñas no hasheadas o hasheadas con un método antiguo). La solución fue **limpiar la base de datos y usar el propio flujo de registro de la app** como única fuente de verdad.

**Lección Final:** La depuración full-stack requiere un enfoque holístico. Es necesario validar cada eslabón de la cadena: la configuración del frontend, la consistencia de los datos enviados, la configuración del backend (variables de entorno) y la estructura de la base de datos.

---

### 30. La Reutilización Inteligente vs. la Sobre-complicación

**Lección:** Al intentar reutilizar el `UiFormModalComponent` tanto para formularios como para confirmaciones de borrado, se encontró un problema persistente: el botón principal ("Guardar"/"Aceptar") no se comportaba correctamente en el modo de confirmación.

**Conclusión:**
1.  **El Principio DRY tiene Límites**: Reutilizar el modal era una buena aplicación del principio DRY. Sin embargo, intentar que un único botón ("Guardar") sirviera para dos propósitos con lógicas de habilitación completamente diferentes (uno dependiente de un formulario, el otro no) llevó a una lógica interna compleja y frágil.
2.  **La Composición y la Claridad Ganan**: La solución final y más robusta no fue añadir más complejidad a la lógica del botón, sino componer la UI del modal de forma condicional. Al introducir un `@Input` de `mode` (`'form'` vs `'confirm'`), el componente puede renderizar botones diferentes para cada caso.
3.  **Código Explícito > Código "Inteligente"**: La nueva implementación, con dos botones separados dentro de bloques `@if`, es mucho más fácil de leer, entender y mantener que una única implementación que intenta ser demasiado "inteligente". A veces, un poco más de código explícito conduce a un sistema mucho más simple y menos propenso a errores.

---

### 29. La Herencia de Clases Exige una Configuración Precisa

**Lección:** La depuración del componente `continents-admin` reveló que, aunque parecía idéntico al funcional `countries-admin`, no podía crear nuevos registros. La causa era una mínima diferencia en la configuración que rompía la lógica de la clase base `BaseAdminPageComponent`.

**Conclusión:**
1.  **El Contrato Implícito**: La clase base tenía una lógica que dependía de una propiedad `isPrimaryKey: true` en la configuración de `formFields` para saber qué campo habilitar al crear un nuevo registro.
2.  **El Silencio es Peligroso**: La ausencia de esta propiedad no causaba un error de compilación (hasta que se actualizó el tipo `FormField`), sino un fallo de comportamiento silencioso: el formulario era siempre inválido y el botón de guardar no hacía nada.
3.  **La Depuración Comparativa es Clave**: Cuando un componente falla y otro similar funciona, la técnica más efectiva es una comparación exhaustiva y metódica de sus configuraciones, plantillas y dependencias. La diferencia, por pequeña que sea, suele ser la causa raíz.
4.  **Sincronización de Validaciones**: El error final "campo inválido" se debió a una discrepancia entre la regla de negocio (ID de 3 dígitos) y la validación en el frontend (que esperaba 2 caracteres). Es crucial que las validaciones del frontend (`Validators`) y del backend (`express-validator`) estén siempre perfectamente sincronizadas.

---

### 28. El Error `ECONNREFUSED` Significa que el Servidor Backend no Está Corriendo

**Lección:** Tras solucionar los problemas de lógica y plantillas en el frontend, la aplicación empezó a mostrar un error `ECONNREFUSED` en la consola del proxy. Este error de red significa "Connection Refused".

**Conclusión:**
1.  **El Ecosistema Completo**: En un proyecto full-stack (y especialmente en un monorepo), tanto el servidor del frontend (Angular en `localhost:4200`) como el del backend (Node.js en `localhost:3000`) deben estar ejecutándose simultáneamente para que la comunicación a través del proxy funcione.
2.  **Flujo de Trabajo Eficiente**: La mejor manera de gestionar esto es utilizando una herramienta como `concurrently`. Se ha añadido un script `dev` al `package.json` raíz que lanza ambos servidores con un solo comando (`npm run dev`).
3.  **Diagnóstico Rápido**: Un error `ECONNREFUSED` en el proxy es una señal inequívoca de que el servidor de destino no está en línea o no está escuchando en el puerto esperado. Es el primer punto a verificar antes de buscar errores en el código.

---

### 27. La Base de Datos Debe Coincidir con la Lógica de la Aplicación

**Lección:** Al intentar crear un país, se produjo un error `500 Internal Server Error` en el frontend, causado por un `NOT NULL constraint failed: countries.id` en el backend. Esto ocurrió porque la tabla `countries` no tenía su columna `id` configurada como `PRIMARY KEY AUTOINCREMENT`.

**Conclusión:**
1.  **IDs Autoincrementales para Entidades Estándar**: Para la mayoría de las entidades (como `countries`), el `id` debe ser una clave subrogada gestionada por la base de datos. Es crucial definir la columna como `INTEGER PRIMARY KEY AUTOINCREMENT` en el esquema de la base de datos para que la inserción de nuevos registros funcione sin necesidad de enviar un `id`.
2.  **IDs de Negocio y Formularios**: Para entidades con identificadores de negocio (como `continents` con `id: 'EU'`), el error se manifestó como "no hace nada" porque el frontend no enviaba el `id` que el backend ahora validaba como obligatorio. La solución fue añadir el campo `id` al `formFields` del componente de administración correspondiente en el frontend.
3.  **Sincronización Total**: Este incidente subraya que cualquier cambio en las reglas de validación del backend o en la estructura de la base de datos debe reflejarse inmediatamente en las partes correspondientes del sistema (otros servicios, formularios del frontend, etc.).

---

### 26. El Diseño de la Base de Datos Sigue las Reglas de Negocio

**Lección:** Durante la depuración del borrado de continentes, se asumió inicialmente que el error (`/api/continents/null`) se debía a la falta de un `id` autoincremental en la base de datos. Sin embargo, la regla de negocio real es que los IDs de los continentes son códigos específicos y fijos (ej. 'EU', 'AS') que debe proporcionar el usuario.

**Conclusión:**
1.  **No Asumir `AUTOINCREMENT`**: No todas las entidades deben tener un ID numérico autogenerado. Algunas entidades, especialmente las de tipo "catálogo" o "maestro", pueden usar identificadores de negocio como clave primaria.
2.  **El `id` como Campo de Formulario**: Cuando el `id` es un identificador de negocio, debe ser tratado como cualquier otro campo. Esto implica:
    -   Añadirlo al formulario del frontend (`formFields` en el `...-admin.component.ts`).
    -   Validarlo en el backend (en las reglas de `express-validator`).
    -   Incluirlo en la función `sanitize` del controlador para que se pase al servicio de creación.
3.  **La Base de Datos Refleja la Realidad**: La columna `id` en la tabla `continents` debe ser de tipo `TEXT` (o `VARCHAR`) y `PRIMARY KEY`, pero **no** `AUTOINCREMENT`. Esto asegura la unicidad del código proporcionado por el usuario.

---

### 24. La Duplicación de Archivos Conduce al Caos

**Lección:** Durante la implementación del sistema de notificaciones, se crearon accidentalmente múltiples versiones de servicios (`NotificationService`, `ToastService`) y archivos de tipos (`toast.types.ts`) en diferentes directorios. Esto provocó una serie de errores de compilación confusos y difíciles de depurar, como `is not a module` y `No suitable injection token`.

**Conclusión:**
1.  **Fuente Única de Verdad (Single Source of Truth)**: Es imperativo que los servicios, tipos y cualquier otra pieza de código reutilizable existan en una, y solo una, ubicación canónica. En nuestro caso, `core/services` y `core/types`.
2.  **Los Errores de Importación son una Señal de Alarma**: Errores como `Cannot find module` o `is not a module` a menudo no indican un problema con el código en sí, sino un problema con la estructura de archivos del proyecto. Es una señal para auditar la ubicación de los archivos y las rutas de importación.
3.  **Refactorizar Incluye Eliminar**: Al consolidar lógica (ej. unificar `NotificationService` en `ToastService`), el paso final y más importante es eliminar activamente los archivos y clases obsoletos. Dejarlos en el proyecto, aunque no se usen directamente, crea "ruido" y puede ser importado por error en el futuro, reintroduciendo los bugs.

---

### 23. El Orden de Inicialización en la Herencia de Componentes

**Lección:** Al refactorizar `BaseAdminPageComponent` para que construyera formularios dinámicamente, se produjo el error `Error: Cannot find control with name: '...'`. La causa fue un problema de ciclo de vida en la herencia de clases de TypeScript/Angular.

**Conclusión:**
1.  **El `constructor` de la base se ejecuta primero**: Cuando una clase hija (`ContinentsAdminComponent`) hereda de una clase base (`BaseAdminPageComponent`), el `constructor` de la base se ejecuta **antes** de que las propiedades de la clase hija (como `formFields`) sean inicializadas.
2.  **`ngOnInit` es para la lógica post-inicialización**: El `constructor` debe usarse para la inyección de dependencias y la inicialización mínima. La lógica que depende de las propiedades del componente (especialmente las que vienen de una clase hija) debe ejecutarse en `ngOnInit`.
3.  **La Solución**: Se movió la llamada al método `_buildForm()` desde el `constructor` de `BaseAdminPageComponent` a su `ngOnInit`. En este punto del ciclo de vida, Angular ya ha inicializado las propiedades de la clase hija, por lo que `formFields` está disponible y el `FormGroup` se puede construir correctamente.

---

### 22. La Estandarización de la API de Componentes es un Trabajo Exhaustivo

**Lección:** La decisión de estandarizar la API de todos los componentes de UI a una única convención (`camelCase` para los alias de `@Input`) fue correcta, pero su ejecución inicial fue incompleta, lo que provocó una avalancha de errores de compilación (`NG8002`, `NG8008`).

**Conclusión:**
1.  **El Efecto Dominó es Real**: Cambiar la API de un componente (ej. `ui-icon` a `uiIconName`) requiere una actualización sistemática de **todos** los lugares donde se consume, incluyendo las plantillas de otros componentes que dependen de él. No se puede dejar ningún cabo suelto.
2.  **Los Errores como Mapa**: Aunque abrumadora, la larga lista de errores del compilador de Angular actuó como un mapa preciso que nos guió a cada plantilla que todavía usaba la convención antigua. En lugar de ser un obstáculo, fue la herramienta clave para completar la refactorización.
3.  **La Consistencia es la Clave de la Mantenibilidad**: El esfuerzo invertido en esta estandarización masiva se traduce directamente en una mayor velocidad de desarrollo futuro y una drástica reducción de errores. Ahora, cualquier desarrollador (humano o IA) sabe que la convención es `[uiComponentName]` en todo el proyecto, eliminando la ambigüedad.

---

### 21. El Contexto de Inyección de Angular y `toObservable`

**Lección:** Al intentar crear un `Observable` a partir de un `signal` usando `toObservable` dentro del método `ngOnInit`, la aplicación falló con el error `NG0203: toObservable() can only be used within an injection context`.

**Conclusión:**
1.  **El Contexto es Clave**: Ciertas funciones de Angular, especialmente las que interactúan con el sistema de Inyección de Dependencias (como `inject()` o `toObservable`), deben ejecutarse en un "contexto de inyección".
2.  **Lugares Seguros**: Este contexto está garantizado en el `constructor` de una clase, en los inicializadores de propiedades de la clase, y en las `factory functions` de los proveedores.
3.  **`ngOnInit` es Demasiado Tarde**: El método `ngOnInit` se ejecuta después de que el componente ha sido construido y sus dependencias inyectadas. En este punto, el contexto de inyección ya no está activo por defecto.
4.  **La Solución**: La lógica que depende de estas funciones debe moverse a uno de los lugares seguros. En nuestro caso, movimos la inicialización de `toolbarActions` (que usaba `toObservable`) del `ngOnInit` al `constructor` de `BaseAdminPageComponent`, solucionando el problema de raíz.

---

### 20. Herencia de Clases sobre Composición para Lógica de Componentes

**Lección:** El patrón `AdminPageManager` fue un gran paso para centralizar la lógica de *datos*. Sin embargo, la lógica de *UI* (manejo de modales, acciones de guardado/borrado) y la estructura de la plantilla seguían duplicándose en cada componente de administración.

La solución final fue crear una clase base abstracta, `BaseAdminPageComponent`, de la cual heredan todos los componentes de administración.

**Conclusión:**
1.  **La Herencia es para "Es un..."**: Un `CountriesAdminComponent` **es un** tipo de `BaseAdminPageComponent`. Esta relación justifica el uso de la herencia para compartir un comportamiento y una estructura comunes.
2.  **Contrato a través de `abstract`**: El uso de propiedades `abstract` en la clase base crea un contrato claro y obligatorio para los componentes hijos, garantizando que proporcionen toda la información necesaria (servicio, columnas, formulario).
3.  **Simplicidad Máxima en los Hijos**: Este patrón reduce los componentes de administración a meras "clases de configuración", cuyo único propósito es implementar el contrato de la clase base. Esto maximiza el principio DRY y simplifica enormemente la creación de nuevas páginas de administración.

---

### 19. Abstracción Correcta: De `BaseAdminDirective` a `AdminPageManager`

**Lección:** La `BaseAdminDirective` resultó ser una abstracción fallida. Aunque la intención de reutilizar código era buena, su complejidad y su dependencia del ciclo de vida de la inyección de dependencias de Angular la hicieron frágil y extremadamente difícil de depurar, manifestándose en el persistente error `NG0950`.

La solución final y correcta fue abandonar por completo la directiva y crear una clase de utilidad "headless" (sin plantilla): `AdminPageManager`.

**Conclusión:**
1.  **Evitar la Inyección de Dependencias para Lógica Compleja en Directivas de Host:** Las directivas de host son potentes, pero cuando su lógica interna depende de `@Inputs` para funcionar, se crean condiciones de carrera difíciles de gestionar.
2.  **Instanciación Manual para un Control Total:** El patrón `AdminPageManager` funciona porque el componente anfitrión tiene el control total: crea la instancia (`new AdminPageManager()`) y la configura (`init(...)`) de forma explícita en su constructor. Esto elimina toda ambigüedad sobre el ciclo de vida y la disponibilidad de las dependencias.
3.  **El Patrón "Manager" como Solución Ideal:** Este enfoque nos da lo mejor de ambos mundos:
    -   **Reutilización de Código:** Toda la lógica de paginación, búsqueda y ordenación está en un solo lugar.
    -   **Simplicidad en el Componente:** Los componentes de administración se convierten en simples "presentadores" que delegan el trabajo al `manager`.
    -   **Robustez:** Se eliminan los errores de ciclo de vida y la lógica es más fácil de probar y razonar.

---

### 17. La Carga Diferida (`loadChildren`) Requiere Rutas Hijas Válidas

**Lección:** Un error `NG04002: Cannot match any routes` puede ocurrir no solo si la ruta directa no existe, sino también si una de las rutas hijas configuradas bajo `loadChildren` tiene un problema que impide su carga (ej. un `loadComponent` que apunta a un archivo inexistente). El enrutador de Angular intenta validar todo el árbol de rutas y falla si una de sus ramas está rota.

**Conclusión:** Al depurar errores de enrutamiento, es crucial verificar no solo la ruta principal, sino también la validez de todas las rutas hijas que se cargan de forma diferida. Una incorrecta organización de archivos o una errata en una ruta de importación puede invalidar todo un segmento del enrutador.

## 2025-10-20: Depuración Final y Estabilización de la Compilación

### 18. El Peligro de la Sobre-Abstracción: El Caso `BaseAdminDirective`

**Lección:** La lección más crítica de este proyecto. Se intentó crear una `BaseAdminDirective` para centralizar toda la lógica de las páginas de administración (obtención de datos, paginación, búsqueda, ordenación, selección, modales, CRUD). Esta "super-directiva" se volvió excesivamente compleja y frágil.

El problema principal fue un error recurrente y difícil de depurar: `NG0950: Input "service" is required but no value is available yet`. Este error se debía a una condición de carrera en la que el flujo de datos reactivo de la directiva intentaba usar el `@Input` del servicio antes de que Angular tuviera tiempo de proporcionárselo.

**Conclusión:**
1.  **La Sobre-Abstracción es Deuda Técnica:** Cuando una abstracción (como una directiva o una clase base) se vuelve tan compleja que es difícil de entender y depurar, ha dejado de ser útil. Viola el Principio de Responsabilidad Única y debe ser reconsiderada.
2.  **La Simplicidad y la Claridad son Clave:** Tras numerosos intentos fallidos de parchear la directiva, la solución final y correcta fue **eliminarla por completo**.
3.  **Lógica en el Componente como Patrón Exitoso:** El patrón final y estable consiste en implementar la lógica de gestión de datos directamente en cada componente de administración (`ContinentsAdminComponent`, `CountriesAdminComponent`). Cada componente gestiona su propio estado con `signals` y orquesta las llamadas a la API con un `stream` de `RxJS` (`combineLatest`, `switchMap`). Este enfoque es más explícito, más fácil de depurar y cada componente es autónomo.
4.  **Lección Técnica sobre `Inputs` Requeridos:** Crear flujos reactivos (`toObservable`, `computed`) que dependen directamente de un `@Input` requerido es peligroso. La solución más segura es no incluir el `Input` en la creación del `stream` (`combineLatest`) y acceder a su valor solo cuando el `stream` ya se está ejecutando (por ejemplo, dentro de un `switchMap`), después de que Angular haya garantizado su inicialización.

---

## 2025-10-20: Depuración de Componentes y Navegación

### 14. Sincronización de Tipos e Implementaciones

**Lección:** Una cascada de errores de compilación (`TS2353`, `TS2322`) se originó al modificar la estructura de los objetos en `ActionService` (añadiendo la propiedad `type` y nuevas categorías) sin actualizar su "contrato", la interfaz `AppAction` en `action.types.ts`.

**Conclusión:** Al modificar la estructura de datos que un servicio provee, es **mandatorio actualizar primero la definición de tipos (interfaz) correspondiente**. Esto mantiene la integridad del contrato entre el proveedor de datos y sus consumidores, y permite que el compilador de TypeScript ofrezca errores claros y localizados en lugar de una avalancha de fallos en cadena.

### 15. Sensibilidad al Formato (Case) en los Bindings de Inputs

**Lección:** Se produjeron errores de compilación (`NG8008`, `NG8002`) al intentar usar un componente con un input requerido. El error `Can't bind to 'uiIconName' since it isn't a known property` fue la clave.

**Conclusión:** El nombre utilizado para el binding de un input en la plantilla HTML debe coincidir **exactamente** con el nombre de la propiedad o el alias definido en la clase del componente. En este caso, el input era `[ui-icon-name]` (kebab-case) y se estaba intentando usar `[uiIconName]` (camelCase). Esto resalta la importancia de revisar la API exacta del componente que se está consumiendo.

### 16. Las Advertencias de Deprecación son Deuda Técnica Futura

**Lección:** El compilador de Sass mostró una advertencia (`Deprecation Warning`) sobre el uso de la función global `unitless()`, sugiriendo `math.is-unitless()` en su lugar.

**Conclusión:** Las advertencias de deprecación no son errores, pero ignorarlas es acumular deuda técnica. Indican que una funcionalidad será eliminada en futuras versiones y el código dejará de funcionar. Es una buena práctica corregir estas advertencias tan pronto como aparecen para asegurar la compatibilidad y mantenibilidad a largo plazo del código.

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

## 2025-10-20: Depuración del Dashboard y Conexión con el Backend

### 14. El Proxy de Desarrollo de Angular es Esencial

**Lección:** Cuando el frontend y el backend se ejecutan en puertos diferentes, las llamadas a la API desde el frontend (ej. a `/api/countries`) fallarán debido a la política de mismo origen (CORS), resultando en errores 404 y una aplicación que no carga datos.

**Solución Aplicada:** Usar un archivo `proxy.conf.json` y configurarlo en `angular.json`. Esto permite hacer peticiones a rutas relativas y el servidor de desarrollo de Angular las redirige de forma transparente al backend, como si todo se sirviera desde el mismo dominio.

### 15. Depuración de Componentes Standalone en Blanco

**Lección:** Si una ruta se activa pero el componente no se renderiza (página en blanco), las causas más comunes son:
1.  **Falta de un proveedor esencial:** Por ejemplo, no haber añadido `provideHttpClient()` en la configuración de la aplicación (`app.config.ts` o `main.ts`) impide que cualquier componente que dependa de `HttpClient` (directa o indirectamente) se renderice.
2.  **Una guarda de ruta (`Guard`) está bloqueando el acceso:** Si una ruta está protegida, la guarda puede estar impidiendo la navegación silenciosamente. Desactivarla temporalmente es una buena técnica de depuración.
3.  **Un error en `forkJoin`:** Si una de las múltiples peticiones dentro de un `forkJoin` falla, todo el observable falla. Usar `catchError` en cada petición interna es crucial para la resiliencia y para poder depurar qué petición específica está fallando.

### 16. La Configuración de `assets` en `angular.json` es Clave para los Iconos

**Lección:** Si los iconos SVG no se cargan y en su lugar se muestra el texto del fallback (ej. "UNK"), significa que el `IconService` no está encontrando los archivos.

**Solución Aplicada:** Es necesario configurar explícitamente la carpeta de iconos en la sección `assets` del archivo `angular.json`. Esto asegura que los archivos SVG se copien al directorio de `dist` durante la compilación y estén disponibles en la ruta esperada (ej. `/assets/icons/system/flag.svg`).
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
<!-- File: d:\desarrollos\countries2\frontend\FRONTEND_PROGRESS_LOG.md | Last Modified: 2025-10-22 -->

### 37. Creación de la Página de Administración de "Idiomas" (Languages)

-   **Fecha**: 2025-10-23
-   **Acción**: Se ha creado la nueva página de administración para la entidad "Idiomas".
-   **Propósito**: Permitir la gestión CRUD de la tabla `languages`, incluyendo campos específicos y una visualización personalizada.
-   **Cambios Realizados**:
    -   Se ha clonado la estructura de la página de "Países" como base, adaptándola para la entidad `Language`.
    -   Se han creado los ficheros `languages-admin.component.ts`, `languages.service.ts`, y sus correspondientes plantillas y estilos.
    -   Se ha definido el tipo `Language` con los campos `id`, `name` y `active`.
    -   En `languages-admin.component.ts`, se han configurado los `formFields` para que coincidan con la entidad, incluyendo un campo de tipo `boolean` para el estado "activo".
    -   En `languages-admin.component.html`, se han implementado plantillas personalizadas para las columnas de la tabla:
        -   La columna `id` ahora muestra el icono de la bandera del idioma junto a su código.
        -   La columna `active` muestra un icono de `check` o `cancel` según el estado.
    -   Se han corregido una serie de errores de compilación en cascada, principalmente relacionados con la desincronización entre las plantillas HTML y la API de la clase base `BaseAdminPageComponent` tras refactorizaciones recientes.
-   **Beneficio**: La aplicación cuenta con una nueva sección de administración para "Idiomas", completamente funcional y con una interfaz de usuario enriquecida. El proceso ha servido para estabilizar y alinear las plantillas de todas las páginas de administración con la API de la clase base.

---

### 36. Creación de la Página de Administración de "Áreas"

-   **Fecha**: 2025-10-23
-   **Acción**: Se ha creado la nueva página de administración para la entidad "Áreas".
-   **Propósito**: Expandir las capacidades de gestión de la aplicación, permitiendo el CRUD de la tabla `areas`.
-   **Cambios Realizados**:
    -   Se ha seguido el patrón de reutilización establecido por la arquitectura, copiando la estructura de la página de "Continentes" que era funcionalmente idéntica.
    -   Se han creado los ficheros `areas-admin.component.ts`, `areas.service.ts` y sus correspondientes plantillas y estilos en `features/admin/areas/`.
    -   Se ha modificado `areas-admin.component.ts` para que utilice `AreasService`, el tipo `Area`, y se han actualizado los identificadores y textos de la UI (títulos, placeholders).
    -   El proceso ha sido extremadamente rápido y sin fricciones, validando el éxito de la clase base `BaseAdminPageComponent` y el patrón de herencia para las páginas CRUD.
-   **Beneficio**: La aplicación cuenta con una nueva sección de administración completamente funcional. Se ha demostrado que la arquitectura actual permite añadir nuevas funcionalidades similares con un esfuerzo mínimo y un bajo riesgo de introducir errores.

---

### 35. Estandarización de la Página de Registro y Corrección del Tema Global

-   **Fecha**: 2025-10-23
-   **Acción**: Se ha refactorizado la página de registro para alinearla con el diseño de las páginas de login y perfil, y se ha corregido el color de fondo global de la aplicación.
-   **Propósito**: Asegurar la consistencia visual y la experiencia de usuario en todas las páginas de autenticación, y restaurar el color de fondo corporativo de la aplicación.
-   **Cambios Realizados**:
    -   **Corrección del Fondo Global**: Se ha identificado que el color de fondo de la aplicación era un gris-azulado debido a una variable incorrecta. Se ha corregido en `_variables.scss` para que `--color-background` sea blanco (`#ffffff`).
    -   **Refactorización de `register.component.ts`**:
        -   Se han actualizado las importaciones para incluir `UiCardComponent`, `UiInputDirective` y `UiButtonComponent`.
        -   Se ha simplificado la lógica, eliminando `isSubmitting` y `ngOnInit` que ya no eran necesarios.
        -   Se han ajustado los validadores de contraseña a `minLength(8)` para consistencia.
    -   **Refactorización de `register.component.html`**:
        -   Se ha adoptado la estructura basada en `app-ui-card` para el contenedor principal.
        -   Se han añadido `placeholder` y `title` (tooltip) a los campos de entrada para mejorar la usabilidad.
        -   Se ha implementado la lógica de visualización de mensajes de error dinámicos (`@if`) para cada campo, siguiendo el patrón de la página de perfil.
        -   Se ha utilizado `appUiInput` para aplicar los estilos corporativos a los campos de entrada.
        -   El botón de registro ahora usa `app-ui-button` con `ui-button-color="primary"` y `[disabled]="registerForm.invalid"`.
    -   **Refactorización de `register.component.scss`**: Se han adaptado los estilos para que coincidan con la nueva estructura HTML y utilicen las variables de diseño corporativas.
    -   **Mejora de Estilos de Formulario**: Se ha ajustado la regla CSS en `_forms.scss` para que los campos erróneos muestren el borde rojo no solo cuando se han tocado (`.ng-touched`), sino también cuando se están editando y son inválidos (`.ng-dirty`), proporcionando feedback inmediato.
-   **Beneficio**: Todas las páginas de autenticación (login, registro, perfil) ahora comparten una apariencia y experiencia de usuario consistentes y profesionales. El fondo de la aplicación es el blanco corporativo, y los formularios ofrecen un feedback de validación claro y dinámico.

---

### 34. Refinamiento de Estilos y Arquitectura SCSS para la Página de Perfil

-   **Fecha**: 2025-10-23
-   **Acción**: Se ha completado la implementación visual de la página "Mi Perfil", solucionando problemas de estilo y mejorando la arquitectura de SCSS.
-   **Propósito**: Asegurar que la nueva sección se integre visualmente con el resto de la aplicación y que la arquitectura de estilos sea robusta, mantenible y coherente.
-   **Cambios Realizados**:
    -   **Estilos de Layout**: Se han añadido estilos específicos en `user-profile.component.scss` para maquetar la página, utilizando un sistema de rejilla para organizar las tarjetas de perfil y contraseña.
    -   **Estilos de Formularios Globales**: Para unificar la apariencia de los campos de texto, se ha creado un nuevo parcial `_forms.scss` con los estilos corporativos para la clase `.ui-input`. Este parcial se ha importado de forma centralizada en `_tools.scss`.
    -   **Mejora de la Experiencia de Usuario (UX)**: Se ha mejorado la plantilla `user-profile.component.html` para incluir mensajes de error dinámicos y específicos para cada campo del formulario, guiando al usuario de forma clara.
    -   **Actualización del Título de Página**: Se ha implementado la lógica en `UserProfileComponent` para que actualice dinámicamente el título de la cabecera a "Mi Perfil" al navegar a esta página, utilizando el `LayoutService`.
    -   **Refactorización de la Arquitectura SCSS**:
        -   Se ha configurado `angular.json` para añadir `src` a los `includePaths` del preprocesador de Sass. Esto permite el uso de rutas de importación absolutas y limpias (ej. `@use 'styles/tools'`) desde cualquier componente.
        -   Se ha refactorizado `_grid.scss` para definir un `mixin` reutilizable `@mixin grid`.
        -   Se ha actualizado `_tools.scss` para que exponga (`@forward`) el nuevo mixin, solucionando un error de `Undefined mixin` y haciendo la lógica de la rejilla accesible globalmente de forma correcta.
-   **Beneficio**: La página de perfil ahora tiene una apariencia profesional y es consistente con el sistema de diseño de la aplicación. La arquitectura de estilos se ha fortalecido, permitiendo importaciones más limpias y una mayor reutilización de la lógica de estilos a través de mixins.

---

### 33. Implementación de la Sección de Perfil de Usuario y Cierre de Sesión

-   **Fecha**: 2025-10-23
-   **Acción**: Se ha implementado desde cero la sección "Mi Perfil", permitiendo a los usuarios gestionar su cuenta y cerrar la sesión.
-   **Propósito**: Proporcionar funcionalidades esenciales de gestión de cuenta, completando el ciclo de vida de la autenticación del usuario.
-   **Cambios Realizados**:
    -   **Separación de Bases de Datos (Backend)**: Se ha completado la separación de la base de datos de usuarios (`auth.db`) de la base de datos principal (`countries.db`), aislando la lógica de autenticación.
    -   **Nuevos Endpoints (Backend)**: Se han creado y unificado los endpoints necesarios en `routes/auth.ts` para gestionar el perfil:
        -   `GET /api/auth/profile`: Para obtener los datos del usuario.
        -   `PUT /api/auth/profile`: Para actualizar el nombre y el email.
        -   `PUT /api/auth/profile/password`: Para cambiar la contraseña.
        -   `POST /api/auth/logout`: Para el cierre de sesión.
    -   **Componente de Perfil (Frontend)**: Se ha creado el nuevo `UserProfileComponent` con formularios reactivos para la gestión de datos y contraseña.
    -   **Enrutamiento y Seguridad (Frontend)**:
        -   Se ha creado `user.routes.ts` para definir la ruta `/profile`.
        -   Se ha creado el guardián `auth.guard.ts` para proteger esta ruta y asegurar que solo usuarios autenticados puedan acceder.
    -   **Integración en la UI (Frontend)**:
        -   Se ha ampliado `AuthService` con los métodos `getProfile`, `updateProfile`, `changePassword` y `logout`.
        -   Se ha modificado `app.component.html` para mostrar dinámicamente los botones "Mi Perfil" y "Cerrar Sesión" a los usuarios autenticados.
    -   **Depuración Extensiva**: Se ha llevado a cabo un proceso de depuración completo que ha incluido la corrección de rutas de importación, la creación de componentes de UI faltantes (`ui-card`, `ui-input`), la corrección del uso de la directiva `ui-button` y la instalación de dependencias del backend (`zod`).
-   **Beneficio**: La aplicación ahora cuenta con un flujo de gestión de perfil de usuario completo, seguro y funcional. Los usuarios tienen control sobre su cuenta y el sistema está estabilizado tras una depuración integral de frontend y backend.

---

### 32. Resolución de Errores de Compilación y Adaptación a la API de `UiButtonComponent`

-   **Fecha**: 2025-10-23
-   **Acción**: Se ha llevado a cabo una depuración final para resolver una cascada de errores de compilación (`NG8001`, `NG8002`) que impedían el renderizado de componentes.
-   **Propósito**: Lograr que la aplicación compile sin errores, identificando y corrigiendo la causa raíz de los fallos en las plantillas.
-   **Cambios Realizados**:
    -   **Diagnóstico Profundo**: Se identificó que todos los errores `NG8001: 'app-ui-button' is not a known element` y `NG8002: Can't bind to '...'` estaban relacionados con el uso incorrecto del componente `UiButtonComponent`.
    -   **Revisión de Documentación**: Siguiendo la intuición del desarrollador, se revisó la documentación (`README.md`) del `UiButtonComponent`. Se confirmó que no es un componente de elemento (`<app-ui-button>`), sino una **directiva de atributo** (`[app-ui-button]`).
    -   **Refactorización de Plantillas**:
        -   Se han modificado las plantillas `app.component.html` y `user-profile.component.html`.
        -   Se han reemplazado las etiquetas `<app-ui-button>` por etiquetas estándar `<button>` a las que se les ha añadido la directiva `app-ui-button`.
        -   Se han corregido los bindings de los inputs para que coincidan con la API de la directiva: `size` se ha cambiado por `ui-button-size`, `variant` por `ui-button-color`, y el binding de deshabilitación `[ui-button-disabled]` se ha corregido por el estándar `[disabled]`.
    -   **Creación de `auth.guard.ts`**: Se ha creado el guardián de autenticación que faltaba en `core/auth/guards/`, solucionando los errores de enrutamiento pendientes.
-   **Beneficio**: La aplicación compila ahora sin errores. Se ha resuelto una inconsistencia fundamental entre el uso y la implementación de un componente compartido clave, estabilizando el frontend y permitiendo continuar con el desarrollo de funcionalidades.

---

### 31. Refactorización del Modal para Soportar Múltiples Modos

-   **Fecha**: 2025-10-23
-   **Acción**: Se ha refactorizado el componente `UiFormModalComponent` para diferenciar entre un modo "formulario" y un modo "confirmación".
-   **Propósito**: Solucionar un problema de UX donde el botón de "Aceptar" en los modales de confirmación de borrado permanecía deshabilitado, ya que dependía incorrectamente de la validez de un formulario inexistente.
-   **Cambios Realizados**:
    -   **`UiFormModalComponent`**:
        -   Se ha añadido un nuevo `@Input('uiFormModalMode')` que puede ser `'form'` (por defecto) o `'confirm'`.
        -   La plantilla del modal ahora utiliza un bloque `@if` para renderizar condicionalmente los botones del pie de página:
            -   En modo `'form'`, muestra un botón "Guardar" que se deshabilita si el formulario es inválido.
            -   En modo `'confirm'`, muestra un botón "Aceptar" que siempre está habilitado (a menos que la operación esté en curso).
    -   **Componentes de Administración**: Se han actualizado las plantillas de `countries-admin` y `continents-admin` para pasar `[uiFormModalMode]="'confirm'"` a los modales de confirmación de borrado.
-   **Beneficio**: La lógica de los botones del modal es ahora explícita, simple y robusta. La experiencia de usuario es correcta en todos los casos de uso (creación, edición y confirmación), eliminando la confusión y los bloqueos.

---

### 30. Resolución Final del CRUD y Depuración Profunda

-   **Fecha**: 2025-10-23
-   **Acción**: Se ha completado la depuración del flujo CRUD para todas las entidades de administración, solucionando el problema persistente con la creación de nuevos registros en la sección de "Continentes".
-   **Propósito**: Lograr que todas las páginas de administración sean 100% funcionales, consistentes y robustas.
-   **Cambios Realizados**:
    -   **Diagnóstico Profundo**: Se realizó una comparación exhaustiva entre los componentes `countries-admin` (funcional) y `continents-admin` (defectuoso).
    -   **Identificación de la Causa Raíz**: Se descubrió que la propiedad `isPrimaryKey: true` faltaba en la definición del campo `id` dentro de `formFields` en `continents-admin.component.ts`. Esto impedía que la lógica de la clase base `BaseAdminPageComponent` habilitara el campo `id` al crear un nuevo registro, haciendo que el formulario fuera siempre inválido.
    -   **Corrección de la Interfaz**: Se actualizó la interfaz `FormField` en `form.types.ts` para incluir la propiedad opcional `isPrimaryKey?: boolean`, solucionando los errores de compilación de TypeScript.
    -   **Alineación de Reglas de Negocio**: Se ajustaron las reglas de validación tanto en el frontend (`Validators.pattern`) como en el backend (`express-validator`) para que el `id` de los continentes acepte un código de 3 dígitos en formato string, permitiendo ceros a la izquierda.
-   **Beneficio**: Todas las funcionalidades CRUD (Crear, Leer, Actualizar, Borrar) son ahora completamente operativas en todas las páginas de administración. La arquitectura base ha demostrado ser robusta y el sistema es ahora estable y predecible.

---

### 29. Estandarización de IDs de Negocio en Formularios CRUD

-   **Fecha**: 2025-10-23
-   **Acción**: Se ha estandarizado el manejo de identificadores de negocio en toda la aplicación, tanto en el backend como en el frontend.
-   **Propósito**: Asegurar que entidades como `countries`, `continents`, `areas` y `languages` utilicen un `id` proporcionado por el usuario (ej. 'ES', 'EU') en lugar de un ID autoincremental, alineando la aplicación con las reglas de negocio.
-   **Cambios Realizados**:
    -   **Backend**: Se han actualizado los controladores (`sanitize` functions) y las rutas (`express-validator` rules) para todas las entidades afectadas, para que acepten y validen el `id` durante la creación de un nuevo registro.
    -   **Frontend**: Se han actualizado los `formFields` en los componentes de administración (`countries-admin`, `continents-admin`, etc.) para incluir un campo de formulario para el `id`, permitiendo al usuario introducir el código de negocio.
    -   **Base de Datos**: Se ha verificado que las tablas correspondientes en la base de datos no utilicen `AUTOINCREMENT` en sus columnas `id`, sino que sean `PRIMARY KEY` de tipo `TEXT`.
    -   **UI/UX**: Se ha mejorado la usabilidad de las tablas de administración haciendo que el campo principal (nombre o ID) sea un enlace para abrir directamente el modal de edición.
-   **Beneficio**: El flujo CRUD para todas las entidades de catálogo es ahora completamente funcional y coherente con los requisitos del negocio. Se han eliminado los errores `NOT NULL constraint failed` y los fallos de validación silenciosos.

---

### 28. Estabilización y Depuración del Flujo de Autenticación

-   **Fecha**: 2025-10-22
-   **Acción**: Se ha llevado a cabo un proceso de depuración exhaustivo para estabilizar el flujo de registro e inicio de sesión.
-   **Propósito**: Asegurar que el sistema de autenticación sea completamente funcional y robusto, solucionando una serie de errores de configuración y datos que impedían su correcto funcionamiento.
-   **Cambios Realizados**:
    -   **Configuración del Proxy**: Se ha verificado y asegurado la correcta configuración del `proxy.conf.json` para solucionar errores 404 en las llamadas a la API.
    -   **Sincronización Backend-Frontend**: Se ha corregido una discrepancia en el formulario de registro, alineando el campo `name` del frontend con la expectativa del backend para solucionar errores de validación.
    -   **Configuración del Backend**: Se han añadido las variables de entorno (`REFRESH_TOKEN_SECRET`) necesarias en el fichero `.env` del backend para permitir la generación de tokens.
    -   **Actualización de la Base de Datos**: Se ha modificado el esquema de la tabla `users` para añadir la columna `refreshToken`, solucionando un error `no such column` durante el login.
    -   **Limpieza de Datos**: Se han eliminado los datos de usuario inconsistentes de la base de datos y se ha utilizado el propio flujo de registro de la aplicación para crear un usuario válido, garantizando la integridad de los hashes de contraseña.
-   **Beneficio**: El sistema de autenticación está ahora 100% operativo. Los usuarios pueden registrarse, iniciar sesión y recibir los tokens de acceso y refresco correctamente. Se han eliminado todos los bloqueos que impedían el progreso en las funcionalidades protegidas.

---

### 27. Implementación del Flujo de Autenticación (Login/Registro)

-   **Fecha**: 2025-10-22
-   **Acción**: Se ha implementado la lógica de autenticación real y se han creado los componentes para el login y el registro de usuarios.
-   **Propósito**: Permitir a los usuarios iniciar sesión y registrarse en la aplicación, sentando las bases para la seguridad y la protección de rutas.
-   **Cambios Realizados**:
    -   **`AuthService`**: Se ha refactorizado por completo para gestionar el estado de autenticación (`currentUser`, `isAuthenticated`) con `signals`, persistir el token en `localStorage` y comunicarse con los endpoints `/api/auth/login` y `/api/auth/register`.
    -   **`LoginComponent`**: Se ha creado un nuevo componente para la página de inicio de sesión, con su formulario y lógica para llamar al `AuthService`.
    -   **`RegisterComponent`**: Se ha creado un nuevo componente para la página de registro, completando el flujo de autenticación.
    -   **Rutas de Autenticación**: Se ha creado un nuevo archivo de rutas (`auth.routes.ts`) que se carga de forma diferida, optimizando el rendimiento.
-   **Beneficio**: La aplicación ahora cuenta con un sistema de autenticación funcional. Los usuarios pueden registrarse e iniciar sesión, y el estado de su sesión se mantiene de forma reactiva en toda la aplicación.

---

### 26. Implementación de Sistema de Notificaciones (Toasts)

-   **Fecha**: 2025-10-22
-   **Acción**: Se ha implementado un sistema de notificaciones "toast" para proporcionar feedback al usuario.
-   **Propósito**: Mejorar la experiencia de usuario mostrando mensajes claros y no intrusivos tras la finalización de operaciones CRUD.
-   **Cambios Realizados**:
    -   Se ha creado el `ToastService` para gestionar el estado de las notificaciones (añadir, eliminar, auto-cierre).
    -   Se han creado los componentes de UI `UiToastComponent` (para el toast individual) y `UiToastContainerComponent` (para renderizar la lista de toasts).
    -   Se ha integrado el `UiToastContainerComponent` en la plantilla raíz de la aplicación (`app.component.html`).
    -   Se ha refactorizado `BaseAdminPageComponent` para inyectar `ToastService` y llamar a sus métodos (`showSuccess`, `showError`) en las operaciones de guardado y borrado.
    -   Se ha consolidado la lógica eliminando un `NotificationService` duplicado y centralizando todo en `ToastService`.
-   **Beneficio**: La aplicación ahora proporciona feedback visual inmediato al usuario, confirmando el éxito o informando de errores en las operaciones, lo que resulta en una interfaz mucho más intuitiva y profesional.

---

### 25. Implementación de Borrado Múltiple

-   **Fecha**: 2025-10-22
-   **Acción**: Se ha implementado la lógica para el borrado de múltiples registros seleccionados en la `BaseAdminPageComponent`.
-   **Propósito**: Permitir a los usuarios eliminar varios elementos de una tabla de una sola vez, mejorando la eficiencia de la gestión de datos.
-   **Cambios Realizados**:
    -   Se ha añadido un nuevo modal de confirmación (`isConfirmMultiDeleteModalVisible`) para el borrado múltiple en la clase base y en las plantillas de administración.
    -   Se ha implementado el método `onConfirmDeleteSelected()`, que utiliza `forkJoin` de RxJS para ejecutar múltiples peticiones `DELETE` en paralelo.
    -   Se ha añadido un manejo de errores robusto con `catchError` dentro del `forkJoin` para asegurar que el fallo de una petición no detenga el proceso completo.
-   **Beneficio**: Todas las páginas de administración heredan automáticamente una funcionalidad de borrado múltiple segura y eficiente, manteniendo la consistencia de la UI.

---

### 24. Implementación de Formularios Dinámicos

-   **Fecha**: 2025-10-22
-   **Acción**: Se ha creado un sistema de formularios dinámicos y se ha integrado en la arquitectura de `BaseAdminPageComponent`.
-   **Propósito**: Eliminar la necesidad de codificar formularios HTML a mano en cada página de administración, siguiendo el principio DRY y acelerando el desarrollo.
-   **Cambios Realizados**:
    -   Se ha creado el nuevo componente reutilizable `UiDynamicFormComponent`, que renderiza campos de formulario a partir de una configuración de metadatos.
    -   Se ha definido la interfaz `FormField` en `form.types.ts` para estandarizar la configuración de los campos.
    -   Se ha refactorizado `BaseAdminPageComponent` para que construya el `FormGroup` dinámicamente en `ngOnInit` a partir de una nueva propiedad abstracta `formFields`.
    -   Se han actualizado los componentes `ContinentsAdminComponent` y `CountriesAdminComponent` para que simplemente definan su array `formFields`, eliminando la creación manual del `FormGroup`.
-   **Beneficio**: La creación de formularios para nuevas páginas de administración es ahora trivial y consiste únicamente en definir un array de configuración. El código es más limpio, mantenible y escalable.

---

### 23. Estandarización Global de la API de Componentes a `camelCase`

-   **Fecha**: 2025-10-22
-   **Acción**: Se ha llevado a cabo una refactorización masiva en toda la base de código del frontend para estandarizar la API pública de todos los componentes de UI a la convención `camelCase`.
-   **Propósito**: Solucionar una avalancha de errores de compilación causados por inconsistencias en los alias de los `@Input` (`camelCase` vs. `kebab-case`) y establecer una única convención clara para mejorar la mantenibilidad y la predictibilidad del código.
-   **Cambios Realizados**:
    -   Se han modificado todos los componentes de UI en `src/app/shared/components` para que sus alias de `@Input` y `@Output` sigan el patrón `uiComponentName`.
    -   Se han actualizado todas las plantillas (`.html`) que consumían estos componentes, incluyendo las plantillas de las páginas de administración y las plantillas internas de otros componentes de UI, para que usen la nueva sintaxis de binding (ej. `[uiIconName]="'...'"`).
    -   Se han corregido errores derivados de esta refactorización, como la importación de módulos innecesarios o el uso incorrecto de directivas de atributo.
-   **Beneficio**: La aplicación compila sin errores. Se ha eliminado una fuente masiva de deuda técnica y confusión. El código es ahora homogéneo, lo que facilita enormemente el desarrollo futuro y la incorporación de nuevas funcionalidades.

---

### 22. Implementación de la Lógica CRUD y UI en la Arquitectura Base

-   **Fecha**: 2025-10-22
-   **Acción**: Integración de la funcionalidad CRUD completa (botones, modales, selección) en la arquitectura base (`BaseAdminPageComponent` y `AdminPageManager`).
-   **Propósito**: Dotar a todas las páginas de administración de una interfaz de usuario interactiva y consistente para crear, editar y eliminar registros, manteniendo la lógica centralizada.
-   **Cambios Realizados**:
    -   **`AdminPageManager`**: Se ha mejorado para gestionar el estado de la selección de filas, exponiendo `signals` como `selectionCount` y `isSelectionEmpty`.
    -   **`BaseAdminPageComponent`**:
        -   Ahora contiene la lógica para manejar la visibilidad de los modales de formulario y confirmación (`isFormModalVisible`, `isConfirmModalVisible`).
        -   Implementa los métodos `onSave()`, `onDelete()`, `onEditSelected()` que se conectan con el servicio y el `manager`.
        -   Configura dinámicamente una barra de herramientas (`toolbarActions`) con botones de "Nuevo", "Editar" y "Eliminar", cuya disponibilidad (`disabled$`) reacciona al estado de la selección.
    -   **Plantillas de Componentes**: Se han actualizado las plantillas de `continents` y `countries` para incluir los componentes de UI necesarios (`ui-toolbar-buttons`, `ui-form-modal`) y conectarlos a la lógica heredada de la clase base.
    -   **Depuración**: Se ha solucionado un error de "contexto de inyección" (`NG0203`) moviendo la inicialización de `toolbarActions` (que usa `toObservable`) al `constructor` de la clase base, donde el contexto está garantizado.
-   **Beneficio**: Todas las páginas de administración heredan automáticamente una UI CRUD completamente funcional. La experiencia de usuario es consistente y la lógica de negocio sigue centralizada, cumpliendo con el principio DRY.

---

### 21. Refactorización a `BaseAdminPageComponent`: El Esqueleto Reutilizable

-   **Fecha**: 2025-10-22
-   **Acción**: Creación de la clase base abstracta `BaseAdminPageComponent` y refactorización de los componentes de administración para que hereden de ella.
-   **Propósito**: Maximizar la reutilización de código y establecer un "esqueleto" común para todas las páginas de administración, evitando la duplicación de la lógica de UI y la estructura de la plantilla.
-   **Cambios Realizados**:
    -   Se ha creado la nueva clase `BaseAdminPageComponent` en `src/app/shared/base-classes/`. Esta clase contiene la instancia de `AdminPageManager` y será el hogar de la lógica común para modales y acciones CRUD.
    -   Se ha refactorizado `ContinentsAdminComponent` y `CountriesAdminComponent` para que extiendan `BaseAdminPageComponent`. Su código se ha reducido drásticamente a la simple implementación de las propiedades abstractas requeridas por la clase base.
    -   Se ha corregido la arquitectura de herencia para que los componentes hijos declaren sus propias plantillas y dependencias de UI, en lugar de intentar heredarlas, lo cual no es soportado por Angular.
-   **Beneficio**: La creación de nuevas páginas de administración es ahora un proceso extremadamente rápido y consistente. La lógica común vive en un solo lugar, mejorando drásticamente la mantenibilidad y escalabilidad del proyecto.

---

### 20. Refactorización a `AdminPageManager`: La Solución Definitiva

-   **Fecha**: 2025-10-22
-   **Acción**: Creación de la clase de utilidad `AdminPageManager` y refactorización de los componentes de administración para usarla.
-   **Propósito**: Establecer un patrón de arquitectura robusto, reutilizable y fácil de mantener para todas las páginas de administración, solucionando de raíz los problemas de ciclo de vida que presentaba la `BaseAdminDirective`.
-   **Cambios Realizados**:
    -   Se ha creado la nueva clase `AdminPageManager` en `src/app/shared/utils/`. Esta clase encapsula toda la lógica de obtención de datos, paginación, búsqueda y ordenación.
    -   Se ha refactorizado `ContinentsAdminComponent` para instanciar y utilizar `AdminPageManager`, simplificando enormemente su código.
    -   Se ha refactorizado `CountriesAdminComponent` para seguir el mismo patrón, demostrando la reutilización y eficacia del nuevo enfoque.
    -   Se ha documentado el nuevo patrón en `LESSONS_LEARNED.md`, `WORKING_GUIDELINES.md` y con un `README.md` para la propia utilidad.
-   **Beneficio**: La aplicación es ahora estable y funcional. Los componentes de administración son extremadamente simples y la lógica compleja está centralizada en una clase de utilidad fácil de probar y mantener. Se ha establecido el estándar de oro para el desarrollo de futuras páginas de administración en el proyecto.

---

### 19. Refactorización Final: Eliminación de `BaseAdminDirective`

-   **Fecha**: 2025-10-22
-   **Acción**: Eliminación completa de la `BaseAdminDirective` y refactorización de los componentes de administración (`ContinentsAdminComponent`, `CountriesAdminComponent`) para que contengan su propia lógica de gestión de datos.
-   **Propósito**: Solucionar de raíz el error crítico y persistente `NG0950` causado por una condición de carrera en la inicialización de la directiva. El objetivo es reemplazar una abstracción frágil y compleja por un patrón más simple, explícito y robusto.
-   **Cambios Realizados**:
    -   Se ha eliminado el fichero `src/app/shared/directives/base-admin.directive.ts`.
    -   Se ha refactorizado `ContinentsAdminComponent` para implementar su propio flujo de datos reactivo usando `signals` para el estado y un `stream` de `RxJS` (`combineLatest` + `switchMap`) para las llamadas a la API.
    -   Se ha refactorizado `CountriesAdminComponent` para seguir exactamente el mismo patrón, asegurando la consistencia.
    -   Se han limpiado todas las referencias a la directiva eliminada en las plantillas y clases de los componentes.
-   **Beneficio**: La aplicación es ahora estable y funcional. Los componentes de administración son autónomos y su lógica es mucho más fácil de entender y depurar. Se ha establecido un patrón de arquitectura claro y exitoso para futuras páginas de administración.

---

## 2025-10-20: Depuración y Creación de Features

### 18. Creación y Depuración de la Sección de Continentes

-   **Fecha**: 2025-10-20
-   **Acción**: Creación de una nueva página de administración para la entidad "Continentes" y depuración de los errores de enrutamiento y compilación asociados.
-   **Propósito**: Validar el flujo de datos base (servicio -> componente -> tabla) en un entorno simplificado y, al mismo tiempo, expandir la funcionalidad de administración.
-   **Cambios Realizados**:
    -   **Creación de Componente**: Se crearon los archivos para `ContinentsAdminComponent`, `ContinentsService` y el tipo `Continent` en el frontend.
    -   **Depuración de Rutas**: Se solucionó un error `NG04002: Cannot match any routes` causado por una incorrecta ubicación de los archivos del nuevo componente. Se movieron los archivos a su propio directorio `features/admin/continents/` y se aseguró que la ruta de carga diferida en `admin.routes.ts` fuera correcta.
    -   **Depuración de `ActionService`**: Se corrigieron inconsistencias en los `routerLink` de `action.service.ts` para asegurar que todas las rutas de navegación del menú de administración fueran correctas, lo que contribuyó a estabilizar el enrutador.
    -   **Depuración de Compilación**: Se resolvieron errores de TypeScript (`TS2554`, `TS2515`) actualizando `ContinentsService` y `ContinentsAdminComponent` para alinearlos con la API refactorizada de `BaseCrudService` (que ahora requiere una propiedad `apiUrl` y `HttpParams` en el método `getAll`).
-   **Beneficio**: La nueva sección "Gestión de Continentes" es ahora funcional y sirve como un caso de prueba exitoso para la arquitectura CRUD. El proceso de depuración ha reforzado la importancia de la correcta organización de archivos y la sincronización entre las implementaciones y las interfaces base.

### 17. Implementación de Paginación "Cargar Más" y Corrección de PageSize

-   **Fecha**: 2025-10-20
-   **Acción**: Refactorización de la lógica de paginación en `BaseAdminDirective` para soportar un modo "Cargar Más" y corrección de un bug relacionado con el tamaño de página.
-   **Propósito**: Solucionar el problema por el cual el cambio de tamaño de página no se reflejaba en la UI y mejorar la experiencia de usuario al explorar grandes conjuntos de datos.
-   **Cambios Realizados**:
    -   **Corrección de Bug**: Se ha añadido el método `onPageSizeChange` a `BaseAdminDirective` para manejar el evento emitido por el paginador, actualizando el `pageSize$` y reseteando la paginación.
    -   **Lógica "Cargar Más"**:
        -   El `signal` `data` en la directiva ahora es un `WritableSignal` para permitir la acumulación de registros.
        -   Se ha utilizado el operador `scan` de RxJS en el stream principal para acumular los datos de las páginas sucesivas en lugar de reemplazarlos.
        -   Se ha añadido un nuevo método `loadMore()` que simplemente incrementa el número de página.
        -   Se ha creado un `computed signal` `canLoadMore` para controlar la visibilidad del nuevo control en la UI.
    -   **UI**: Se ha añadido un enlace "Cargar más resultados..." en la plantilla de las páginas de administración, que aparece dinámicamente cuando hay más registros por cargar.
-   **Beneficio**: El paginador ahora funciona correctamente al cambiar el tamaño de página. La nueva funcionalidad "Cargar Más" ofrece una alternativa más fluida a la paginación tradicional, mejorando la usabilidad en las tablas de administración.

### 16. Completado del Registro de Acciones de Navegación y Toolbar

-   **Fecha**: 2025-10-20
-   **Acción**: Adición de todas las acciones de navegación y de barra de herramientas al `ActionService`.
-   **Propósito**: Asegurar que el `ActionService` actúe como una fuente de verdad completa para todos los elementos interactivos de la UI, permitiendo que la navegación y las operaciones se construyan de forma dinámica y centralizada.
-   **Cambios Realizados**:
    -   Se han añadido al array `allActions` en `action.service.ts` las acciones para las páginas de autenticación (`login`, `register`).
    -   Se han añadido las acciones para todas las páginas de administración (`countries`, `languages`, `users`, `continents`, `regions`, `subregions`, `currencies`).
    -   Se han añadido las acciones de la barra de herramientas (`toolbar-save`, `toolbar-cancel`, `toolbar-add`, `toolbar-delete-selected`).
    -   Se han corregido los nombres de los iconos para alinearlos con el `IconService`.
-   **Beneficio**: El `ActionService` está ahora completo. El menú principal mostrará todas las secciones disponibles y los componentes como `BaseAdminDirective` podrán obtener la configuración de sus botones desde esta fuente central.

### 13. Implementación de Carga Diferida (Lazy Loading)

-   **Fecha**: 2025-10-20
-   **Acción**: Configuración y verificación de la estrategia de carga diferida para las rutas de la aplicación.
-   **Propósito**: Mejorar drásticamente el rendimiento inicial de la aplicación (Time to Interactive) al reducir el tamaño del paquete de JavaScript principal.
-   **Cambios Realizados**:
    -   **`app.routes.ts`**: Se ha configurado la ruta `/admin` para que utilice `loadChildren`. Esto agrupa todas las rutas de la sección de administración en un "chunk" que se carga bajo demanda.
    -   **`admin.routes.ts`**: Dentro de la sección de administración, cada sub-ruta (`dashboard`, `users`, etc.) utiliza `loadComponent` para cargar los componentes de página de forma individual y diferida.
-   **Beneficio**: El tiempo de carga inicial de la aplicación es significativamente más rápido, ya que el navegador solo descarga el código esencial para la página de inicio. El resto de las funcionalidades se cargan de forma transparente a medida que el usuario navega por la aplicación, mejorando la experiencia de usuario y la escalabilidad del enrutamiento.
-   **Nota**: Esta es una de las "Mejoras Futuras" clave mencionadas en la documentación principal, y con esto se da por completada.

### 12. Corrección de la Funcionalidad de Borrado Múltiple

-   **Fecha**: 2025-10-20
-   **Acción**: Refactorización de la lógica de borrado múltiple en `BaseAdminDirective`.
-   **Propósito**: Solucionar la inconsistencia crítica entre el frontend y el backend, donde el frontend intentaba enviar un array de IDs en una petición `DELETE` que el backend no soportaba.
-   **Cambios Realizados**:
    -   Se ha modificado el método `onDeleteSelected()` en `base-admin.directive.ts`.
    -   La nueva implementación itera sobre la lista de IDs seleccionados.
    -   Utiliza `forkJoin` para ejecutar una serie de peticiones `DELETE` individuales en paralelo, una por cada ID.
    -   Tras completarse todas las peticiones, se muestra una única notificación de éxito y se recargan los datos de la tabla.
-   **Beneficio**: La funcionalidad de "Eliminar Seleccionados" ahora es completamente funcional y está alineada con la API del backend sin necesidad de modificar este último. Se ha eliminado una inconsistencia arquitectónica clave.
-   **Nota**: Este cambio se realizó pero no se documentó inicialmente, lo que llevó a que la documentación (`README.md`) quedara desactualizada. Este registro corrige dicha omisión.

### 11. Revisión y Acción sobre el Informe de Auditoría

-   **Fecha**: 2025-10-20
-   **Acción**: Revisión de los hallazgos del `AUDIT_REPORT.md` del 2025-10-19 y confirmación de su estado.
-   **Propósito**: Asegurar que las desviaciones y oportunidades de mejora identificadas en la auditoría son abordadas, y documentar su resolución para evitar trabajo redundante.
-   **Estado de los Hallazgos**:
    -   **Uso de `@extend` en SCSS**: **Solucionado**. Este punto fue resuelto en el refactor de tipografía del 2025-10-20, donde se reemplazó `@extend` por un mixin dinámico (`heading-styles`).
    -   **Lógica de Agrupación en `UiHamburgerMenuComponent`**: **Solucionado**. La lógica de agrupación y mapeo de títulos fue centralizada en `ActionService` el 2025-10-20, siguiendo las recomendaciones.
    -   **Documentación Desactualizada (`frontend/README.md`)**: **Solucionado**. El `README.md` del frontend fue corregido para contener la información general del proyecto, no la de los estilos.
    -   **Cabeceras de Archivo Inconsistentes**: **Pendiente**. Es una tarea de bajo impacto que se irá corrigiendo progresivamente a medida que se modifiquen los archivos afectados.
-   **Beneficio**: Se tiene constancia de que el informe de auditoría ha sido procesado y sus puntos principales ya están resueltos, mejorando la eficiencia del desarrollo al no re-evaluar problemas ya solucionados.

### 10. Implementación y Depuración del Dashboard de Administración

-   **Fecha**: 2025-10-20
-   **Acción**: Conexión del Dashboard a la API, implementación de estados de carga y corrección de estilos.
-   **Propósito**: Transformar el dashboard estático en una página dinámica que consume datos reales del backend, asegurando una buena experiencia de usuario y una correcta visualización.
-   **Cambios Realizados**:
    -   **Conexión a la API**: Se implementó `DashboardService` utilizando `forkJoin` para obtener múltiples estadísticas en paralelo. Se añadió un manejo de errores robusto con `catchError` para que una petición fallida (como la de `/api/users`) no impida que el resto de las estadísticas se muestren.
    -   **Proxy de Desarrollo**: Se configuró un proxy (`proxy.conf.json`) y se actualizó `angular.json` para redirigir las peticiones `/api` al servidor del backend, solucionando los errores de CORS.
    -   **Depuración de Renderizado**: Se diagnosticaron y solucionaron varios problemas que impedían el renderizado del dashboard, incluyendo errores de enrutamiento (añadiendo una redirección por defecto en `admin.routes.ts`) y dependencias de componentes.
    -   **Corrección de Estilos**: Se corrigieron los nombres de las clases CSS en `UiStatCardComponent` para que coincidieran con su archivo de estilos, restaurando su apariencia visual.
    -   **Sistema de Iconos Centralizado**: Se definieron los tamaños de los iconos como variables CSS globales en `_variables.scss` (`--icon-size-xl`, etc.), creando un "design token" para los tamaños. Se ajustó el `UiStatCardComponent` para usar estos tamaños y un color de alto contraste (`--color-primary-contrast`), mejorando la prominencia y legibilidad de los iconos.
-   **Beneficio**: El dashboard ahora es completamente funcional, muestra datos reales del backend, tiene un estado de carga claro y su diseño visual es consistente con el sistema de diseño del proyecto.

### 9. Mejora de la Experiencia de Usuario en el Dashboard

-   **Fecha**: 2025-10-20
-   **Acción**: Implementación de un estado de carga (skeleton screen) para el grid de estadísticas del dashboard.
-   **Propósito**: Asegurar que la estructura del grid sea visible inmediatamente, incluso antes de que los datos de la API se hayan cargado, para evitar una pantalla en blanco y mejorar la percepción de rendimiento.
-   **Cambios Realizados**:
    -   Se ha utilizado el bloque `@empty` de la nueva sintaxis de control de flujo (`@for`) en `dashboard.component.html`.
    -   Cuando el `signal` `stats()` está vacío (durante la carga o en caso de error), se renderiza un conjunto de tarjetas de marcador de posición (`<app-ui-stat-card>`) con un estado de 'Cargando...'.
-   **Beneficio**: La página del dashboard ahora proporciona un feedback visual inmediato, mejorando la experiencia de usuario y eliminando el efecto de "página en blanco" durante la carga de datos.

## 2025-10-20: Refactorización y Alineación Arquitectónica

### 1. Refactor de Servicios: Centralización de Lógica de UI

-   **Fecha**: 2025-10-20
-   **Acción**: Centralización de la lógica de presentación de acciones en `ActionService`.
-   **Propósito**: Alinear el código con la arquitectura del proyecto (patrón `ActionService`) y el principio DRY.
-   **Cambios Realizados**:
    -   Se ha movido la lógica para agrupar acciones de navegación y mapear sus títulos de categoría desde `UiHamburgerMenuComponent` al `ActionService`.
    -   Se han creado los nuevos métodos `getGroupedNavActions()` y `getCategoryTitle()` en `ActionService`.
    -   `UiHamburgerMenuComponent` ha sido refactorizado para ser un componente "tonto" que simplemente consume los datos pre-procesados del servicio.
-   **Beneficio**: La lógica de negocio está ahora centralizada, mejorando la mantenibilidad y la reutilización. El `ActionService` se consolida como la única fuente de verdad para las acciones.

### 2. Refactor de Estilos (SCSS): Optimización de la Tipografía

-   **Fecha**: 2025-10-20
-   **Acción**: Optimización de la arquitectura de tipografía en SCSS.
-   **Propósito**: Mejorar la mantenibilidad, escalabilidad y adherencia al principio DRY en la gestión de los estilos de encabezado.
-   **Cambios Realizados**:
    -   **`_typography.scss`**: Se han reemplazado los múltiples mixins estáticos (e.g., `h1-base`) por un único mixin dinámico: `heading-styles($level)`. Se ha introducido un mapa de Sass (`$heading-styles-map`) para centralizar toda la configuración.
    -   **`_base.scss`**: Se ha actualizado para consumir el nuevo mixin dinámico, simplificando el código y asegurando que los estilos se obtienen de la fuente única de verdad.
-   **Beneficio**: El código de estilos es ahora más limpio y fácil de mantener. Cualquier cambio en la tipografía se realiza en un solo lugar, reduciendo la duplicación y el riesgo de errores.

### 3. Refactor de Estilos (SCSS): Centralización de la Carga de Módulos

-   **Fecha**: 2025-10-20
-   **Acción**: Refactorización de la arquitectura de carga de estilos globales.
-   **Propósito**: Simplificar el punto de entrada principal (`styles.scss`) y consolidar `_tools.scss` como el único punto de verdad para la configuración y carga de la base de estilos.
-   **Cambios Realizados**:
    -   **`_tools.scss`**: Ahora utiliza `@use` para cargar todos los parciales base (`_reset`, `_base`, `_grid`, etc.), además de reenviar (`@forward`) las herramientas.
    -   **`styles.scss`**: Se ha simplificado drásticamente. Su única responsabilidad ahora es cargar `_tools.scss` y aplicar el mixin del tema oscuro.
-   **Beneficio**: La arquitectura de estilos es más clara y mantenible. `_tools.scss` se convierte en el "índice" definitivo del sistema de diseño, facilitando la comprensión y la adición de nuevos ficheros de estilos globales.

### 4. Creación de la Página de Inicio (HomeComponent)

-   **Fecha**: 2025-10-20
-   **Acción**: Creación de un nuevo `HomeComponent` y establecimiento como la página de inicio principal.
-   **Propósito**: Definir una página de bienvenida limpia y alinear la ruta raíz (`/`) con la arquitectura de `features`.
-   **Cambios Realizados**:
    -   Se ha creado el nuevo `HomeComponent` en `src/app/features/public/home/`.
    -   Se ha configurado `app.routes.ts` para que cargue `HomeComponent` en la ruta `''`.
    -   Se ha eliminado el componente de "landing page" anterior, que ahora era redundante.
-   **Beneficio**: El proyecto tiene ahora una página de inicio clara y dedicada, se ha eliminado código muerto y se refuerza la estructura de directorios basada en features.

### 5. Corrección de Navegación: Añadir "Inicio" al Menú Principal

-   **Fecha**: 2025-10-20
-   **Acción**: Se ha añadido la acción de navegación para la página de inicio en `ActionService`.
-   **Propósito**: Solucionar la omisión del enlace a la página principal (`/`) en los menús de navegación de la aplicación.
-   **Cambios Realizados**:
    -   Se ha verificado y añadido la entrada `{ id: 'home', ... }` al array `allActions` en `action.service.ts`.
-   **Beneficio**: La navegación principal está ahora completa, permitiendo a los usuarios volver a la página de inicio de forma intuitiva desde cualquier punto de la aplicación.

### 6. Corrección Final del Enrutador y Limpieza

-   **Fecha**: 2025-10-20
-   **Acción**: Eliminación de ficheros de rutas obsoletos y corrección del enrutador principal.
-   **Propósito**: Solucionar el último error de compilación (`TS2307: Cannot find module`) que impedía el arranque de la aplicación.
-   **Cambios Realizados**:
    -   Se ha actualizado `app.routes.ts` para que cargue el nuevo `HomeComponent` directamente con `loadComponent`, eliminando la dependencia de ficheros de rutas intermedios.
    -   Se ha eliminado el fichero obsoleto `src/app/features/home/home.routes.ts` que aún hacía referencia al antiguo `HomeComponent`.
-   **Beneficio**: El proyecto compila limpiamente. La configuración de rutas es ahora más simple, moderna y está completamente alineada con la arquitectura de componentes `standalone`.

### 7. Creación del Dashboard de Administración

-   **Fecha**: 2025-10-20
-   **Acción**: Creación del `DashboardAdminComponent` como página principal de la sección de administración.
-   **Propósito**: Establecer una página de inicio para el área de administración que muestre estadísticas clave de la base de datos.
-   **Cambios Realizados**:
    -   Se ha creado el `DashboardAdminComponent` en `src/app/features/admin/dashboard/`.
    -   Se ha creado un `DashboardService` para obtener el total de registros de las entidades (`countries`, `continents`, etc.) desde la API.
    -   Se ha configurado la ruta `/admin` para cargar el nuevo dashboard.
    -   Se ha utilizado el componente `UiStatCardComponent` para visualizar las estadísticas.
-   **Beneficio**: La sección de administración tiene ahora una página de inicio funcional que proporciona una visión general del estado de los datos.

### 8. Depuración y Estabilización del Menú de Navegación

-   **Fecha**: 2025-10-20
-   **Acción**: Solución de errores de compilación y de ejecución en los componentes de UI.
-   **Propósito**: Lograr que el menú de hamburguesa (`UiHamburgerMenuComponent`) funcione correctamente y muestre todas las secciones de navegación.
-   **Cambios Realizados**:
    -   Se ha corregido un bug crítico en `UiButtonComponent` que causaba un `TypeError` al no manejar correctamente la ausencia de contenido proyectado, haciendo el componente más robusto.
    -   Se ha ajustado la plantilla de `UiHamburgerMenuComponent` para consumir correctamente la API de los componentes `UiAccordionComponent` y `UiIconComponent`.
    -   Se han eliminado los iconos de los enlaces del menú del acordeón para simplificar la interfaz, según solicitud.
-   **Beneficio**: La aplicación es ahora estable, sin errores de consola, y el menú de navegación principal funciona como se espera, mostrando todas las secciones y enlaces correctamente.

---

# Creación del Componente Reutilizable `UiSearchBoxComponent`

-   **Fecha**: 2025-10-19
-   **Acción**: Creación del nuevo componente compartido `UiSearchBoxComponent`.
-   **Propósito**: Proporcionar un componente de búsqueda reutilizable y de alto rendimiento, con lógica de "debounce" incorporada para optimizar las interacciones del usuario.
-   **Cambios Realizados**:
    -   Se han creado los ficheros `.ts`, `.html`, `.scss` y `README.md` en `src/app/shared/components/ui-search-box`.
    -   La lógica del componente utiliza una combinación de `signals` para el estado visual inmediato y `RxJS` (`Subject`, `debounceTime`) para gestionar la emisión de eventos de forma eficiente.
    -   La API del componente sigue las convenciones del proyecto, con `inputs` (`uiSearchBoxValue`, etc.) y `outputs` (`uiSearchBoxValueChange`) prefijados.
    -   Los estilos están completamente integrados con el sistema de diseño, utilizando variables CSS y la metodología BEM.

---

# Creación del Componente Reutilizable `UiPaginatorComponent`

-   **Fecha**: 2025-10-19
-   **Acción**: Creación del nuevo componente compartido `UiPaginatorComponent`.
-   **Propósito**: Proporcionar un componente de paginación moderno, reutilizable y totalmente alineado con la arquitectura del proyecto para la navegación en conjuntos de datos.
-   **Cambios Realizados**:
    -   Se han creado los ficheros `.ts`, `.html`, `.scss`, `.types.ts` y `README.md` en `src/app/shared/components/ui-paginator`.
    -   La lógica del componente se ha implementado utilizando `signals` para el estado y `computed signals` para los valores derivados (total de páginas, etc.), eliminando la necesidad de `ngOnChanges`.
    -   La API del componente sigue las convenciones del proyecto, con `inputs` (`uiPaginatorTotalRecords`, etc.) y `outputs` (`uiPaginatorPageChange`) prefijados.
    -   Los estilos se han adaptado para usar las variables CSS del sistema de diseño (`var(--color-...)`).
    -   La plantilla utiliza los componentes `app-ui-button` y `app-ui-icon` para una total consistencia visual con el resto de la aplicación.

---

# Pasos Realizados en la Reconstrucción del Frontend

Este documento registra el progreso realizado en la refactorización y reconstrucción del frontend.

## 32. Corrección de Ruta de Fichero (LayoutService)

-   **Fecha**: 2025-10-19
-   **Acción**: Corrección de la ubicación del fichero `layout.service.ts`.
-   **Propósito**: Solucionar errores de compilación (`TS2307`) persistentes causados por una ruta de fichero incorrecta que impedía la resolución del alias `@core`.
-   **Cambios Realizados**:
    -   Se ha movido el fichero `layout.service.ts` a su ubicación definitiva en `src/app/core/services/`.

---

## 31. Corrección de Ruta de `LayoutService`

-   **Fecha**: 2025-10-19
-   **Acción**: Corrección de la ubicación del fichero `layout.service.ts`.
-   **Propósito**: Solucionar errores de compilación (`TS2307`) causados por una ruta de importación incorrecta.
-   **Cambios Realizados**:
    -   Se ha movido el fichero `layout.service.ts` desde la raíz del proyecto a su ubicación correcta en `src/app/core/services/`.

---

## 30. Creación del Layout Principal de la Aplicación

-   **Fecha**: 2025-10-19
-   **Acción**: Creación y refactorización del esqueleto principal de la aplicación en `AppComponent`.
-   **Propósito**: Establecer una estructura visual coherente (header, content, footer) para todas las páginas y un mecanismo para títulos de página dinámicos.
-   **Cambios Realizados**:
    -   Se ha creado el `LayoutService` en `core/services` para gestionar el estado del layout, como el título de la página.
    -   Se ha refactorizado `app.component.html` para incluir una cabecera con el orden (menú, logo, título), un área de contenido principal y un pie de página.
    -   Se han actualizado los estilos en `app.component.scss` para implementar un layout flexible que ocupa toda la altura de la pantalla.

---

## 29. Documentación de la Arquitectura de Estilos

-   **Fecha**: 2025-10-19
-   **Acción**: Creación de la documentación para el sistema de diseño y estilos.
-   **Propósito**: Proporcionar una guía centralizada sobre la filosofía, estructura y uso de la arquitectura de estilos del proyecto.
-   **Cambios Realizados**:
    -   Se ha creado el fichero `src/styles/README.md` que detalla el funcionamiento del sistema de diseño.

---

## 28. Implementación del Nuevo Sistema de Diseño

-   **Fecha**: 2025-10-19
-   **Acción**: Integración de las nuevas directrices de diseño en la arquitectura de estilos existente.
-   **Propósito**: Unificar la apariencia de la aplicación, mejorar la accesibilidad y establecer una base sólida para el desarrollo de la interfaz de usuario.
-   **Cambios Realizados**:
    -   Se ha refactorizado `_variables.scss` para actualizar la paleta de colores, el sistema de espaciado y las variables de layout según las nuevas especificaciones.
    -   Se ha actualizado `_variables-dark.scss` para alinear el tema oscuro con la nueva paleta.
    -   Se ha creado un nuevo fichero `_grid.scss` que implementa un sistema de rejilla responsive (4 columnas en móvil, 12 en escritorio) siguiendo la metodología BEM.
    -   Se ha importado el nuevo sistema de rejilla en el fichero principal `styles.scss`.

---

## 27. Corrección de la API de `UiAccordionComponent`

-   **Fecha**: 2025-10-19
-   **Acción**: Corrección de la interacción entre `UiHamburgerMenuComponent` y `UiAccordionComponent`.
-   **Propósito**: Solucionar errores de compilación (`TS2322`, `NG8002`) causados por un entendimiento incorrecto de la API del acordeón.
-   **Cambios Realizados**:
    -   Se ha modificado la lógica para obtener una referencia a la `ng-template` con `@ViewChild` y asignarla a la propiedad `content` de cada `AccordionItem`.
    -   Se ha eliminado el binding incorrecto `[ui-accordion-item-template]` de la plantilla HTML.

---

## 26. Corrección de Errores de Binding en `UiHamburgerMenuComponent`

-   **Fecha**: 2025-10-19
-   **Acción**: Corrección de errores de binding en la plantilla de `UiHamburgerMenuComponent`.
-   **Propósito**: Solucionar errores de compilación (`TS2322`, `NG8002`) relacionados con el uso de `signals` y la API del `UiAccordionComponent`.
-   **Cambios Realizados**:
    -   Se ha modificado la plantilla para invocar el `computed signal` como una función (`accordionItems()`).
    -   Se ha corregido el nombre del input para la plantilla del acordeón a `[ui-accordion-item-template]`.

---

## 25. Corrección de Errores de Compilación en `UiHamburgerMenuComponent`

-   **Fecha**: 2025-10-19
-   **Acción**: Corrección de errores de sintaxis en la plantilla de `UiHamburgerMenuComponent`.
-   **Propósito**: Solucionar errores de compilación (`NG5002`) causados por una llave de cierre (`}`) y una etiqueta `</div>` sobrantes.
-   **Cambios Realizados**:
    -   Se ha limpiado el archivo `ui-hamburger-menu.component.html` para eliminar los elementos que rompían la plantilla.

---

## 24. Refactorización de `UiHamburgerMenuComponent`

-   **Fecha**: 2025-10-19
-   **Acción**: Refactorización completa del `UiHamburgerMenuComponent`.
-   **Propósito**: Convertir el menú desplegable simple en un panel lateral deslizable, mejorando la experiencia de usuario y alineándolo con los estándares modernos de navegación móvil.
-   **Cambios Realizados**:
    -   Se ha modificado la estructura HTML y los estilos (SCSS) para implementar un panel que se desliza desde la izquierda con un fondo superpuesto (`overlay`).
    -   Se ha simplificado la lógica del componente (`.ts`) utilizando `computed signals` para generar los items del acordeón de forma más declarativa.

---

## 23. Creación del Componente `UiHamburgerMenuComponent`

-   **Fecha**: 2025-10-19 15:45:00
-   **Acción**: Creación del componente `UiHamburgerMenuComponent`.
-   **Propósito**: Proporcionar un menú de navegación principal accesible a través de un botón de hamburguesa.
-   **Cambios Realizados**:
    -   El componente utiliza `ActionService` para obtener las acciones de navegación y las agrupa por categoría.
    -   Utiliza el nuevo componente `ui-accordion` para mostrar los grupos de enlaces de forma organizada.
    -   Se ha creado su documentación (`README.md`).

---

## 22. Creación del Componente Genérico `UiAccordionComponent`

-   **Fecha**: 2025-10-19 15:40:00
-   **Acción**: Creación del componente genérico y reutilizable `UiAccordionComponent`.
-   **Propósito**: Proporcionar un componente "tonto" para mostrar contenido en formato de acordeón, que será la base para el nuevo menú de hamburguesa.
-   **Cambios Realizados**:
    -   Se han creado los ficheros `.ts`, `.html`, `.scss` y `.types.ts`.
    -   El componente recibe un array de `AccordionItem` y utiliza `ng-template` para la proyección del contenido, haciéndolo muy flexible.
    -   Se ha creado su documentación (`README.md`).

---

## 21. Creación de `ActionService` para Centralizar la Lógica de Acciones

-   **Fecha**: 2025-10-19 15:30:00
-   **Acción**: Creación del nuevo servicio `ActionService` en `core/services`.
-   **Propósito**: Implementar un patrón arquitectónico para centralizar la definición de todas las acciones y enlaces de navegación de la aplicación.
-   **Cambios Realizados**:
    -   Se ha definido una interfaz genérica `AppAction`.
    -   El servicio contiene una lista de todas las acciones de la aplicación como única fuente de la verdad.
    -   Se ha implementado un método adaptador para transformar las acciones genéricas a formatos específicos de componentes de UI.

---

## 20. Creación del Componente Reutilizable `UiToggleCheckboxComponent`

-   **Fecha**: 2025-10-19 15:15:00
-   **Acción**: Creación del nuevo componente compartido `UiToggleCheckboxComponent`.
-   **Propósito**: Proporcionar un checkbox de tres estados (`checked`, `unchecked`, `indeterminate`) para usar en la selección de items en tablas.
-   **Cambios Realizados**:
    -   Se han creado los ficheros `.ts`, `.html`, `.scss` y `README.md`.
    -   Se ha añadido la variable de color `--color-warning-dark` a `_variables.scss`.

---

## 19. Creación del Componente Reutilizable `UiStatCardComponent`

-   **Fecha**: 2025-10-19 14:30:00
-   **Acción**: Creación del nuevo componente compartido `UiStatCardComponent`.
-   **Propósito**: Proporcionar una tarjeta de estadísticas reutilizable.
-   **Cambios Realizados**:
    -   Se han creado los ficheros `.ts`, `.html` y `.scss`.
    -   Se ha implementado un nuevo diseño de dos zonas verticales.

---

## 18. Corrección de Errores de Compilación en `UiToolbarButtonsComponent`

-   **Fecha**: 2025-10-19 13:10:00
-   **Acción**: Se ha corregido la plantilla de `UiToolbarButtonsComponent`.
-   **Propósito**: Solucionar una serie de errores de compilación (`NG8001`, `NG8002`).

---

## 17. Creación de Documentación para Componentes de UI

-   **Fecha**: 2025-10-19 12:50:00
-   **Acción**: Creación de archivos `README.md` para `ui-toolbar-buttons` y `ui-form-modal`.
-   **Propósito**: Documentar la API y el uso de los nuevos componentes.

---

## 16. Refactorización de `form-modal` a `ui-form-modal`

-   **Fecha**: 2025-10-19 12:45:00
-   **Acción**: Refactorización integral del `FormModalComponent` para renombrarlo a `UiFormModalComponent`.
-   **Propósito**: Alinear el componente con las convenciones de nomenclatura y API.

---

## 15. Auditoría y Refactorización de Estilos en `shared`

-   **Fecha**: 2025-10-19 12:40:00
-   **Acción**: Auditoría de todos los archivos `.scss` en `src/app/shared/`.
-   **Propósito**: Asegurar el cumplimiento de la directriz de no "hardcodear" colores.

---

## 14. Actualización de Directrices de Estilo

-   **Fecha**: 2025-10-19 12:35:00
-   **Acción**: Se ha añadido la sección 2.4 a `WORKING_GUIDELINES.md`.
-   **Propósito**: Formalizar la regla de no "hardcodear" colores.

---

## 13. Refactorización de `FormModalComponent` para usar `UiToolbarButtons`

-   **Fecha**: 2025-10-19 12:30:00
-   **Acción**: Refactorización del `FormModalComponent` para que utilice `UiToolbarButtonsComponent`.
-   **Propósito**: Centralizar la lógica de renderizado de botones.

---

## 12. Creación del Componente Reutilizable `UiToolbarButtonsComponent`

-   **Fecha**: 2025-10-19 12:25:00
-   **Acción**: Creación del componente `UiToolbarButtonsComponent`.
-   **Propósito**: Crear un componente de layout reutilizable para renderizar botones.

---

## 11. Meta-Revisión del Proceso y Refuerzo de Directrices

-   **Fecha**: 2025-10-19 12:20:00
-   **Acción**: Revisión del proceso de desarrollo y refuerzo de directrices.
-   **Propósito**: Asegurar el cumplimiento de la arquitectura.

---

## 10. Refactorización de `FormModalComponent` y Aplicación de Convenciones

-   **Fecha**: 2025-10-19 12:15:00
-   **Acción**: Refactorización del `FormModalComponent` para alinearlo con las convenciones.
-   **Propósito**: Asegurar que los componentes nuevos sigan los patrones de diseño.

---

## 9. Creación del Componente Reutilizable `FormModalComponent`

-   **Fecha**: 2025-10-19 12:10:00
-   **Acción**: Creación del componente `FormModalComponent`.
-   **Propósito**: Proporcionar un contenedor reutilizable para formularios.

---

## 8. Creación de Guía de Directrices y Refinamiento de Reglas

-   **Fecha**: 2025-10-19 12:05:00
-   **Acción**: Creación del archivo `WORKING_GUIDELINES.md`.
-   **Propósito**: Centralizar todas las reglas y convenciones del proyecto.

---

## 7. Auditoría y Estandarización de la Documentación

-   **Fecha**: 2025-10-19 12:00:00
-   **Acción**: Auditoría completa de la documentación existente.
-   **Propósito**: Asegurar que la documentación refleje el estado actual del código.

---

## 1. Definición de la Nueva Arquitectura de Directorios

(... resto del contenido sin cambios ...)

# Plan de Refactorización y Mejora

Este documento es la hoja de ruta para abordar la deuda técnica, mejorar la arquitectura y estandarizar el código del proyecto.

---

## Fase 1: Correcciones Críticas (✅ Completada)

**Estado:** Finalizada.

Esta fase se centró en solucionar dos problemas de alto impacto que afectaban directamente la funcionalidad y el rendimiento de la aplicación.

1.  **Borrado Múltiple Ineficiente (Frontend):**
    -   **Problema:** El frontend enviaba una petición `DELETE` por cada ítem seleccionado.
    -   **Solución:** Se ha modificado el método `onConfirmDeleteSelected` para que envíe una **única petición** masiva al endpoint `deleteMany` del backend.

2.  **Fallo en Refresh Token:**
    -   **Problema:** El frontend usaba `GET` para el refresh token, mientras que el backend esperaba `POST`.
    -   **Solución:** Se ha corregido el método `refreshToken` en `AuthService` para que utilice el verbo `POST`.

---

## Fase 2: Creación de Layout Genérico `UiAdminPageLayoutComponent`

**Estado:** En progreso.

**Objetivo:** Eliminar la duplicación masiva de código en las plantillas HTML de las páginas de administración.

### 2.1. Sub-fase 1: Centralización de Estilos (✅ Completada)

-   **Acción:** Se han extraído todos los estilos de layout comunes de las páginas de administración a un único archivo parcial (`_admin-page-layout.scss`).
-   **Resultado:** Se ha eliminado la duplicación de CSS y se ha asegurado una base de estilos consistente para todas las páginas.

### 2.2. Sub-fase 2: Creación y Validación del Componente de Layout (En progreso)

Esta fase se ha ejecutado con máxima precaución para evitar regresiones, validando cada paso en un entorno aislado.

-   **Paso 1: Crear Página de Prueba.**
    -   **Acción:** Crear una nueva página de administración temporal (`test-layout-admin`) que servirá como un "sandbox" seguro para el desarrollo del nuevo componente de layout.
    -   **Propósito:** Aislar el desarrollo y la depuración sin afectar a las páginas de administración que ya son funcionales.

-   **Paso 2: Crear el Esqueleto de `UiAdminPageLayoutComponent`.**
    -   **Acción:** Crear el nuevo componente `standalone` con su API pública (`@Input` y `@Output`) claramente definida.
    -   **Detalle Clave:** La plantilla del componente utilizará **Proyección de Contenido (`<ng-content></ng-content>`)**. Esto es fundamental para permitir que las páginas hijas (como `languages-admin`) puedan "inyectar" sus plantillas de columna personalizadas (`<ng-template>`) dentro de la tabla genérica del layout.

-   **Paso 3: Integrar y Validar en la Página de Prueba.**
    -   **Acción (✅ Completada):** Refactorizar la plantilla de la página de prueba (`test-layout-admin.component.html`) para que utilice el nuevo `<app-ui-admin-page-layout>`.
    -   **Proceso:** Se conectarán todas las propiedades y eventos de la página de prueba a los `@Input` y `@Output` del componente de layout.
    -   **Criterio de Éxito:** La página de prueba debe verse y funcionar exactamente igual que antes de la refactorización, pero con una plantilla drásticamente simplificada.

-   **Paso 4: Migración Gradual.**
    -   **Acción (✅ Completada):** Todas las páginas de administración (`areas-admin`, `languages-admin`, `area_types-admin`, `dependencies-admin`, `continents-admin`, `multilingualnames-admin`, `countries-admin`) han sido refactorizadas, una por una, para utilizar el `UiAdminPageLayoutComponent`.
    -   **Propósito:** Minimizar el riesgo y facilitar la depuración, asegurando una migración exitosa.

### Resultado Final Esperado

¡Todas las plantillas de las páginas de administración se han reducido a unas pocas líneas! Toda la estructura y el layout se delegan ahora al componente `UiAdminPageLayoutComponent`. El código es más limpio, mantenible y la creación de nuevas páginas de administración será un proceso mucho más rápido y menos propenso a errores.

---

## Fase 3: Actualización de la Documentación

**Estado:** ✅ Completada.

**Acción Realizada:** Se ha completado la actualización de toda la documentación clave del proyecto, incluyendo la alineación con la arquitectura actual, la creación de nuevos documentos de auditoría y la actualización exhaustiva de la guía de la API del backend para reflejar todas las funcionalidades implementadas.

---

## Fase 4: Mejoras de Arquitectura (✅ Completada)

**Estado:** Finalizada.

**Objetivo:** Realizar optimizaciones que mejoran la calidad y rendimiento del código del backend.

-   **Optimización de Base de Datos:**
    -   Se han modificado los métodos `create` y `update` en `baseService.ts` para usar la cláusula `RETURNING *` de SQLite, reduciendo las consultas a la base de datos de dos a una por operación.
-   **Separación de Responsabilidades en API:**
    -   Se ha refactorizado la API para mover toda la lógica de administración de usuarios (listar, eliminar, cambiar rol) de `/api/auth` a un nuevo enrutador dedicado y protegido: `/api/admin/users`. Esto clarifica las responsabilidades y mejora la seguridad.

---

## Fase 5: Centralización de Metadatos de Formularios (✅ Completada)

**Estado:** Finalizada.

**Objetivo:** Eliminar la duplicación de la configuración de los campos de formulario (`formFields`) en cada página de administración, centralizando su definición en una única "fuente de la verdad".

-   **Acciones Realizadas:**
    1.  **Creación de `field-definitions.config.ts`**: Se ha creado un registro central que contiene los metadatos para cada campo de cada entidad (etiquetas, validaciones, textos de ayuda, etc.).
    2.  **Creación de `FormBuilderService`**: Se ha implementado un servicio que lee el registro central y construye dinámicamente la configuración `formFields` que los componentes necesitan.
    3.  **Refactorización de Componentes**: Todas las páginas de administración (`countries-admin`, `users-admin`, etc.) han sido refactorizadas para utilizar este servicio, eliminando la definición manual de los campos.
    4.  **Mejora del Formulario Dinámico**: Se ha mejorado `UiDynamicFormComponent` para que respete los nuevos metadatos, implementando tooltips (`helpText`), límite de caracteres (`maxLength`) y conversión automática a mayúsculas/minúsculas (`characterCasing`).

-   **Beneficio:**
    -   **DRY (Don't Repeat Yourself)**: La definición de un campo ahora existe en un solo lugar.
    -   **Consistencia Garantizada**: Todos los formularios que usen un campo se comportarán y validarán de la misma manera.
    -   **Mantenimiento Simplificado**: Un cambio en la validación o etiqueta de un campo se hace en un único fichero.

---

## Fase 6: Mejoras de Usabilidad en Formularios (Próximo Paso)

**Estado:** En Planificación.

**Objetivo:** Mejorar la experiencia de usuario y la integridad de los datos en los formularios de administración, reemplazando los campos de texto para IDs foráneos por listas desplegables dinámicas.

-   **Acción Prioritaria:** Modificar el `UiDynamicFormComponent` y la interfaz `FormField` para que soporten un nuevo tipo de campo `'select'`.
-   **Implementación Inicial:** Aplicar esta mejora en el formulario de "Países" para que se pueda seleccionar el continente desde una lista desplegable.

---

## Funcionalidades Futuras (PosPuestas)

**Dashboard Avanzado con Gráficos:** Esta funcionalidad se ha pospuesto temporalmente para priorizar las mejoras de usabilidad en los formularios. Se retomará una vez que la entrada de datos y las relaciones entre entidades estén más consolidadas.

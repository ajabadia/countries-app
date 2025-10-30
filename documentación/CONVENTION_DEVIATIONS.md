// File: d:/desarrollos/countries2/documentación/CONVENTION_DEVIATIONS.md | New File

# Desviaciones de las Convenciones

Este documento registra las áreas del código que actualmente no cumplen con las directrices establecidas en `WORKING_GUIDELINES.md`. Sirve como una lista de "deuda técnica" a abordar.

---

### 1. Duplicación de Plantillas HTML en Páginas de Administración

-   **Desviación**: Violación del principio DRY (Don't Repeat Yourself).
-   **Ubicación**: `frontend/src/app/features/admin/*/`
-   **Descripción**: Las plantillas HTML de todas las páginas de administración (`countries-admin.component.html`, `languages-admin.component.html`, etc.) contienen una gran cantidad de código duplicado para el layout (título, barra de herramientas, tabla, paginador, modales).
-   **Plan de Corrección**: Fase 2 del `REFACTORING_PLAN.md`. Crear un componente de layout genérico `ui-admin-page-layout` para encapsular toda la estructura común.

---

*Este documento se actualizará a medida que se identifiquen o resuelvan nuevas desviaciones.*
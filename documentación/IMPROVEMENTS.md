// File: d:/desarrollos/countries2/documentación/IMPROVEMENTS.md | New File

# Sugerencias de Mejora

Este documento centraliza las ideas y sugerencias para mejorar la arquitectura, el rendimiento y la calidad general del código a largo plazo.

---

## Backend

### 1. Optimizar Operaciones de Escritura con `RETURNING`

-   **Área**: `backend/src/services/baseService.ts`
-   **Sugerencia**: Actualmente, los métodos `create` y `update` realizan dos consultas a la base de datos: una para escribir y otra para leer el registro actualizado. Se podría optimizar utilizando la cláusula `RETURNING *` de SQLite para obtener el registro modificado en una sola operación.
-   **Beneficio**: Reducción de la latencia y la carga sobre la base de datos.

### 2. Centralizar Gestión de Variables de Entorno

-   **Área**: Backend en general.
-   **Sugerencia**: Evaluar el uso de una librería como `Zod` para validar las variables de entorno al inicio de la aplicación. Esto evitaría errores en tiempo de ejecución si falta una variable o tiene un formato incorrecto.
-   **Beneficio**: Mayor robustez y fail-fast en el arranque del servidor.

---
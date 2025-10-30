<!-- File: d:\desarrollos\countries2\documentación\LESSONS_LEARNED.md | Last Modified: 2025-10-28 -->

# Lecciones Aprendidas del Proyecto

Este documento resume las conclusiones y lecciones arquitectónicas clave obtenidas durante el desarrollo. Su objetivo es consolidar el conocimiento y servir como guía de buenas prácticas para el futuro del proyecto.

---

## 1. Arquitectura y Patrones del Frontend

### 1.1. La Abstracción Correcta para Lógica Reutilizable

**Lección:** La primera iteración de la arquitectura de administración intentó centralizar toda la lógica en una `BaseAdminDirective`. Esto resultó ser una abstracción frágil y compleja, causando errores de ciclo de vida (`NG0950`) difíciles de depurar.

**Conclusión:**
## 2. Arquitectura Full-Stack y Comunicación

### 2.1. La Depuración Full-Stack es Holística

**Lección:** Un problema en un extremo de la aplicación puede manifestarse como un síntoma completamente diferente en el otro. La depuración del flujo de autenticación reveló que un error `404` en el frontend podía ser causado por la falta de un proxy, un error de validación por una discrepancia de nombres de campos, un fallo de token por una variable de entorno faltante en el backend, y un error de credenciales por datos inconsistentes en la base de datos.

**Conclusión:** La depuración exitosa requiere validar cada eslabón de la cadena: configuración del cliente (proxy), consistencia de los datos enviados, configuración del servidor (variables de entorno, CORS) y esquema de la base de datos.

### 2.2. La Autenticación Cross-Origin Requiere Configuración en Ambos Extremos

**Lección:** La sesión persistente no funcionaba porque el navegador no enviaba la cookie `HttpOnly` del `refresh_token` en peticiones de origen cruzado (de `localhost:4200` a `localhost:3000`).

**Conclusión:** Para que el envío de credenciales (cookies) funcione en un entorno de desarrollo, ambas partes deben estar de acuerdo:
1.  **Backend**: Debe responder con la cabecera `Access-Control-Allow-Credentials: true`.
2.  **Frontend**: Debe enviar las peticiones con la opción `withCredentials: true`. La forma más robusta de asegurar esto es en un `HttpInterceptor`.

### 2.3. Los Interceptores de Autenticación Deben ser Resilientes

**Lección:** Un interceptor de autenticación simple puede crear problemas graves en escenarios del mundo real, como bucles infinitos o condiciones de carrera.

**Conclusión:** Un interceptor de autenticación robusto debe:
1.  **Excluir sus Propias Fuentes de Error**: No debe intentar refrescar el token si el error 401 proviene de una ruta de autenticación (ej. `/api/auth/refresh-token`), para evitar bucles infinitos.
2.  **Manejar Condiciones de Carrera**: Si múltiples peticiones fallan a la vez, solo la primera debe disparar el refresco del token. Las demás deben ser encoladas y reintentadas una vez que se obtiene el nuevo token.

## 3. Proceso y Buenas Prácticas

### 3.1. La Configuración de Herramientas Debe Servir a las Convenciones

**Lección:** Las reglas por defecto de ESLint contradecían las convenciones de nomenclatura de `@Input` del proyecto.

**Conclusión:** Es fundamental adaptar la configuración de las herramientas de linting (`.eslintrc.json`) para que se alineen con las decisiones de arquitectura del proyecto, y no al revés.

### 3.2. La Documentación Debe Ser una Fuente de Verdad Viva

**Lección:** Se encontraron múltiples inconsistencias entre la documentación y la implementación real (ej. la API de `UiButtonComponent`, el verbo HTTP de un endpoint).

**Conclusión:** La documentación desactualizada es peor que la no existencia de documentación. Debe ser tratada como un artefacto vivo y actualizarse inmediatamente después de cualquier cambio en la API, la arquitectura o las reglas de negocio.

### 3.3. La Depuración de UI Empieza por lo Básico

**Lección:** Problemas de layout aparentemente complejos (elementos desalineados, superposición de `z-index`) resultaron ser causados por errores tipográficos en los nombres de clases CSS o archivos `.scss` mal nombrados o vacíos.

**Conclusión:** Antes de asumir problemas de arquitectura complejos, la depuración de UI debe empezar por verificar los fundamentos: ¿Se está aplicando el estilo? ¿El selector es correcto? ¿El nombre del archivo es el esperado? Las herramientas de desarrollo del navegador son el primer paso indispensable.
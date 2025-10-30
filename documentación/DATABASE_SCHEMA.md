<!-- File: d:\desarrollos\countries2\documentación\DATABASE_SCHEMA.md | Last Modified: 2025-10-29 -->

# Esquema de la Base de Datos

Este documento describe la estructura de las tablas para las dos bases de datos utilizadas en el proyecto: `auth.db` y `countries.db`.

---

## 1. Base de Datos de Autenticación (`auth.db`)

Esta base de datos gestiona toda la información relacionada con los usuarios y la seguridad.

### Tabla: `users`

Almacena la información de los usuarios, sus credenciales y el estado de su cuenta.

| Columna               | Tipo    | Restricciones                  | Descripción                                                                 |
| --------------------- | ------- | ------------------------------ | --------------------------------------------------------------------------- |
| `id`                  | INTEGER | PRIMARY KEY AUTOINCREMENT      | Identificador numérico único para cada usuario.                             |
| `name`                | TEXT    | NOT NULL                       | Nombre de usuario.                                                          |
| `email`               | TEXT    | NOT NULL, UNIQUE               | Dirección de correo electrónico del usuario, utilizada para el login.       |
| `password`            | TEXT    | NOT NULL                       | Contraseña del usuario, almacenada como un hash (bcrypt).                   |
| `role`                | TEXT    | NOT NULL, DEFAULT 'user'       | Rol del usuario en el sistema (ej. 'user', 'admin').                        |
| `failedLoginAttempts` | INTEGER | NOT NULL, DEFAULT 0            | Contador de intentos de inicio de sesión fallidos consecutivos.             |
| `lockUntil`           | INTEGER |                                | Timestamp (milisegundos) hasta el cual la cuenta está bloqueada.            |
| `resetPasswordToken`  | TEXT    |                                | Token único para el proceso de reseteo de contraseña.                       |
| `resetPasswordExpire` | INTEGER |                                | Timestamp de expiración para el `resetPasswordToken`.                       |
| `createdAt`           | DATETIME| DEFAULT CURRENT_TIMESTAMP      | Fecha y hora de creación del registro.                                      |
| `updatedAt`           | DATETIME| DEFAULT CURRENT_TIMESTAMP      | Fecha y hora de la última actualización del registro.                       |
| `refreshToken`        | TEXT    |                                | Almacena el último refresh token válido para el usuario.                    |

---

## 2. Base de Datos Principal (`countries.db`)

Esta base de datos contiene toda la información geográfica y de catálogo de la aplicación.

### Tabla: `countries`

Almacena la información principal de los países.

| Columna       | Tipo | Restricciones | Descripción                                      |
| ------------- | ---- | ------------- | ------------------------------------------------ |
| `id`          | TEXT | PRIMARY KEY   | Código ISO 3166-1 alfa-2 del país (ej. 'ES').    |
| `defaultname` | TEXT | NOT NULL      | Nombre común del país en inglés.                 |
| `alpha2may`   | TEXT |               | Código ISO 2 en mayúsculas (campo redundante).   |
| `alpha3may`   | TEXT | NOT NULL      | Código ISO 3166-1 alfa-3 del país (ej. 'ESP').   |
| `numeric`     | TEXT | NOT NULL      | Código numérico UN M.49 del país (ej. '724').    |
| `defaultname` | TEXT | NOT NULL      | Nombre del país en inglés.                       |


### Tabla: `continents`

Catálogo de continentes.

| Columna       | Tipo | Restricciones | Descripción                                        |
| ------------- | ---- | ------------- | -------------------------------------------------- |
| `id`          | TEXT | PRIMARY KEY   | Código de 2 letras para el continente (ej. 'EU').  |
| `defaultname` | TEXT | NOT NULL      | Nombre del continente en inglés.                   |

### Tabla: `languages`

Catálogo de idiomas.

| Columna  | Tipo    | Restricciones | Descripción                                        |
| -------- | ------- | ------------- | -------------------------------------------------- |
| `id`     | TEXT    | PRIMARY KEY   | Código ISO 639-1 del idioma (ej. 'es').          |
| `name`   | TEXT    | NOT NULL      | Nombre del idioma en inglés.                       |
| `active` | INTEGER | NOT NULL      | Flag booleano (0 o 1) para indicar si está activo. |

### Tabla: `areas`

Catálogo de áreas geográficas o económicas.

| Columna       | Tipo | Restricciones | Descripción                                          |
| ------------- | ---- | ------------- | ---------------------------------------------------- |
| `id`          | TEXT | PRIMARY KEY   | Código numérico de 3 dígitos como texto (ej. '001'). |
| `defaultname` | TEXT | NOT NULL      | Nombre del área en inglés.                           |

### Tabla: `area_types`

Tabla de unión que asocia áreas con tipos de área.

| Columna     | Tipo    | Restricciones             | Descripción                                      |
| ----------- | ------- | ------------------------- | ------------------------------------------------ |
| `id`        | INTEGER | PRIMARY KEY AUTOINCREMENT | Clave primaria subrogada para la relación.       |
| `area_id`   | TEXT    | NOT NULL                  | Clave foránea que referencia a `areas.id`.       |
| `area_type` | TEXT    | NOT NULL                  | Tipo de área (ej. 'Economic Block', 'Region').   |

*Constraint Adicional: `UNIQUE(area_id, area_type)`*

### Tabla: `dependencies`

Define relaciones de dependencia genéricas entre entidades. **Así es como se asocia un país a un continente.**

| Columna        | Tipo    | Restricciones             | Descripción                                      |
| -------------- | ------- | ------------------------- | ------------------------------------------------ |
| `id`           | INTEGER | PRIMARY KEY AUTOINCREMENT | Clave primaria subrogada para la relación.       |
| `parent_id`    | TEXT    | NOT NULL                  | ID de la entidad principal (ej. un continente como 'EU').        |
| `dependent_id` | TEXT    | NOT NULL                  | ID de la entidad dependiente (ej. un país como 'ES').|

### Tabla: `multilingualnames`

Almacena las traducciones de los nombres de las diferentes entidades.

| Columna     | Tipo    | Restricciones             | Descripción                                                              |
| ----------- | ------- | ------------------------- | ------------------------------------------------------------------------ |
| `id`        | INTEGER | PRIMARY KEY AUTOINCREMENT | Clave primaria subrogada para la traducción.                             |
| `entity_id` | TEXT    | NOT NULL                  | ID de la entidad a la que pertenece la traducción (ej. 'ES', 'EU').      |
| `language`  | TEXT    | NOT NULL                  | Código del idioma de la traducción (FK a `languages.id`).                |
| `value`     | TEXT    | NOT NULL                  | El nombre traducido (ej. 'España').                                      |
| `type`      | TEXT    | NOT NULL                  | Tipo de la entidad a la que pertenece el ID (ej. 'country', 'continent').|

*Constraint Adicional: `UNIQUE(entity_id, language, type)`*
# Feature: Dashboard de Administración

Esta carpeta contiene la funcionalidad para el dashboard principal del panel de administración.

## Propósito

El objetivo de este feature es proporcionar una vista de alto nivel con estadísticas clave de la aplicación, como el número total de países, continentes, usuarios, etc.

## Componentes

### `DashboardComponent`

- **Responsabilidad**: Es el componente principal de la página. Orquesta la obtención de datos y su visualización.
- **Lógica**: Inyecta `DashboardService` para cargar las estadísticas y las almacena en un `signal`. La plantilla utiliza un bucle `@for` para renderizar las tarjetas de estadísticas y un bloque `@empty` para mostrar un estado de carga.

### `DashboardService`

- **Responsabilidad**: Encapsula toda la lógica para comunicarse con la API y obtener los datos necesarios para el dashboard.
- **Lógica**: Utiliza `forkJoin` de RxJS para realizar múltiples peticiones `GET` a los endpoints de la API en paralelo. Si una petición falla, utiliza `catchError` para devolver un valor por defecto (0) y registrar el error, asegurando que el resto del dashboard pueda cargarse.

---
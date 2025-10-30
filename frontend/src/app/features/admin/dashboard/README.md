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
- **Lógica Dinámica y Extensible**:
    1.  Realiza una **única petición `GET`** al endpoint unificado `/api/admin/dashboard` del backend para obtener todos los conteos.
    2.  Obtiene todas las acciones de la categoría `'admin'` desde el `ActionService`.
    3.  **Construye dinámicamente** la lista de tarjetas de estadísticas (`Stat[]`) a partir de las acciones obtenidas. Para cada acción, utiliza su `label`, `icon` y `routerLink`, y asocia el conteo correspondiente que viene del backend.
- **Beneficio**: Este diseño hace que el dashboard sea **automáticamente extensible**. Si en el futuro se añade una nueva página de administración al `ActionService`, su tarjeta de estadísticas aparecerá en el dashboard sin necesidad de modificar este servicio.

---
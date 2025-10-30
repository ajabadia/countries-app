<!-- File: d:\desarrollos\countries2\documentación\FRONTEND_ADMIN_PATTERN_DIAGRAM.md | Last Modified: 2025-10-28 -->

# Diagrama de Arquitectura: Patrón de Páginas de Administración

Este diagrama ilustra el flujo de datos y eventos en la arquitectura de páginas de administración del frontend.

```mermaid
graph TD
    subgraph " "
        direction LR
        A(Flujo de Eventos del Usuario) --> B(Flujo de Datos Reactivo)
    end

    subgraph "Capa de Vista (Componentes 'Dumb')"
        style Layout fill:#D1E7DD,stroke:#198754,stroke-width:2px
        User(fa:fa-user Usuario)
        Layout[UiAdminPageLayoutComponent]

        User -- 1. Interactúa --> Layout
    end

    subgraph "Página de Administración (El 'Pegamento')"
        style AdminPage fill:#CFF4FC,stroke:#0D6EFD,stroke-width:2px
        AdminPage["
            <b>CountriesAdminComponent</b>
            (Hereda de BaseAdminPageComponent)
            - Define la configuración (columnas, campos)
            - Conecta la Vista con la Lógica
        "]
    end

    subgraph "Capas de Abstracción (Lógica Reutilizable)"
        style Manager fill:#FFF3CD,stroke:#FFC107,stroke-width:2px
        style BasePage fill:#F8D7DA,stroke:#DC3545,stroke-width:2px
        style CrudService fill:#E2D9F3,stroke:#6F42C1,stroke-width:2px

        BasePage(BaseAdminPageComponent)
        Manager(AdminPageManager)
        CrudService(CountriesService)
    end
    
    subgraph "Infraestructura"
        style ApiService fill:#6c757d,stroke:#343a40,stroke-width:2px,color:#fff
        ApiService[fa:fa-server Backend API]
    end

    %% --- Flujo de Eventos (Usuario -> Lógica) ---
    Layout -- "2. Emite @Output (ej. pageChange)" --> AdminPage
    AdminPage -- "3. Llama al método del Manager" --> Manager
    
    %% --- Flujo de Datos (Lógica -> Vista) ---
    Manager -- "4. Actualiza estado y llama al servicio" --> CrudService
    CrudService -- "5. Petición HTTP" --> ApiService
    ApiService -- "6. Devuelve datos JSON" --> CrudService
    CrudService -- "7. Retorna Observable con datos" --> Manager
    Manager -- "8. Actualiza 'signals' de datos (data, totalRecords)" --> AdminPage
    AdminPage -- "9. Pasa 'signals' como @Input" --> Layout

    %% --- Relaciones de Herencia y Composición ---
    AdminPage -.-> BasePage
    BasePage -- "Contiene una instancia de" --> Manager
    Manager -- "Utiliza una instancia de" --> CrudService

    classDef default fill:#fff,stroke:#333,stroke-width:2px
```

### Cómo Funciona el Patrón (Explicación del Diagrama):

1.  **Interacción del Usuario**: El usuario hace clic en un botón de paginación o escribe en la barra de búsqueda dentro del `UiAdminPageLayoutComponent`.
2.  **Emisión de Evento**: El componente de layout, al ser "tonto", no sabe qué hacer. Simplemente emite un evento (`@Output`), como `pageChange` o `searchChange`.
3.  **Manejo del Evento**: La página específica (ej. `CountriesAdminComponent`) captura este evento en su plantilla y llama al método correspondiente en la instancia del `AdminPageManager` (heredada de `BaseAdminPageComponent`).
4.  **Gestión de Estado**: El `AdminPageManager` actualiza su estado interno (ej. el `signal` de la página actual) y orquesta la llamada al servicio para obtener los nuevos datos.
5.  **Llamada a la API**: El servicio (`CountriesService`) realiza la petición HTTP al backend.
6.  **Retorno de Datos**: La API devuelve los datos solicitados.
7.  **Actualización de Estado**: El `AdminPageManager` recibe los datos y actualiza sus `signals` públicos (ej. `data()`, `totalRecords()`).
8.  **Flujo de Datos Reactivo**: Como la plantilla del `CountriesAdminComponent` enlaza los `@Input` del `UiAdminPageLayoutComponent` directamente a los `signals` del `manager` (`[data]="manager.data()"`), Angular detecta el cambio y actualiza automáticamente la vista.

Este ciclo **desacoplado y reactivo** es el corazón de la arquitectura, permitiendo que sea robusta, fácil de mantener y muy eficiente.
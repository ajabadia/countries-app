# Carpeta Compartida (Shared)

> Fecha de revisión: 2025-10-11 10:30 CEST

La carpeta **Shared** concentra todos los componentes, servicios y utilidades comunes/reutilizables de la aplicación. La mayoría de estos componentes son **Standalone**, lo que permite una importación granular y un mejor control de dependencias.

---

## Estructura

**Ruta principal**: `src/app/shared/` (o `src/app/modules/shared/`)

### Componentes Standalone disponibles:
- HeaderComponent  
- FooterComponent  
- LogoComponent  
- CopyrightComponent
- MenuBarComponent
- UiButtonComponent
- UiIconComponent
- UiHeadingComponent
- AdminMenuComponent
- UiStatCardComponent
- ToolbarButtonsComponent
- SearchBoxComponent
- PaginatorComponent
- TableComponent
- ToggleCheckboxComponent
- ModalComponent
- ConfirmDialogComponent

---

## Cómo usar los componentes Standalone

1. **Importa el componente** directamente en el array `imports` de otro componente Standalone o de un `NgModule`.

```typescript
import { UiButtonComponent } from 'src/app/shared/components/ui-button/ui-button.component';

@NgModule({
  imports: [UiButtonComponent], // O en los imports de un componente Standalone
})
export class FeatureModule { }
```

2. **Accede a cualquier componente exportado** sin necesidad de importar individualmente cada uno.

---

## Propósito y filosofía

- Diseñado para **máxima reutilización** de UI y lógica transversal.
- Reduce el boilerplate y facilita el desarrollo en equipo al centralizar elementos y estilos coherentes.
- Refleja el patrón Angular de creación de un módulo compartido para todas las piezas que no son específicas de ningún dominio/feature.

---

## Componentes destacados

- **TableComponent + PaginatorComponent**: Tabla de datos flexible con paginación, selección, orden y eventos integrados.
- **SearchBoxComponent**: Caja de búsqueda adaptable a múltiples dominios.
- **ModalComponent / ConfirmDialogComponent**: Modales y cuadros de diálogo para flujos UX universales.
- **UiButtonComponent / ToolbarButtonsComponent**: Botones e iconografía coherente con las directrices del proyecto.
- **FlagIconComponent**: Visualización avanzada de banderas ISO.
- **AdminMenuComponent / MenuBarComponent / HeaderComponent / FooterComponent**: Bloques estructurales para layout principal.

---

## Exportación

Todos los componentes listados están disponibles para uso inmediato tras importar el módulo. Además, se reexporta `FormsModule` para facilitar el uso de formularios reactivos y template-driven en cualquier feature que dependa de SharedModule.

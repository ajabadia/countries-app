# SharedModule

> Fecha de definición: 2025-10-10 16:55 CEST

El **SharedModule** concentra todos los componentes, utilidades y módulos comunes/reutilizables de la aplicación. Permite importar una única vez este módulo en cualquier otro módulo funcional (feature module) para acceder a una interfaz consistente, componentes de la UI y utilidades compartidas.

---

## Estructura

**Ruta principal**: `src/app/modules/shared/`

### Componentes declarados/exportados:
- HeaderComponent  
- FooterComponent  
- LogoComponent  
- CopyrightComponent
- MenuBarComponent
- UiButtonComponent
- UiHeadingComponent
- AdminMenuComponent
- UiStatCardComponent
- ToolbarButtonsComponent
- FlagIconComponent
- SearchBoxComponent
- PaginatorComponent
- TableComponent
- ToggleCheckboxComponent
- ModalComponent
- ConfirmDialogComponent

### Módulos importados:
- CommonModule  
- RouterModule  
- FormsModule

---

## Cómo usar este módulo

1. **Importa `SharedModule`** en cualquier módulo funcional donde necesites algún componente, servicio o pipe común:

```typescript
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule],
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

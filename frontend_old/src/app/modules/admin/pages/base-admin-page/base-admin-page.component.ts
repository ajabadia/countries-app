import { Directive } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Importaciones de componentes compartidos que se usarán en la plantilla
import { UiHeadingComponent } from '@shared/components/ui-heading/ui-heading.component';
import { ToolbarButtonsComponent } from '@shared/components/toolbar-buttons/toolbar-buttons.component';
import { SearchBoxComponent } from '@shared/components/search-box/search-box.component';
import { BaseAdminComponent } from '@services/base-admin.component';
import { TableComponent } from '@shared/components/table/table.component';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

/**
 * Este componente base contiene la plantilla HTML genérica para todas las páginas de administración.
 * No contiene lógica, solo la estructura visual. La lógica la hereda de BaseAdminComponent.
 * Se usa como una clase base de la que otros componentes pueden heredar la plantilla.
 * 
 * ✅ CAMBIO: Ahora hereda de BaseAdminComponent para tener la lógica y la plantilla en un solo lugar.
 * Es una directiva para que no se pueda instanciar directamente, solo heredar.
 */
@Directive()
export abstract class BaseAdminPageComponent<T extends { id: string | number }> extends BaseAdminComponent<T> {
  // Al heredar de BaseAdminComponent, ya tenemos todas las propiedades y métodos necesarios
  // para la plantilla (response$, isLoading, onSave, etc.). No necesitamos declarar
  // propiedades abstractas aquí.
}
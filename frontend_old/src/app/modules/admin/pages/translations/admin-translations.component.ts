import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

// Modelos y Servicios
import { TranslationsService } from '@services/translations.service';
import { TableColumn } from '@services/table-column.model';
import { Translation } from '@services/translation.model';
import { BaseAdminPageComponent } from '../base-admin-page/base-admin-page.component';

// Componentes Standalone necesarios para la plantilla
import { UiHeadingComponent } from '@shared/components/ui-heading/ui-heading.component';
import { ToolbarButtonsComponent } from '@shared/components/toolbar-buttons/toolbar-buttons.component';
import { SearchBoxComponent } from '@shared/components/search-box/search-box.component';
import { TableComponent } from '@shared/components/table/table.component';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component'; // ✅ CAMBIO: Importamos la nueva base

@Component({
  selector: 'app-admin-translations',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiHeadingComponent,
    ToolbarButtonsComponent,
    SearchBoxComponent,
    TableComponent,
    PaginatorComponent,
    ModalComponent,
    ConfirmDialogComponent,
  ],
  templateUrl: '../base-admin-page/admin-base-page.component.html', // ✅ CAMBIO: Usamos la plantilla genérica
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminTranslationsComponent extends BaseAdminPageComponent<Translation> { // ✅ CAMBIO: Heredamos de la nueva clase base
  // Inyectamos el servicio específico para esta entidad
  protected override entityService = inject(TranslationsService);

  // Definimos los nombres para la UI (títulos, botones, etc.)
  public override entityName = 'Traducción';
  public override entityNamePlural = 'Traducciones';

  // Configuramos las columnas que mostrará la tabla
  public override tableColumns: TableColumn<Translation>[] = [
    { key: 'name', label: 'Nombre', sortable: true },
    // Puedes añadir más columnas aquí si el modelo de 'Translation' es más complejo
  ];

  // Definimos el formulario reactivo para crear y editar la entidad
  public override form = this.fb.group({
    // ✅ CAMBIO: Añadimos el contenido del formulario que se proyectará en el modal
    name: ['', Validators.required],
    // Puedes añadir más campos aquí
  });
}

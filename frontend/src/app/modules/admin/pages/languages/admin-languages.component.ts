import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

// Modelos y Servicios
import { BaseAdminComponent } from '@services/base-admin.component';
import { LanguagesService } from '@services/languages.service';
import { Language } from '@models/language.model';
import { TableColumn } from '@services/table-column.model';

// Componentes Standalone necesarios (la mayoría ahora se gestionan en BaseAdminComponent)
import { UiHeadingComponent } from '@shared/components/ui-heading/ui-heading.component';
import { ToolbarButtonsComponent } from '@shared/components/toolbar-buttons/toolbar-buttons.component';
import { SearchBoxComponent } from '@shared/components/search-box/search-box.component';
import { TableComponent } from '@shared/components/table/table.component';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-languages',
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
  templateUrl: './admin-languages.component.html', // Ruta relativa al componente
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLanguagesComponent extends BaseAdminComponent<Language> {
  // Inyectamos el servicio específico para esta entidad
  protected override entityService = inject(LanguagesService);

  // Definimos los nombres para la UI (títulos, botones, etc.)
  public override entityName = 'Lenguaje';
  public override entityNamePlural = 'Lenguajes';

  // Configuramos las columnas que mostrará la tabla
  public override tableColumns: TableColumn<Language>[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Nombre', sortable: true, minWidth: '200px' },
    { key: 'active', label: 'Activo', type: 'status' } // Usamos el tipo 'status' para un renderizado especial
  ];

  // Definimos el formulario reactivo para crear y editar la entidad
  public override form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    active: [1, Validators.required]
  });
}

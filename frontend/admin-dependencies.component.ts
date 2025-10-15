// src/app/modules/admin/pages/dependencies/admin-dependencies.component.ts

import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

// Modelos y Servicios
import { BaseAdminComponent } from '@services/base-admin.component';
import { DependenciesService } from '@services/dependencies.service';
import { TableColumn } from '@services/table-column.model';

// Componentes Standalone necesarios
import { UiHeadingComponent } from '@shared/components/ui-heading/ui-heading.component';
import { ToolbarButtonsComponent } from '@shared/components/toolbar-buttons/toolbar-buttons.component';
import { SearchBoxComponent } from '@shared/components/search-box/search-box.component';
import { TableComponent } from '@shared/components/table/table.component';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-dependencies',
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
  templateUrl: './admin-dependencies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDependenciesComponent extends BaseAdminComponent<any> {
  // Inyectamos el servicio específico para esta entidad
  protected override entityService = inject(DependenciesService);

  // Definimos los nombres para la UI (títulos, botones, etc.)
  public override entityName = 'Dependencia';
  public override entityNamePlural = 'Dependencias';

  // Configuramos las columnas que mostrará la tabla
  public override tableColumns: TableColumn[] = [
    { key: 'name', label: 'Nombre', sortable: true },
  ];

  // Definimos el formulario reactivo para crear y editar la entidad
  public override form = this.fb.group({
    name: ['', Validators.required],
  });
}
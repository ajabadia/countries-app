// src/app/modules/admin/pages/areas/admin-areas.component.ts

import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

// Modelos y Servicios
import { BaseAdminComponent } from '@services/base-admin.component';
import { AreasService } from '@services/areas.service'; // Asumo que existe este servicio
import { TableColumn } from '@services/table-column.model';

// Componentes Standalone necesarios
import { UiHeadingComponent } from '@shared/components/ui-heading/ui-heading.component';
import { ToolbarButtonsComponent } from '@shared/components/toolbar-buttons/toolbar-buttons.component';
import { SearchBoxComponent } from '@shared/components/search-box/search-box.component';
import { TableComponent } from '@shared/components/table/table.component';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
// ✅ CORRECCIÓN: Importamos el formulario desde su nueva ubicación correcta.
import { AreaFormComponent } from '@shared/components/area-form/area-form.component';

@Component({
  selector: 'app-admin-areas',
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
    // AreaFormComponent, // Se comenta temporalmente para eliminar el warning. Se volverá a añadir al usarlo en el HTML.
  ],
  templateUrl: './admin-areas.component.html', // Asumo que existe una plantilla similar a la de countries
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminAreasComponent extends BaseAdminComponent<any> {
  protected override entityService = inject(AreasService);
  public override entityName = 'Área';
  public override entityNamePlural = 'Áreas';

  public override tableColumns: TableColumn<any>[] = [
    { key: 'name', label: 'Nombre', sortable: true },
  ];

  public override form = this.fb.group({
    name: ['', Validators.required],
  });
}
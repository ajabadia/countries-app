// src/app/modules/admin/pages/continents/admin-continents.component.ts

import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';

// Modelos y Servicios
import { BaseAdminComponent } from '@services/base-admin.component';
import { ContinentsService } from '@services/continents.service';
import { TableColumn } from '@services/table-column.model';

// Componentes Standalone necesarios
import { TableComponent } from '@shared/components/table/table.component';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { SearchBoxComponent } from '@shared/components/search-box/search-box.component';
import { ToolbarButtonsComponent } from '@shared/components/toolbar-buttons/toolbar-buttons.component';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { UiHeadingComponent } from '@shared/components/ui-heading/ui-heading.component';

@Component({
  selector: 'app-admin-continents',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    ReactiveFormsModule,
    TableComponent,
    PaginatorComponent,
    SearchBoxComponent,
    ToolbarButtonsComponent,
    ModalComponent,
    ConfirmDialogComponent,
    UiHeadingComponent, // ✅ AÑADIDO: Importamos el componente de título.
  ],
  // ✅ REFACTOR: La plantilla ahora está en la carpeta 'pages', por lo que la ruta es más simple.
  templateUrl: '../admin-base-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminContinentsComponent extends BaseAdminComponent<any> {
  protected override entityService = inject(ContinentsService);
  public override entityName = 'Continente';
  public override entityNamePlural = 'Continentes';

  public override tableColumns: TableColumn<any>[] = [
    // ✅ CORRECCIÓN: El backend devuelve 'id' y 'defaultname' para las entidades simples.
    { key: 'id', label: 'ID', sortable: true, width: '100px' },
    { key: 'defaultname', label: 'Nombre', sortable: true },
  ];

  public override form = this.fb.group({
    id: ['', Validators.required],
    defaultname: ['', Validators.required],
  });
}

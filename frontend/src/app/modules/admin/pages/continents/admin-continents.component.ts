import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

// Modelos y Servicios
import { BaseAdminComponent } from '@services/base-admin.component';
import { ContinentsService } from '@services/continents.service';
import { TableColumn } from '@services/table-column.model';

// Componentes Standalone necesarios
import { UiHeadingComponent } from '@shared/components/ui-heading/ui-heading.component';
import { TableComponent } from '@shared/components/table/table.component';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { SearchBoxComponent } from '@shared/components/search-box/search-box.component';
import { ToolbarButtonsComponent } from '@shared/components/toolbar-buttons/toolbar-buttons.component';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-continents',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiHeadingComponent,
    TableComponent,
    PaginatorComponent,
    SearchBoxComponent,
    ToolbarButtonsComponent,
    ModalComponent,
    ConfirmDialogComponent,
  ],
  templateUrl: './admin-continents.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminContinentsComponent extends BaseAdminComponent<any> {
  protected override entityService = inject(ContinentsService);
  public override entityName = 'Continente';
  public override entityNamePlural = 'Continentes';

  public override tableColumns: TableColumn[] = [
    { key: 'name', label: 'Nombre', sortable: true },
  ];

  public override form = this.fb.group({
    name: ['', Validators.required],
  });
}

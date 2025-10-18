import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

// Modelos y Servicios
import { AreasService } from '@services/areas.service';
import { TableColumn } from '@services/table-column.model';
import { Area } from '@services/area.model';
import { BaseAdminPageComponent } from '../base-admin-page/base-admin-page.component';

// Componentes Standalone necesarios para la plantilla
import { UiHeadingComponent } from '@shared/components/ui-heading/ui-heading.component';
import { ToolbarButtonsComponent } from '@shared/components/toolbar-buttons/toolbar-buttons.component';
import { SearchBoxComponent } from '@shared/components/search-box/search-box.component';
import { TableComponent } from '@shared/components/table/table.component';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-areas',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, UiHeadingComponent, ToolbarButtonsComponent, SearchBoxComponent, TableComponent, PaginatorComponent, ModalComponent, ConfirmDialogComponent ],
  templateUrl: '../base-admin-page/admin-base-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminAreasComponent extends BaseAdminPageComponent<Area> {
  protected override entityService = inject(AreasService);
  
  public override entityName = 'Área';
  public override entityNamePlural = 'Áreas';

  public override tableColumns: TableColumn<Area>[] = [
    { key: 'name', label: 'Nombre', sortable: true },
  ];

  public override form = this.fb.group({
    name: ['', Validators.required],
  });
}
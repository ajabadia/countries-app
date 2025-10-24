import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';

import { BaseAdminPageComponent } from '@app/shared/base-classes/base-admin-page.component';
import { UiHeadingComponent } from '@app/shared/components/ui-heading/ui-heading.component';
import { UiToolbarButtonsComponent } from '@app/shared/components/ui-toolbar-buttons/ui-toolbar-buttons.component';
import { UiSearchBoxComponent } from '@app/shared/components/ui-search-box/ui-search-box.component';
import { UiPaginatorComponent } from '@app/shared/components/ui-paginator/ui-paginator.component';
import { UiTableComponent } from '@app/shared/components/ui-table/ui-table.component';
import { UiFormModalComponent } from '@app/shared/components/ui-form-modal/ui-form-modal.component';
import { TableColumn } from '@app/shared/components/ui-table/table.types';
import { FormField } from '@app/shared/types/form.types';
import { UiTableColumnDirective } from '@app/shared/components/ui-table/ui-table-column.directive';
import { UiDynamicFormComponent } from '@app/shared/components/ui-dynamic-form/ui-dynamic-form.component';

import { AreasService } from './areas.service';
import { Area } from '@app/core/types/area.types';

@Component({
  selector: 'app-areas-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiHeadingComponent,
    UiToolbarButtonsComponent,
    UiSearchBoxComponent,
    UiPaginatorComponent,
    UiTableComponent,
    UiFormModalComponent,
    UiTableColumnDirective,
    UiDynamicFormComponent,
  ],
  templateUrl: './areas-admin.component.html',
  styleUrls: ['./areas-admin.component.scss'],
})
export class AreasAdminComponent extends BaseAdminPageComponent<Area> {
  // --- Implementación del "Contrato" de la clase base ---
  readonly actionId = 'admin-areas';
  service = inject(AreasService);
  columns: TableColumn<Area>[] = [];
  formFields: FormField[] = [
    {
      name: 'id',
      label: 'ID (Código de Área)',
      type: 'text',
      placeholder: 'Código numérico del área, tres dígitos numéricos con ceros a la izquierda',
      isPrimaryKey: true,
      validators: [Validators.required, Validators.pattern('^[0-9]{3}$')],
    },
    {
      name: 'defaultname',
      label: 'Nombre del Área',
      type: 'text',
      placeholder: 'Nombre del área',
      validators: [Validators.required, Validators.minLength(3)],
    },
  ];
  override searchableFields: (keyof Area)[] = ['id', 'defaultname'];

  constructor() {
    super();
    this.initializeColumns();
  }

  private initializeColumns(): void {
    this.columns = [
      { key: 'id', label: 'ID', sortable: true },
      { key: 'defaultname', label: 'Nombre', sortable: true, template: true },
    ];
  }
}
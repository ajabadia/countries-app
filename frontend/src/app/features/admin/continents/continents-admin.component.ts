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

import { ContinentsService } from './continents.service';
import { Continent } from '@app/core/types/continent.types';
import { UiDynamicFormComponent } from '@app/shared/components/ui-dynamic-form/ui-dynamic-form.component';

@Component({
  selector: 'app-continents-admin',
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
    UiDynamicFormComponent,
  ],
  templateUrl: './continents-admin.component.html',
})
export class ContinentsAdminComponent extends BaseAdminPageComponent<Continent> {
  // --- Implementación del "Contrato" de la clase base ---
  readonly actionId = 'admin-continents';
  service = inject(ContinentsService);
  columns: TableColumn<Continent>[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'defaultname', label: 'Nombre', sortable: true },
  ];
  formFields: FormField[] = [
    {
      name: 'id',
      label: 'ID (Código de Continente)',
      type: 'text',
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(2)],
    },
    {
      name: 'defaultname',
      label: 'Nombre del Continente',
      type: 'text',
      validators: [Validators.required, Validators.minLength(3)],
    },
  ];
  override searchableFields: (keyof Continent)[] = ['defaultname'];
}
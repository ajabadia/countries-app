import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { FormField } from '@app/shared/types/form.types';
import { CountriesService } from './countries.service';
import type { Country } from '@app/core/types/country.types';
import { TableColumn } from '@app/shared/components/ui-table/table.types';
import { BaseAdminPageComponent } from '@app/shared/base-classes/base-admin-page.component';
import { UiToolbarButtonsComponent } from '@app/shared/components/ui-toolbar-buttons/ui-toolbar-buttons.component';
import { UiHeadingComponent } from '@app/shared/components/ui-heading/ui-heading.component';
import { UiSearchBoxComponent } from '@app/shared/components/ui-search-box/ui-search-box.component';
import { UiTableComponent } from '@app/shared/components/ui-table/ui-table.component';
import { UiPaginatorComponent } from '@app/shared/components/ui-paginator/ui-paginator.component';
import { UiTableColumnDirective } from '@app/shared/components/ui-table/ui-table-column.directive';
import { UiIconComponent } from '@app/shared/components/ui-icon/ui-icon.component';
import { UiFormModalComponent } from '@app/shared/components/ui-form-modal/ui-form-modal.component';
import { UiDynamicFormComponent } from '@app/shared/components/ui-dynamic-form/ui-dynamic-form.component';

@Component({
  selector: 'app-countries-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiHeadingComponent,
    UiToolbarButtonsComponent,
    UiSearchBoxComponent,
    UiTableComponent,
    UiPaginatorComponent,
    UiTableColumnDirective,
    UiIconComponent,
    UiFormModalComponent,
    UiDynamicFormComponent,
  ],
  templateUrl: './countries-admin.component.html',
})
export class CountriesAdminComponent extends BaseAdminPageComponent<Country> {
  readonly actionId = 'admin-countries';
  service = inject(CountriesService);
  columns: TableColumn<Country>[] = [];
  formFields: FormField[] = [
    {
      name: 'id',
      label: 'ID (Código de País)',
      type: 'text',
      placeholder: 'Código iso país | dos letras minúsculas',
      isPrimaryKey: true,
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(3)],
    },
    { name: 'defaultname', label: 'Nombre', type: 'text', placeholder: 'Nombre del país', validators: [Validators.required] },
    {
      name: 'alpha2may',
      label: 'Código ISO2',
      type: 'text',
      placeholder: 'Código iso país | dos letras mayúsculas',
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(2)],
    },
    {
      name: 'alpha3may',
      label: 'Código ISO3',
      type: 'text',
      placeholder: 'Código iso país | tres letras mayúsculas',
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
    },
    {
      name: 'numeric',
      label: 'Código Numérico',
      type: 'text',
      placeholder: 'Código numérico del país, tres dígitos numéricos con ceros a la izquierda',
      validators: [Validators.required],
    },
  ];
  override searchableFields: (keyof Country)[] = ['id', 'defaultname', 'alpha2may', 'alpha3may', 'numeric'];

  constructor() {
    super();
    this.initializeColumns();
  }

  private initializeColumns(): void {
    this.columns = [
      { key: 'id', label: 'ID', sortable: true },
      { key: 'defaultname', label: 'Nombre', sortable: true, template: true },
      { key: 'alpha2may', label: 'ISO2', sortable: true },
      { key: 'alpha3may', label: 'ISO3', sortable: true },
      { key: 'numeric', label: 'Código Numérico', sortable: true },
    ];
  }
}
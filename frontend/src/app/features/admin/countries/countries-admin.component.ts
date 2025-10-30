
import { Component, inject } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { BaseAdminPageComponent } from '@app/shared/base-classes/base-admin-page.component';
import { UiFormModalComponent } from '@app/shared/components/ui-form-modal/ui-form-modal.component';
import { FormField } from '@app/shared/types/form.types';
import { UiTableColumnDirective } from '@app/shared/components/ui-table/ui-table-column.directive';
import { UiDynamicFormComponent } from '@app/shared/components/ui-dynamic-form/ui-dynamic-form.component';
import { UiAdminPageLayoutComponent } from '@app/shared/components/ui-admin-page-layout/ui-admin-page-layout.component';
import { UiIconComponent } from '@app/shared/components/ui-icon/ui-icon.component';
import { TableColumn } from '@app/shared/components/ui-table/table.types';

import { CountriesService } from './countries.service';
import { FormBuilderService } from '@app/shared/services/form-builder.service';
import { Country } from '@app/types/country.types';

@Component({
  selector: 'app-countries-admin',
  standalone: true,
  imports: [
    UiFormModalComponent,
    UiTableColumnDirective, // Se mantiene porque se usa en la ng-template.
    UiDynamicFormComponent, // Se usa dentro del modal.
    UiAdminPageLayoutComponent, // El nuevo componente de layout.
    UiIconComponent,
  ],
  templateUrl: './countries-admin.component.html',
  styleUrls: ['./countries-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesAdminComponent extends BaseAdminPageComponent<Country> {
  // --- Implementación del "Contrato" de la clase base ---
  readonly actionId = 'countries-admin'; // ID único para esta página
  private formBuilderService = inject(FormBuilderService);
  service = inject(CountriesService); 
  columns: TableColumn<Country>[] = [];
  formFields: FormField[] = this.formBuilderService.buildFormFields('countries');
  override searchableFields: (keyof Country)[] = ['id', 'defaultname'];

  constructor() {
    super();
    this.initializeColumns();
  }

  private initializeColumns(): void {
    this.columns = [
      { key: 'id', label: 'ISO 2', sortable: true },
      { key: 'defaultname', label: 'Nombre', sortable: true, template: true },
      { key: 'alpha2may', label: 'ISO 2 (Mayúsculas)', sortable: true },
      { key: 'alpha3may', label: 'ISO 3 (Mayúsculas)', sortable: true },
      { key: 'numeric', label: 'UN M49', sortable: true },
    ];
  }
}
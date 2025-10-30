
import { Component, inject } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { BaseAdminPageComponent } from '@app/shared/base-classes/base-admin-page.component';
import { UiFormModalComponent } from '@app/shared/components/ui-form-modal/ui-form-modal.component';
import { FormField } from '@app/shared/types/form.types';
import { UiTableColumnDirective } from '@app/shared/components/ui-table/ui-table-column.directive';
import { UiDynamicFormComponent } from '@app/shared/components/ui-dynamic-form/ui-dynamic-form.component';
import { UiAdminPageLayoutComponent } from '@app/shared/components/ui-admin-page-layout/ui-admin-page-layout.component';
import { TableColumn } from '@app/shared/components/ui-table/table.types';

import { ContinentsService } from './continents.service';
import { FormBuilderService } from '@app/shared/services/form-builder.service';
import { Continent } from '@app/types/continent.types';

@Component({
  selector: 'app-continents-admin',
  standalone: true,
  imports: [
    UiFormModalComponent,
    UiTableColumnDirective, // Se mantiene porque se usa en la ng-template.
    UiDynamicFormComponent, // Se usa dentro del modal.
    UiAdminPageLayoutComponent, // El nuevo componente de layout.
  ],
  templateUrl: './continents-admin.component.html',
  styleUrls: ['./continents-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContinentsAdminComponent extends BaseAdminPageComponent<Continent> {
  // --- Implementación del "Contrato" de la clase base ---
  readonly actionId = 'continents-admin'; // ID único para esta página
  private formBuilderService = inject(FormBuilderService);
  service = inject(ContinentsService);
  columns: TableColumn<Continent>[] = [];
  formFields: FormField[] = this.formBuilderService.buildFormFields('continents');
  override searchableFields: (keyof Continent)[] = ['id', 'defaultname'];

  constructor() {
    super();
    this.initializeColumns();
  }

  private initializeColumns(): void {
    this.columns = [
      { key: 'id', label: 'Código', sortable: true },
      { key: 'defaultname', label: 'Nombre', sortable: true, template: true },
    ];
  }
}
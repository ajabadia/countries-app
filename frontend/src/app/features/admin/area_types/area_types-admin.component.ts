
import { Component, inject } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { BaseAdminPageComponent } from '@app/shared/base-classes/base-admin-page.component';
import { UiFormModalComponent } from '@app/shared/components/ui-form-modal/ui-form-modal.component';
import { FormField } from '@app/shared/types/form.types';
import { UiTableColumnDirective } from '@app/shared/components/ui-table/ui-table-column.directive';
import { UiDynamicFormComponent } from '@app/shared/components/ui-dynamic-form/ui-dynamic-form.component';
import { UiAdminPageLayoutComponent } from '@app/shared/components/ui-admin-page-layout/ui-admin-page-layout.component';
import { TableColumn } from '@app/shared/components/ui-table/table.types';

import { AreaTypesService } from './area_types.service';
import { FormBuilderService } from '@app/shared/services/form-builder.service';
import { AreaType} from '@app/types/area_type.types';


@Component({
  selector: 'app-area_types-admin',
  standalone: true,
  imports: [
    UiFormModalComponent,
    UiTableColumnDirective, // Se mantiene porque se usa en la ng-template.
    UiDynamicFormComponent, // Se usa dentro del modal.
    UiAdminPageLayoutComponent, // El nuevo componente de layout.
  ],
  templateUrl: './area_types-admin.component.html',
  styleUrls: ['./area_types-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AreaTypesAdminComponent extends BaseAdminPageComponent<AreaType> {
  // --- Implementación del "Contrato" de la clase base ---
  readonly actionId = 'area_types-admin'; // ID único para esta página
  private formBuilderService = inject(FormBuilderService);
  service = inject(AreaTypesService);
  columns: TableColumn<AreaType>[] = [];
  formFields: FormField[] = this.formBuilderService.buildFormFields('area_types');
  override searchableFields: (keyof AreaType)[] = ['id', 'area_id', 'area_type'];

  constructor() {
    super();
    this.initializeColumns();
  }

  private initializeColumns(): void {
    this.columns = [
      { key: 'id', label: 'ID', sortable: true },
      { key: 'area_id', label: 'ID del Área', sortable: true, template: true },
      { key: 'area_type', label: 'Tipo de Área', sortable: true },
    ];
  }
}
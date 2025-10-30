
import { Component, inject } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { BaseAdminPageComponent } from '@app/shared/base-classes/base-admin-page.component';
import { UiFormModalComponent } from '@app/shared/components/ui-form-modal/ui-form-modal.component';
import { FormField } from '@app/shared/types/form.types';
import { UiTableColumnDirective } from '@app/shared/components/ui-table/ui-table-column.directive';
import { UiDynamicFormComponent } from '@app/shared/components/ui-dynamic-form/ui-dynamic-form.component';
import { UiAdminPageLayoutComponent } from '@app/shared/components/ui-admin-page-layout/ui-admin-page-layout.component';
import { TableColumn } from '@app/shared/components/ui-table/table.types';

import { DependenciesService } from './dependencies.service';
import { FormBuilderService } from '@app/shared/services/form-builder.service';
import { Dependency} from '@app/types/dependency.types';


@Component({
  selector: 'app-dependencies-admin',
  standalone: true,
  imports: [
    UiFormModalComponent,
    UiTableColumnDirective, // Se mantiene porque se usa en la ng-template.
    UiDynamicFormComponent, // Se usa dentro del modal.
    UiAdminPageLayoutComponent, // El nuevo componente de layout.
  ],
  templateUrl: './dependencies-admin.component.html',
  styleUrls: ['./dependencies-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DependenciesAdminComponent extends BaseAdminPageComponent<Dependency> {
  // --- Implementación del "Contrato" de la clase base ---
  readonly actionId = 'dependencies-admin'; // ID único para esta página
  private formBuilderService = inject(FormBuilderService);
  service = inject(DependenciesService);
  columns: TableColumn<Dependency>[] = [];
  formFields: FormField[] = this.formBuilderService.buildFormFields('dependencies');
  override searchableFields: (keyof Dependency)[] = ['id', 'parent_id', 'dependent_id'];

  constructor() {
    super();
    this.initializeColumns();
  }

  private initializeColumns(): void {
    this.columns = [
      { key: 'id', label: 'ID', sortable: true },
      { key: 'parent_id', label: 'ID de la Entidad Superior', sortable: true },
      { key: 'dependent_id', label: 'ID del dependiente', sortable: true, template: true },
    ];
  }
}
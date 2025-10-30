// File: d:\desarrollos\countries2\frontend\src\app\features\admin\areas\areas-admin.component.ts | Last Modified: 2025-10-28
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

import { AreasService } from './areas.service';
import { FormBuilderService } from '@app/shared/services/form-builder.service';
import { Area } from '@app/types/area.types';

@Component({
  selector: 'app-areas-admin',
  standalone: true,
  imports: [
    UiFormModalComponent,
    UiTableColumnDirective, // Se mantiene porque se usa en la ng-template.
    UiDynamicFormComponent, // Se usa dentro del modal.
    UiAdminPageLayoutComponent, // El nuevo componente de layout.
    UiIconComponent,
  ],
  templateUrl: './areas-admin.component.html',
  styleUrls: ['./areas-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AreasAdminComponent extends BaseAdminPageComponent<Area> {
  // --- Implementación del "Contrato" de la clase base ---
  readonly actionId = 'areas-admin';
  private formBuilderService = inject(FormBuilderService);
  service = inject(AreasService); 
  columns: TableColumn<Area>[] = [];
  formFields: FormField[] = this.formBuilderService.buildFormFields('areas');
  override searchableFields: (keyof Area)[] = ['id', 'defaultname'];

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
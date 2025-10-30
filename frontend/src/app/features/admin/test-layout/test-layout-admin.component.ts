// File: d:\desarrollos\countries2\frontend\src\app\features\admin\test-layout\test-layout-admin.component.ts | New File

import { Component, inject } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';

import { BaseAdminPageComponent } from '@app/shared/base-classes/base-admin-page.component';
import { UiFormModalComponent } from '@app/shared/components/ui-form-modal/ui-form-modal.component';
import { FormField } from '@app/shared/types/form.types';
import { UiTableColumnDirective } from '@app/shared/components/ui-table/ui-table-column.directive';
import { UiDynamicFormComponent } from '@app/shared/components/ui-dynamic-form/ui-dynamic-form.component';
import { UiAdminPageLayoutComponent } from '@app/shared/components/ui-admin-page-layout/ui-admin-page-layout.component';
import { TableColumn } from '@app/shared/components/ui-table/table.types';

import { ContinentsService } from '../continents/continents.service';
import { Continent } from '@app/types/continent.types';

@Component({
  selector: 'app-test-layout-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiFormModalComponent,
    UiTableColumnDirective, // Se mantiene porque se usa en la ng-template.
    UiDynamicFormComponent, // Se usa dentro del modal.
    UiAdminPageLayoutComponent, // El nuevo componente de layout.
  ],
  templateUrl: './test-layout-admin.component.html',
  styleUrls: ['./test-layout-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestLayoutAdminComponent extends BaseAdminPageComponent<Continent> {
  // --- Implementación del "Contrato" de la clase base ---
  readonly actionId = 'admin-test-layout'; // ID único para esta página
  service = inject(ContinentsService); // Reutilizamos el servicio de continentes para la prueba.
  columns: TableColumn<Continent>[] = [];
  formFields: FormField[] = [
    {
      name: 'id',
      label: 'Código del Continente',
      type: 'text',
      isPrimaryKey: true,
      validators: [Validators.required, Validators.pattern('^[0-9]{3}$')],
    },
    {
      name: 'defaultname',
      label: 'Nombre del Continente',
      type: 'text',
      validators: [Validators.required],
    },
  ];
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
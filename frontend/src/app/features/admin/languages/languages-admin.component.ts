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

import { LanguagesService } from './languages.service';
import { FormBuilderService } from '@app/shared/services/form-builder.service';
import { Language } from '@app/types/language.types';

@Component({
  selector: 'languages-layout-admin',
  standalone: true,
  imports: [
    UiFormModalComponent,
    UiTableColumnDirective, // Se mantiene porque se usa en la ng-template.
    UiDynamicFormComponent, // Se usa dentro del modal.
    UiAdminPageLayoutComponent, // El nuevo componente de layout.
    UiIconComponent, // ✅ Añadido para mostrar los iconos de idioma
  ],
  templateUrl: './languages-admin.component.html',
  styleUrls: ['./languages-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguagesAdminComponent extends BaseAdminPageComponent<Language> {
  // --- Implementación del "Contrato" de la clase base ---
  readonly actionId = 'admin-languages-layout'; // ID único para esta página
  private formBuilderService = inject(FormBuilderService);
  service = inject(LanguagesService); 
  columns: TableColumn<Language>[] = [];
  formFields: FormField[] = this.formBuilderService.buildFormFields('languages');
  override searchableFields: (keyof Language)[] = ['id', 'name'];

  constructor() {
    super();
    this.initializeColumns();
  }

  private initializeColumns(): void {
    this.columns = [
      { key: 'id', label: 'Código', sortable: true },
      { key: 'name', label: 'Nombre', sortable: true, template: true },
      { key: 'active', label: 'Activo', sortable: true, template: true }, // ✅ Habilitamos la plantilla
    ];
  }
}
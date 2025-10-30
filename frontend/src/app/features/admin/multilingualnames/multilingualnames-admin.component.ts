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

import { MultilingualnamesService } from './multilingualnames.service';
import { FormBuilderService } from '@app/shared/services/form-builder.service';
import { Multilingualname } from '@app/types/multilingualname.types';

@Component({
  selector: 'app-multilingualnames-admin',
  standalone: true,
  imports: [
    UiFormModalComponent,
    UiTableColumnDirective, // Se mantiene porque se usa en la ng-template.
    UiDynamicFormComponent, // Se usa dentro del modal.
    UiAdminPageLayoutComponent, // El nuevo componente de layout.
    UiIconComponent,
  ],
  templateUrl: './multilingualnames-admin.component.html',
  styleUrls: ['./multilingualnames-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultilingualnamesAdminComponent extends BaseAdminPageComponent<Multilingualname> {
  // --- Implementación del "Contrato" de la clase base ---
  readonly actionId = 'multilingualnames-admin'; // ID único para esta página
  private formBuilderService = inject(FormBuilderService);
  service = inject(MultilingualnamesService); 
  columns: TableColumn<Multilingualname>[] = [];
  formFields: FormField[] = this.formBuilderService.buildFormFields('multilingualnames');
  override searchableFields: (keyof Multilingualname)[] = ['id', 'value'];

  constructor() {
    super();
    this.initializeColumns();
  }

  private initializeColumns(): void {
    this.columns = [
      { key: 'id', label: 'ID', sortable: true },
      { key: 'entity_id', label: 'ID de la Entidad', sortable: true },
      { key: 'language', label: 'ID del Lenguaje', sortable: true, template: true },
      { key: 'value', label: 'Traducción', sortable: true, template: true },
      { key: 'type', label: 'Tipo', sortable: true },
    ];
  }

  /**
   * Determina el tipo de icono a mostrar basado en el tipo de entidad.
   * @param entityType El valor del campo 'type' de la entidad Multilingualname.
   * @returns El tipo de icono a usar en ui-icon.
   */
  getEntityIconType(entityType: string): string {
    switch (entityType) { // Comparamos directamente con los valores en minúsculas
      case 'lang': return 'lang-circle-flag';
      case 'country': return 'circle-flag';
      default: return 'area';
    }
  }
}
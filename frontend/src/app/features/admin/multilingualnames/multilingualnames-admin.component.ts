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

import { UiTableColumnDirective } from '@app/shared/components/ui-table/ui-table-column.directive';
import { UiDynamicFormComponent } from '@app/shared/components/ui-dynamic-form/ui-dynamic-form.component';
import { MultilingualnamesService } from './multilingualnames-admin.component.service';
import { Multilingualname } from '@app/core/types/multilingualname.types';
import { UiIconComponent } from '@app/shared/components/ui-icon/ui-icon.component';

@Component({
  selector: 'app-multilingualnames-admin',
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
    UiTableColumnDirective,
    UiDynamicFormComponent,
    UiIconComponent,
  ],
  templateUrl: './multilingualnames-admin.component.html',
  styleUrls: ['./multilingualnames-admin.component.scss'],
})
export class MultilingualnamesAdminComponent extends BaseAdminPageComponent<Multilingualname> {
  // --- Implementación del "Contrato" de la clase base ---
  readonly actionId = 'admin-multilingualnames';
  service = inject(MultilingualnamesService);
  columns: TableColumn<Multilingualname>[] = [];
  formFields: FormField[] = [
    {
      name: 'entity_id',
      label: 'ID de Entidad',
      type: 'text',
      placeholder: 'ID de la entidad a la que pertenece el nombre (ej. "ES" para España)',
      validators: [Validators.required],
    },
    {
      name: 'language',
      label: 'Idioma',
      type: 'text',
      placeholder: 'Código del idioma (ej. "en", "fr")',
      validators: [Validators.required, Validators.pattern('^[a-z]{2}$')],
    },
    {
      name: 'value',
      label: 'Valor (Nombre)',
      type: 'text',
      placeholder: 'El nombre en el idioma especificado',
      validators: [Validators.required],
    },
    {
      name: 'type',
      label: 'Tipo de Entidad',
      type: 'text',
      placeholder: 'Tipo de la entidad (ej. "country", "continent")',
      validators: [Validators.required],
    },
  ];
  override searchableFields: (keyof Multilingualname)[] = ['entity_id', 'language', 'value', 'type'];

  constructor() {
    super();
    this.initializeColumns();
  }

  private initializeColumns(): void {
    this.columns = [
      { key: 'type', label: 'Tipo', sortable: true },
      { key: 'entity_id', label: 'Entidad', sortable: true, template: true },
      { key: 'language', label: 'Idioma', sortable: true, template: true },
      { key: 'value', label: 'Nombre', sortable: true, template: true },
    ];
  }
}
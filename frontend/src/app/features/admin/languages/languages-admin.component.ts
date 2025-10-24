import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';

import { FormField } from '@app/shared/types/form.types';
import { LanguagesService } from './languages.service';
import type { Language } from '@app/core/types/language.types';
import { TableColumn } from '@app/shared/components/ui-table/table.types';
import { BaseAdminPageComponent } from '@app/shared/base-classes/base-admin-page.component';
import { UiToolbarButtonsComponent } from '@app/shared/components/ui-toolbar-buttons/ui-toolbar-buttons.component';
import { UiHeadingComponent } from '@app/shared/components/ui-heading/ui-heading.component';
import { UiSearchBoxComponent } from '@app/shared/components/ui-search-box/ui-search-box.component';
import { UiTableComponent } from '@app/shared/components/ui-table/ui-table.component';
import { UiPaginatorComponent } from '@app/shared/components/ui-paginator/ui-paginator.component';
import { UiIconComponent } from '@app/shared/components/ui-icon/ui-icon.component';
import { UiFormModalComponent } from '@app/shared/components/ui-form-modal/ui-form-modal.component';
import { UiTableColumnDirective } from '@app/shared/components/ui-table/ui-table-column.directive';
import { UiDynamicFormComponent } from '@app/shared/components/ui-dynamic-form/ui-dynamic-form.component';

@Component({
  selector: 'app-languages-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiHeadingComponent,
    UiToolbarButtonsComponent,
    UiSearchBoxComponent,
    UiTableComponent,
    UiPaginatorComponent,
    UiIconComponent,
    UiFormModalComponent,
    UiTableColumnDirective,
    UiDynamicFormComponent,
  ],
  templateUrl: './languages-admin.component.html',
  styleUrls: ['./languages-admin.component.scss'],
})
export class LanguagesAdminComponent extends BaseAdminPageComponent<Language> {
  readonly actionId = 'admin-languages';
  service = inject(LanguagesService);
  columns: TableColumn<Language>[] = [];
  formFields: FormField[] = [
    {
      name: 'id',
      label: 'ID (Código ISO 639-1)',
      type: 'text',
      placeholder: 'Código de 2 letras del idioma (ej. es, en)',
      isPrimaryKey: true,
      validators: [Validators.required, Validators.pattern('^[a-z]{2}$')],
    },
    {
      name: 'name',
      label: 'Nombre del Idioma',
      type: 'text',
      placeholder: 'Nombre del idioma (ej. Español, Inglés)',
      validators: [Validators.required, Validators.minLength(3)],
    },
    {
      name: 'active',
      label: 'Activo',
      type: 'boolean',
    },
  ];
  override searchableFields: (keyof Language)[] = ['id', 'name'];

  constructor() {
    super();
    this.initializeColumns();
  }

  private initializeColumns(): void {
    this.columns = [
      { key: 'id', label: 'ID', sortable: true },
      { key: 'name', label: 'Nombre', sortable: true, template: true },
      { key: 'active', label: 'Activo', sortable: true, template: true },
    ];
  }
}
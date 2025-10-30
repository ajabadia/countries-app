
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

import { UsersService } from './users.service';
import { FormBuilderService } from '@app/shared/services/form-builder.service';
import { User } from '@app/types/user.types';

@Component({
  selector: 'app-users-admin',
  standalone: true,
  imports: [
    UiFormModalComponent,
    UiTableColumnDirective, // Se mantiene porque se usa en la ng-template.
    UiDynamicFormComponent, // Se usa dentro del modal.
    UiAdminPageLayoutComponent, // El nuevo componente de layout.
    UiIconComponent,
  ],
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersAdminComponent extends BaseAdminPageComponent<User> {
  // --- Implementación del "Contrato" de la clase base ---
  readonly actionId = 'users-admin'; // ID único para esta página
  private formBuilderService = inject(FormBuilderService);
  service = inject(UsersService);
  columns: TableColumn<User>[] = [];
  formFields: FormField[] = this.formBuilderService.buildFormFields('users');
  override searchableFields: (keyof User)[] = ['id', 'name', 'email', 'role'];

  constructor() {
    super();
    this.initializeColumns();
  }

  private initializeColumns(): void {
    this.columns = [
      { key: 'id', label: 'ID', sortable: true },
      { key: 'name', label: 'Usuario', sortable: true, template: true }, // Habilitamos la plantilla
      { key: 'email', label: 'Email', sortable: true },
      { key: 'role', label: 'Rol', sortable: true },
    ];
  }
}
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';

import { BaseAdminPageComponent } from '@app/shared/base-classes/base-admin-page.component';
import { UiHeadingComponent } from '@app/shared/components/ui-heading/ui-heading.component';
import { UiTableComponent } from '@app/shared/components/ui-table/ui-table.component';
import { UiPaginatorComponent } from '@app/shared/components/ui-paginator/ui-paginator.component';
import { UiSearchBoxComponent } from '@app/shared/components/ui-search-box/ui-search-box.component';
import { UiToolbarButtonsComponent } from '@app/shared/components/ui-toolbar-buttons/ui-toolbar-buttons.component';
import { UiFormModalComponent } from '@app/shared/components/ui-form-modal/ui-form-modal.component';
import { UiDynamicFormComponent } from '@app/shared/components/ui-dynamic-form/ui-dynamic-form.component';

import { UsersService } from './users.service';
import type { User } from '@app/core/types/user.types';
import { FormField } from '@app/shared/types/form.types';
import { TableColumn } from '@app/shared/components/ui-table/table.types';

@Component({
  selector: 'app-users-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiHeadingComponent,
    UiTableComponent,
    UiPaginatorComponent,
    UiSearchBoxComponent,
    UiToolbarButtonsComponent,
    UiFormModalComponent,
    UiDynamicFormComponent,
  ],
  templateUrl: './users-admin.component.html',
})
export class UsersAdminComponent extends BaseAdminPageComponent<User> {
  readonly actionId = 'admin-users';
  service = inject(UsersService);
  columns: TableColumn<User>[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'username', label: 'Usuario', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Rol', sortable: true },
  ];
  formFields: FormField[] = [
    {
      name: 'username',
      label: 'Nombre de usuario',
      type: 'text',
      validators: [Validators.required, Validators.minLength(3)],
    },
    {
      name: 'email',
      label: 'Correo Electrónico',
      type: 'email',
      validators: [Validators.required, Validators.email],
    },
    {
      name: 'password',
      label: 'Contraseña',
      type: 'password',
      // La contraseña solo es obligatoria al crear. Al editar, si se deja en blanco, no se actualiza.
      // La lógica para esto se manejará en el `onSave` si es necesario.
    },
    {
      name: 'role',
      label: 'Rol',
      type: 'select',
      defaultValue: 'user',
      validators: [Validators.required],
      options: [
        { value: 'user', label: 'Usuario' },
        { value: 'admin', label: 'Administrador' },
      ],
    },
  ];
}

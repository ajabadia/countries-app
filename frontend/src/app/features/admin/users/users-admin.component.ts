// File: d:\desarrollos\countries2\frontend\src\app\features\admin\users\users-admin.component.ts | Last Modified: 2025-10-23

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';

import { BaseAdminPageComponent } from '@app/shared/base-classes/base-admin-page.component';
import { UiHeadingComponent } from '@app/shared/components/ui-heading/ui-heading.component';
import { UiToolbarButtonsComponent } from '@app/shared/components/ui-toolbar-buttons/ui-toolbar-buttons.component';
import { UiFormModalComponent } from '@app/shared/components/ui-form-modal/ui-form-modal.component';
import { UiDynamicFormComponent } from '@app/shared/components/ui-dynamic-form/ui-dynamic-form.component';
import { UiTableComponent } from '@app/shared/components/ui-table/ui-table.component';
import { UiPaginatorComponent } from '@app/shared/components/ui-paginator/ui-paginator.component';
import { UiSearchBoxComponent } from '@app/shared/components/ui-search-box/ui-search-box.component';
import { UiTableColumnDirective } from '@app/shared/components/ui-table/ui-table-column.directive';

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
    UiToolbarButtonsComponent,
    UiFormModalComponent,
    UiDynamicFormComponent,
    UiTableComponent,
    UiPaginatorComponent,
    UiSearchBoxComponent,
    UiTableColumnDirective,
  ],
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss'],
})
export class UsersAdminComponent extends BaseAdminPageComponent<User> {
  readonly actionId = 'admin-users';
  service = inject(UsersService);
  columns: TableColumn<User>[] = [];
  formFields: FormField[] = [
    {
      name: 'name',
      label: 'Nombre',
      type: 'text',
      placeholder: 'Nombre del usuario | Mínimo tres caracteres',
      validators: [Validators.required, Validators.minLength(3)],
    },
    {
      name: 'email',
      label: 'Correo Electrónico',
      type: 'email',
      placeholder: 'email@ejemplo.com',
      validators: [Validators.required, Validators.email],
    },
    {
      name: 'password',
      label: 'Contraseña',
      type: 'password',
      placeholder: 'Dejar en blanco para no cambiar | longitud mínima seis caracteres',
    },
    {
      name: 'role',
      label: 'Rol',
      type: 'select',
      placeholder: 'Seleccione una opción',
      validators: [Validators.required],
      options: [
        { value: 'user', label: 'Usuario' },
        { value: 'admin', label: 'Administrador' },
      ],
    },
  ];
  override searchableFields: (keyof User)[] = ['name', 'email'];

  constructor() {
    super();
    this.initializeColumns();
  }

  private initializeColumns(): void {
    this.columns = [
      { key: 'name', label: 'Nombre', sortable: true, template: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'role', label: 'Rol', sortable: true },
    ];
  }

  // Sobrescribimos openModal para manejar la validación de la contraseña.
  override openModal(item: User | null = null): void {
    const passwordControl = this.form.get('password');
    if (item) {
      // Al editar, la contraseña es opcional.
      passwordControl?.clearValidators();
    } else {
      // Al crear, la contraseña es obligatoria.
      passwordControl?.setValidators([Validators.required, Validators.minLength(6)]);
    }
    passwordControl?.updateValueAndValidity();
    super.openModal(item); // Llamamos al método original de la clase base.
  }
}

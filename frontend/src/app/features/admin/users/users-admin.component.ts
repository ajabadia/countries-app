import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseAdminDirective } from '@app/shared/directives/base-admin.directive';
import { UsersService } from './users.service';
import type { User } from '@app/core/types/user.types';
import { TableColumn } from '@app/shared/components/ui-table/table.types';

// Importamos los componentes de UI necesarios
import { UiTableComponent } from '@app/shared/components/ui-table/ui-table.component';
import { UiHeadingComponent } from '@app/shared/components/ui-heading/ui-heading.component';
import { UiPaginatorComponent } from '@app/shared/components/ui-paginator/ui-paginator.component';
import { UiSearchBoxComponent } from '@app/shared/components/ui-search-box/ui-search-box.component';
import { UiToolbarButtonsComponent, ToolbarButtonConfig } from '@app/shared/components/ui-toolbar-buttons/ui-toolbar-buttons.component';

@Component({
  selector: 'app-users-admin',
  standalone: true,
  imports: [
    CommonModule,
    UiTableComponent,
    UiHeadingComponent,
    UiPaginatorComponent,
    UiSearchBoxComponent,
    UiToolbarButtonsComponent,
  ],
  templateUrl: './users-admin.component.html',
})
export class UsersAdminComponent extends BaseAdminDirective<User> implements OnInit {
  private router = inject(Router);
  protected override fb = inject(FormBuilder);

  // Implementación de propiedades abstractas
  service = inject(UsersService);
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['user', Validators.required],
  });

  // Implementación de la propiedad abstracta para la búsqueda
  searchableFields: (keyof User)[] = ['name', 'email'];

  // Propiedades para el template
  pageTitle = 'Usuarios';
  columns: TableColumn<User>[] = [];
  toolbarActions: ToolbarButtonConfig[] = [];

  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit(); // Llamamos al ngOnInit de la directiva base
    this.pageTitle = 'Usuarios';
    this.columns = [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Nombre', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'role', label: 'Rol', sortable: true },
      { key: 'createdAt', label: 'Creado', sortable: true, type: 'date' },
    ];
    this.toolbarActions = [
      { id: 'new', label: 'Nuevo', iconName: 'icon-add', action: () => this.onToolbarAction('new') }
    ];
  }

  onToolbarAction(actionId: string): void {
    if (actionId === 'new') {
      this.openModal(); // Llama al método de la directiva base para abrir el modal
    }
  }
}
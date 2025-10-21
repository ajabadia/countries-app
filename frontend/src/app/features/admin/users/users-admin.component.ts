import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { PaginatorChangeEvent } from '@app/shared/components/ui-paginator/ui-paginator.types';

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

  override ngOnInit(): void {
    this.pageSize$.next(50); // Establecemos el tamaño de página inicial
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
      { id: 'new', label: 'Nuevo', iconName: 'icon-add', action: () => this.openModal() },
      { id: 'delete-selected', label: 'Eliminar seleccionados', iconName: 'icon-trash', action: () => this.onDeleteSelected(), disabled$: this.isSelectionEmpty$, color: 'danger' }
    ];
  }

  /**
   * Maneja el evento de cambio del paginador.
   * @param event El estado del paginador con la página y el tamaño de página.
   */
  onPaginatorChange(event: PaginatorChangeEvent): void {
    this.page$.next(event.page);
    this.pageSize$.next(event.pageSize);
  }
}

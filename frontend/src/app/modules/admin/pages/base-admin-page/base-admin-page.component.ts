import { Component, Directive } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Importaciones de componentes compartidos que se usarán en la plantilla
import { UiHeadingComponent } from '@shared/components/ui-heading/ui-heading.component';
import { ToolbarButtonsComponent } from '@shared/components/toolbar-buttons/toolbar-buttons.component';
import { SearchBoxComponent } from '@shared/components/search-box/search-box.component';
import { TableComponent } from '@shared/components/table/table.component';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

/**
 * Este componente base contiene la plantilla HTML genérica para todas las páginas de administración.
 * No contiene lógica, solo la estructura visual. La lógica la hereda de BaseAdminComponent.
 * Se usa como una clase base de la que otros componentes pueden heredar la plantilla.
 */
@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiHeadingComponent,
    ToolbarButtonsComponent,
    SearchBoxComponent,
    TableComponent,
    PaginatorComponent,
    ModalComponent,
    ConfirmDialogComponent,
  ],
  template: `
    <!-- Encabezado de la página -->
    <app-ui-heading [title]="entityNamePlural" />

    <!-- Barra de herramientas y búsqueda -->
    <div class="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
      <app-toolbar-buttons [buttons]="toolbarButtons" />
      <app-search-box (searchChange)="onSearchChange($event)" />
    </div>

    <!-- Tabla de datos -->
    <ng-container *ngIf="response$ | async as response">
      <app-table
        *ngIf="response"
        [columns]="tableColumns"
        [data]="response.data"
        [sort]="sort$ | async"
        (sortChange)="onSortChange($event)"
        [selection]="selection"
        (edit)="onEdit($event)"
      />

      <!-- Paginador -->
      <app-paginator
        *ngIf="response && response.total > 0"
        [currentPage]="page$ | async"
        [pageSize]="pageSize$ | async"
        [totalItems]="response.total"
        (pageChange)="onPageChange($event)"
      />
    </ng-container>

    <!-- Indicador de carga -->
    <div *ngIf="isLoading" class="text-center p-8">
      <p>Cargando...</p>
    </div>

    <!-- Aquí irían los modales y diálogos, que se renderizan fuera del flujo principal -->
    <!-- El contenido específico del formulario se proyectará con ng-content -->
  `,
})
export abstract class BaseAdminPageComponent<T extends { id: string | number }> {
  // Estas propiedades son requeridas por la plantilla y serán implementadas
  // por BaseAdminComponent y sus clases hijas.
  abstract entityNamePlural: string;
  abstract toolbarButtons: any[];
  abstract onSearchChange(event: any): void;
  abstract response$: any;
  abstract tableColumns: any[];
  abstract sort$: any;
  abstract onSortChange(event: any): void;
  abstract selection: any;
  abstract onEdit(event: any): void;
  abstract page$: any;
  abstract pageSize$: any;
  abstract onPageChange(event: any): void;
  abstract isLoading: boolean;
}
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

// Importaciones de componentes compartidos
import { AdminStateService } from '@app/modules/admin/services/admin-state.service'; // Ensure this path is correct
import { TableColumn } from '@services/table-column.model';
import { SortChangeEvent, TableComponent } from '@shared/components/table/table.component';
import { SelectionService } from '@services/selection.service';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component'; // Keep this for the component
import { PageChangeEvent } from '@shared/components/paginator/paginator.model'; // Import the type from its model file
import { ToolbarButtonConfig, ToolbarButtonsComponent } from '@shared/components/toolbar-buttons/toolbar-buttons.component';
import { SearchBoxComponent } from '@shared/components/search-box/search-box.component';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { UiHeadingComponent } from '@shared/components/ui-heading/ui-heading.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SearchBoxComponent,
    TableComponent,
    ToolbarButtonsComponent,
    ModalComponent,
    ConfirmDialogComponent,
    UiHeadingComponent,
    PaginatorComponent,
  ],
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent<T> {
  // Inyectar el servicio de estado
  public state = inject(AdminStateService<T>);

  // --- Inputs (propiedades que recibe del componente padre) ---
  // Se reducen drásticamente. Solo lo que es verdaderamente específico de la página.
  @Input() entityName!: string;
  @Input() entityNamePlural!: string;
  @Input.required() tableColumns!: TableColumn<T>[];
  @Input.required() toolbarButtons!: ToolbarButtonConfig[];
  @Input() editingEntity: T | null = null;
  @Input.required() form!: FormGroup;

  // --- Outputs (eventos que emite al componente padre) ---
  // These are now handled by the state service or are specific actions.
  @Output() searchChange = new EventEmitter<string | null>();
  @Output() sortChange = new EventEmitter<SortChangeEvent>();
  @Output() edit = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<PageChangeEvent>();
  @Output() save = new EventEmitter<void>();
  @Output() confirmDelete = new EventEmitter<void>();
}
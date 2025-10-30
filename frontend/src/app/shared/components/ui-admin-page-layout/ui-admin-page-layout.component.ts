// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-admin-page-layout\ui-admin-page-layout.component.ts

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ContentChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiSearchBoxComponent } from '@shared/components/ui-search-box/ui-search-box.component';
import { UiToolbarButtonsComponent } from '@shared/components/ui-toolbar-buttons/ui-toolbar-buttons.component';
import { UiTableComponent } from '@shared/components/ui-table/ui-table.component';
import { UiTableColumnDirective } from '@app/shared/components/ui-table/ui-table-column.directive';
import { UiPaginatorComponent } from '@shared/components/ui-paginator/ui-paginator.component';

import { SelectionService } from '@app/shared/services/selection.service';
import { PaginatorChangeEvent } from '@shared/components/ui-paginator/ui-paginator.types';
import { TableColumn } from '@shared/components/ui-table/table.types';
import { Sort } from '@app/shared/types/sort.type';
import { ToolbarButtonConfig } from '@app/types/action.types';

@Component({
  selector: 'app-ui-admin-page-layout',
  standalone: true,
  imports: [
    CommonModule,
    UiSearchBoxComponent,
    UiToolbarButtonsComponent,
    UiTableComponent,
    UiPaginatorComponent,
  ],
  templateUrl: './ui-admin-page-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiAdminPageLayoutComponent<T extends { id: number | string }> {
  // --- Inputs para recibir datos y configuración ---
  @Input({ required: true }) toolbarActions!: ToolbarButtonConfig[];
  @Input({ required: true }) columns!: TableColumn<T>[];
  @Input({ required: true }) data!: T[];
  @Input({ required: true }) isLoading!: boolean;
  @Input({ required: true }) sort!: Sort<T>;
  @Input({ required: true }) selection!: SelectionService<T>;
  @Input({ required: true }) totalRecords!: number;
  @Input({ required: true }) page!: number;
  @Input({ required: true }) pageSize!: number;

  // --- Outputs para emitir eventos de interacción ---
  @Output() searchChange = new EventEmitter<string>();
  @Output() toolbarAction = new EventEmitter<string>();
  @Output() tableAction = new EventEmitter<{ action: string; item: T }>();
  @Output() sortChange = new EventEmitter<Sort<T>>();
  @Output() pageStateChange = new EventEmitter<PaginatorChangeEvent>();

  // Captura las plantillas proyectadas desde el componente padre (ej. test-layout).
  @ContentChildren(UiTableColumnDirective) projectedColumns!: QueryList<UiTableColumnDirective>;
}

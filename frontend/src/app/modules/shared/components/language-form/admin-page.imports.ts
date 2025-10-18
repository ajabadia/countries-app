import { CommonModule, AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TableComponent } from '@shared/components/table/table.component';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { SearchBoxComponent } from '@shared/components/search-box/search-box.component';
import { ToolbarButtonsComponent } from '@shared/components/toolbar-buttons/toolbar-buttons.component';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { UiHeadingComponent } from '@shared/components/ui-heading/ui-heading.component';

export const ADMIN_PAGE_IMPORTS = [
  CommonModule,
  AsyncPipe,
  ReactiveFormsModule,
  TableComponent,
  PaginatorComponent,
  SearchBoxComponent,
  ToolbarButtonsComponent,
  ModalComponent,
  ConfirmDialogComponent,
  UiHeadingComponent,
];
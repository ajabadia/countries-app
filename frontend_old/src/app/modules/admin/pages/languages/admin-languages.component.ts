import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

// Modelos y Servicios
import { LanguagesService } from '@services/languages.service';
import { TableColumn } from '@services/table-column.model';
import { Language } from '@services/language.model';
import { BaseAdminPageComponent } from '../base-admin-page/base-admin-page.component';

// Componentes Standalone necesarios para la plantilla
import { UiHeadingComponent } from '@shared/components/ui-heading/ui-heading.component';
import { ToolbarButtonsComponent } from '@shared/components/toolbar-buttons/toolbar-buttons.component';
import { SearchBoxComponent } from '@shared/components/search-box/search-box.component';
import { TableComponent } from '@shared/components/table/table.component';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-languages',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, UiHeadingComponent, ToolbarButtonsComponent, SearchBoxComponent, TableComponent, PaginatorComponent, ModalComponent, ConfirmDialogComponent ],
  templateUrl: '../base-admin-page/admin-base-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLanguagesComponent extends BaseAdminPageComponent<Language> {
  protected override entityService = inject(LanguagesService);
  
  public override entityName = 'Idioma';
  public override entityNamePlural = 'Idiomas';

  public override tableColumns: TableColumn<Language>[] = [
    { key: 'name', label: 'Nombre', sortable: true },
    { key: 'active', label: 'Activo', sortable: true },
  ];

  public override form = this.fb.group({
    name: ['', Validators.required],
    active: [1, Validators.required],
  });
}
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

// Modelos y Servicios
import { CountriesService } from '@services/countries.service';
import { TableColumn } from '@services/table-column.model';
import { Country } from '@services/country.model';
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
  selector: 'app-admin-countries',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, UiHeadingComponent, ToolbarButtonsComponent, SearchBoxComponent, TableComponent, PaginatorComponent, ModalComponent, ConfirmDialogComponent ],
  templateUrl: '../base-admin-page/admin-base-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCountriesComponent extends BaseAdminPageComponent<Country> {
  protected override entityService = inject(CountriesService);
  
  public override entityName = 'País';
  public override entityNamePlural = 'Países';

  public override tableColumns: TableColumn<Country>[] = [
    { key: 'defaultname', label: 'Nombre', sortable: true },
    { key: 'alpha2may', label: 'Alpha-2', sortable: true },
    { key: 'alpha3may', label: 'Alpha-3', sortable: true },
    { key: 'numeric', label: 'Numérico', sortable: true },
  ];

  public override form = this.fb.group({
    defaultname: ['', Validators.required],
    alpha2may: ['', [Validators.required, Validators.maxLength(2)]],
    alpha3may: ['', [Validators.required, Validators.maxLength(3)]],
    numeric: [0, Validators.required],
  });
}
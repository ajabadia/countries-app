// src/app/modules/admin/pages/countries/admin-countries.component.ts

import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

// Modelos y Servicios
import { Country } from '@services/country.model';
import { CountriesService } from '@services/countries.service';
import { TableColumn } from '@services/table-column.model';
import { BaseAdminComponent } from '@services/base-admin.component';

// Componentes
import { UiHeadingComponent } from '@shared/components/ui-heading/ui-heading.component';
import { TableComponent } from '@shared/components/table/table.component';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { SearchBoxComponent } from '@shared/components/search-box/search-box.component';
import { ToolbarButtonsComponent } from '@shared/components/toolbar-buttons/toolbar-buttons.component';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
// ✅ Formulario específico para países
import { CountryFormComponent } from './components/country-form/country-form.component';

@Component({
  selector: 'app-admin-countries',
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
    CountryFormComponent
  ],
  templateUrl: './admin-countries.component.html',
  styleUrls: ['./admin-countries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCountriesComponent extends BaseAdminComponent<Country> {
  protected override entityService = inject(CountriesService);
  public override entityName = 'País';
  public override entityNamePlural = 'Países';

  // El icono que se mostrará en el heading y el modal.
  public override tableColumns: TableColumn[] = [
    { key: 'defaultname', label: 'Nombre', sortable: true },
    { key: 'alpha2may', label: 'Alpha-2', sortable: true },
    { key: 'alpha3may', label: 'Alpha-3', sortable: true },
    { key: 'numeric', label: 'Numérico', sortable: true },
  ];

  // Define el formulario reactivo para la entidad Country
  public override form = this.fb.group({
    defaultname: ['', Validators.required],
    alpha2may: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    alpha3may: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    numeric: [0, Validators.required],
  });
}
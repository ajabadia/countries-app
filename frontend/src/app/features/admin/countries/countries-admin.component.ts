import { Component, inject, OnDestroy, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesService } from './countries.service';
import type { Country } from '@app/core/types/country.types';
import { TableColumn } from '@app/shared/components/ui-table/table.types';
import { UiTableComponent } from '@app/shared/components/ui-table/ui-table.component';
import { UiHeadingComponent } from '@app/shared/components/ui-heading/ui-heading.component';
import { UiPaginatorComponent } from '@app/shared/components/ui-paginator/ui-paginator.component';
import { UiSearchBoxComponent } from '@app/shared/components/ui-search-box/ui-search-box.component';
import { UiTableColumnDirective } from '@app/shared/components/ui-table/ui-table-column.directive';
import { UiIconComponent } from '@app/shared/components/ui-icon/ui-icon.component';
import { AdminPageManager } from '@app/shared/utils/admin-page-manager';

@Component({
  selector: 'app-countries-admin',
  standalone: true,
  imports: [
    CommonModule,
    UiTableComponent,
    UiHeadingComponent,
    UiPaginatorComponent,
    UiSearchBoxComponent,
    UiTableColumnDirective,
    UiIconComponent,
  ],
  templateUrl: './countries-admin.component.html',
})
export class CountriesAdminComponent implements OnDestroy {
  pageTitle = 'Países';
  manager: AdminPageManager<Country>;
  columns: TableColumn<Country>[] = [];

  constructor() {
    this.initializeColumns();
    this.manager = new AdminPageManager<Country>();
    this.manager.init({
      service: inject(CountriesService),
      injector: inject(Injector),
      searchableFields: ['id', 'defaultname', 'alpha2may', 'alpha3may', 'numeric'],
    })
  }

  private initializeColumns(): void {
    this.columns = [
      { key: 'id', label: 'ID', sortable: true },
      { key: 'defaultname', label: 'Nombre', sortable: true, template: true },
      { key: 'alpha2may', label: 'ISO2', sortable: true },
      { key: 'alpha3may', label: 'ISO3', sortable: true },
      { key: 'numeric', label: 'Código Numérico', sortable: true },
    ];
  }

  ngOnDestroy(): void {
    this.manager.ngOnDestroy();
  }
}
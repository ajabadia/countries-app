import { Component, inject, OnDestroy, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiHeadingComponent } from '@app/shared/components/ui-heading/ui-heading.component';
import { UiTableComponent } from '@app/shared/components/ui-table/ui-table.component';
import { TableColumn } from '@app/shared/components/ui-table/table.types';

import { ContinentsService } from './continents.service';
import { Continent } from '@app/core/types/continent.types';
import { AdminPageManager } from '@app/shared/utils/admin-page-manager';

@Component({
  selector: 'app-continents-admin',
  standalone: true,
  imports: [CommonModule, UiHeadingComponent, UiTableComponent],
  templateUrl: './continents-admin.component.html',
})
export class ContinentsAdminComponent implements OnDestroy {
  pageTitle = 'Gestión de Continentes';
  manager: AdminPageManager<Continent>;

  constructor() {
    this.manager = new AdminPageManager<Continent>();
    this.manager.init({
      service: inject(ContinentsService),
      injector: inject(Injector),
    })
  }

  ngOnDestroy(): void {
    this.manager.ngOnDestroy();
  }

  columns: TableColumn<Continent>[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'defaultname', label: 'Nombre', sortable: true },
  ];
}
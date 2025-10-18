// src/app/modules/admin/pages/dependencies/admin-dependencies.component.ts

import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Validators } from '@angular/forms';

// Modelos y Servicios
import { BaseAdminComponent } from '@services/base-admin.component';
import { DependenciesService } from '@services/dependencies.service';
import { TableColumn } from '@services/table-column.model';

import { ADMIN_PAGE_IMPORTS } from '../admin-page.imports';

@Component({
  selector: 'app-admin-dependencies',
  standalone: true,
  imports: [...ADMIN_PAGE_IMPORTS],
  // ✅ REFACTOR: La plantilla ahora está en la carpeta 'pages', por lo que la ruta es más simple.
  templateUrl: '../admin-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDependenciesComponent extends BaseAdminComponent<any> {
  protected override entityService = inject(DependenciesService);

  public override entityName = 'Dependencia';
  public override entityNamePlural = 'Dependencias';

  public override tableColumns: TableColumn<any>[] = [
    { key: 'id', label: 'ID', sortable: true, width: '100px' },
    { key: 'defaultname', label: 'Nombre', sortable: true },
  ];

  public override form = this.fb.group({
    id: ['', Validators.required],
    defaultname: ['', Validators.required],
  });
}
// src/app/modules/admin/pages/continents/admin-continents.component.ts

import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Validators } from '@angular/forms';

// Modelos y Servicios
import { BaseAdminComponent } from '@services/base-admin.component';
import { ContinentsService } from '@services/continents.service';
import { TableColumn } from '@services/table-column.model';

import { ADMIN_PAGE_IMPORTS } from '../admin-page.imports';

@Component({
  selector: 'app-admin-continents',
  standalone: true,
  imports: [...ADMIN_PAGE_IMPORTS],
  // ✅ REFACTOR: La plantilla ahora está en la carpeta 'pages', por lo que la ruta es más simple.
  templateUrl: './../admin-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminContinentsComponent extends BaseAdminComponent<any> {
  protected override entityService = inject(ContinentsService);
  public override entityName = 'Continente';
  public override entityNamePlural = 'Continentes';

  public override tableColumns: TableColumn<any>[] = [
    // ✅ CORRECCIÓN: El backend devuelve 'id' y 'defaultname' para las entidades simples.
    { key: 'id', label: 'ID', sortable: true, width: '100px' },
    { key: 'defaultname', label: 'Nombre', sortable: true },
  ];

  public override form = this.fb.group({
    id: ['', Validators.required],
    defaultname: ['', Validators.required],
  });
}

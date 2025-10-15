// src/app/modules/admin/pages/continents/admin-continents.component.ts

import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';

// Modelos y Servicios
import { BaseAdminComponent } from '@services/base-admin.component';
import { ContinentsService } from '@services/continents.service';
import { TableColumn } from '@services/table-column.model';

// Componentes Standalone necesarios
import { UiHeadingComponent } from '@shared/components/ui-heading/ui-heading.component';

@Component({
  selector: 'app-admin-continents',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiHeadingComponent,
  ],
  templateUrl: './admin-continents.component.html', // Asumimos que usará una plantilla genérica
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminContinentsComponent extends BaseAdminComponent<any> {
  // Inyectamos el servicio específico para esta entidad
  protected override entityService = inject(ContinentsService);

  // Definimos los nombres para la UI (títulos, botones, etc.)
  public override entityName = 'Continente';
  public override entityNamePlural = 'Continentes';

  // Configuramos las columnas que mostrará la tabla
  public override tableColumns: TableColumn[] = [
    { key: 'name', label: 'Nombre', sortable: true },
  ];

  // Definimos el formulario reactivo para crear y editar la entidad
  public override form = this.fb.group({
    name: ['', Validators.required],
  });
}
// src/app/modules/admin/pages/languages/languages-page.component.ts

import { Component, inject } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseAdminComponent } from '@services/base-admin.component'; // Corregir ruta si es necesario
import { Language } from '@models/language.model';
import { LanguageAdminService } from '@services/language-admin.service';
import { TableColumn } from '@services/table-column.model';

@Component({
  selector: 'app-languages-page',
  templateUrl: './admin-page.component.html', // Reutilizamos la plantilla genérica
  styleUrls: ['./admin-page.component.scss']
})
export class LanguagesPageComponent extends BaseAdminComponent<Language> {
  // Inyectamos el servicio específico para esta entidad
  protected entityService = inject(LanguageAdminService);

  // Definimos las propiedades abstractas de la clase base
  public entityName = 'Idioma';
  public entityNamePlural = 'Idiomas';

  // Definimos las columnas para la tabla genérica
  public tableColumns: TableColumn<Language>[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre' },
    { key: 'active', label: 'Activo', type: 'status' } // Asumimos un tipo 'status' para mostrar un chip o icono
  ];

  // Definimos el formulario para el modal de creación/edición
  public form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    active: [1, Validators.required]
  });
}
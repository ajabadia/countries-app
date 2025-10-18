import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Validators } from '@angular/forms';

// Modelos y Servicios
import { Language } from '@services/language.model'; // Usamos el modelo que acabamos de corregir
import { LanguagesService } from '@services/languages.service';
import { TableColumn } from '@services/table-column.model';

// Componentes Base y Array de importaciones comunes
import { BaseAdminComponent } from '@services/base-admin.component';
import { ADMIN_PAGE_IMPORTS } from '../admin-page.imports';
// import { LanguageFormComponent } from '@shared/components/language-form/language-form.component';

@Component({
  selector: 'app-admin-languages',
  standalone: true,
  templateUrl: './../admin-page.component.html',
  imports: [...ADMIN_PAGE_IMPORTS /*, LanguageFormComponent */],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLanguagesComponent extends BaseAdminComponent<Language> {
  // --- Implementación de propiedades abstractas ---

  // 1. Inyectar el servicio específico
  protected entityService = inject(LanguagesService);
  
  // 2. Definir nombres para la UI
  public override entityName = 'Idioma';
  public override entityNamePlural = 'Idiomas';

  // 3. Definir las columnas de la tabla
  public override tableColumns: TableColumn<Language>[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre' },
    { key: 'active', label: 'Activo', type: 'status' },
  ];

  // 4. Definir el formulario de creación/edición
  public form = this.fb.group({
    name: ['', Validators.required],
    active: [1],
  });
}
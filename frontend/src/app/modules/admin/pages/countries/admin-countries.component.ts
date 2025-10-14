// src/app/modules/admin/pages/countries/admin-countries.component.ts

import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BaseCrudComponent } from '../base-crud.component';
import { Country } from 'src/app/modules/shared/models/country.model';
import { CountriesService } from 'src/app/core/services/countries.service';

// 🚨 ¡ATENCIÓN A ESTA RUTA! Si el error persiste, verifica que la ruta desde este archivo
// hasta '/components/country-form/country-form.component.ts' es correcta en tu proyecto.
import { CountryFormComponent } from './components/country-form/country-form.component';

import { SharedModule } from 'src/app/modules/shared/shared.module';
import { SelectionService } from 'src/app/modules/shared/components/services/selection/selection.service';
import { TableColumn } from 'src/app/modules/shared/models/table-column.model';

@Component({
  selector: 'app-admin-countries',
  standalone: true,
  imports: [ CommonModule, SharedModule, ReactiveFormsModule, CountryFormComponent ],
  templateUrl: './admin-countries.component.html',
  styleUrls: ['./admin-countries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SelectionService]
})
export class AdminCountriesComponent extends BaseCrudComponent<Country> {

  // === Implementación de Propiedades Abstractas ===
  public entityName = 'País';
  public entityNamePlural = 'Países';
  public formComponent = CountryFormComponent;

  // ✅ CORRECCIÓN CLAVE: Inyectamos el servicio directamente en la propiedad de la clase.
  // Esto cumple con el contrato de la clase base de forma inmediata.
  protected service: CountriesService = inject(CountriesService);
  
  // ✅ CORRECCIÓN CLAVE: Inyectamos el FormBuilder también como propiedad.
  private fb: FormBuilder = inject(FormBuilder);

  // ✅ CORRECCIÓN CLAVE: Inicializamos el formulario directamente como una propiedad,
  // ahora que 'this.fb' está garantizado que existe.
  public form: FormGroup = this.fb.group({
      id: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}$/)]],
      default_name: ['', [Validators.required, Validators.minLength(3)]],
      iso2: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}$/)]],
      numeric_code: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      phone_code: ['', [Validators.required, Validators.pattern(/^\d{1,5}$/)]],
      continent_id: ['', Validators.required],
      capital: [''],
      fatca_crs_oecd: [0, Validators.required],
      fatca_crs_oecd_date: [null],
      notes: ['']
  });

  public tableColumns: TableColumn[] = [
    { key: 'iso2', label: 'Bandera', cellType: 'flag', width: '80px' },
    { key: 'default_name', label: 'Nombre', sortable: true },
    { key: 'id', label: 'ISO3', sortable: true, width: '100px' },
    { key: 'numeric_code', label: 'Cód. Num.', sortable: true, width: '150px' },
    { key: 'phone_code', label: 'Prefijo Tel.', sortable: true, width: '150px' },
  ];

  // ✅ CORREGIDO: El constructor ahora solo necesita llamar a super().
  constructor() {
    super();
  }
}
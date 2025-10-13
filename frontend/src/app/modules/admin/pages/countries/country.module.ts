// src/app/modules/admin/pages/countries/country.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Importaciones relativas correctas según tu estructura de archivos
import { AdminCountriesComponent } from './admin-countries.component';
import { CountryTableComponent } from './components/country-table/country-table.component';
import { CountryModalComponent } from './components/country-modal/country-modal.component';

// Importamos SharedModule para tener acceso a componentes/directivas comunes.
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    // Aquí se declaran TODOS los componentes que pertenecen a este módulo.
    AdminCountriesComponent,
    CountryTableComponent,
    CountryModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule, // Necesario para los formularios reactivos en la modal.
    NgbModule,           // ¡CLAVE! Importar NgbModule aquí resuelve los errores de inyección de NgbModal.
  ],
  exports: [
    // Exportamos el componente "página" para que AdminModule pueda utilizarlo en su enrutamiento.
    AdminCountriesComponent
  ]
})
export class CountryModule { }
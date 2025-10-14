// src/app/modules/admin/pages/countries/country.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCountriesComponent } from './admin-countries.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    AdminCountriesComponent, // Importamos el componente de página standalone
  ],
  exports: [
    AdminCountriesComponent // Lo exportamos para que el router lo pueda usar
  ]
})
export class CountryModule { }
// src/app/modules/admin/admin.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CountryModule } from './pages/countries/country.module'; // Contiene la tabla, modal y servicios

import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './pages/dashboard/admin-dashboard.component';
import { AdminCountriesComponent } from './pages/countries/admin-countries.component'; // Se queda aquí para control
import { AdminContinentsComponent } from './pages/continents/admin-continents.component';
import { AdminAreasComponent } from './pages/areas/admin-areas.component';
import { AdminDependenciesComponent } from './pages/dependencies/admin-dependencies.component';
import { AdminLanguagesComponent } from './pages/languages/admin-languages.component';
import { AdminTranslationsComponent } from './pages/translations/admin-translations.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    AdminCountriesComponent, // Componente de página
    AdminContinentsComponent,
    AdminAreasComponent,
    AdminDependenciesComponent,
    AdminLanguagesComponent,
    AdminTranslationsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule, // Necesario para formularios reactivos en todos los componentes hijos
    CountryModule // Importa los componentes hijos: CountryTableComponent, CountryModalComponent, etc.
  ]
})
export class AdminModule { }

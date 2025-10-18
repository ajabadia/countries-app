import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin/admin.component';
import { AdminCountriesComponent } from './pages/countries/admin-countries.component';
import { AdminContinentsComponent } from './pages/continents/admin-continents.component';
import { AdminAreasComponent } from './pages/areas/admin-areas.component';
import { AdminDependenciesComponent } from './pages/dependencies/admin-dependencies.component';
import { AdminLanguagesComponent } from './pages/languages/admin-languages.component';
import { AdminTranslationsComponent } from './pages/translations/admin-translations.component';
@NgModule({
  declarations: [
    AdminComponent // Solo el layout que no es standalone (por ahora)
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }

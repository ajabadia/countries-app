// src/app/modules/admin/admin.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { SharedModule } from '../shared/shared.module';
import { AdminDashboardComponent } from './pages/dashboard/admin-dashboard.component'; // Importa el standalone

// Importamos los MÓDULOS de cada página
import { CountryModule } from './pages/countries/country.module';
import { AreasModule } from './pages/areas/areas.module';
import { ContinentsModule } from './pages/continents/continents.module';
import { DependenciesModule } from './pages/dependencies/dependencies.module';
import { LanguagesModule } from './pages/languages/languages.module';
import { TranslationsModule } from './pages/translations/translations.module';

@NgModule({
  declarations: [ AdminComponent ],
  imports: [
    CommonModule, AdminRoutingModule, SharedModule,
    // Módulos de cada sección
    CountryModule, AreasModule, ContinentsModule,
    DependenciesModule, LanguagesModule, TranslationsModule,
    // Componentes de página standalone
    AdminDashboardComponent
  ]
})
export class AdminModule { }
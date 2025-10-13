// src/app/modules/admin/admin.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';

// ¡CORREGIDO! Importamos el MÓDULO de países, no sus componentes directamente.
import { CountryModule } from './pages/countries/country.module';

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    // ¡CORREGIDO! AdminCountriesComponent NO se declara aquí.
    // Ya está declarado en CountryModule, que importamos abajo.
    // Declarar un componente en dos módulos causa el error "declared by more than one NgModule".
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    CountryModule // Al importar CountryModule, tenemos acceso a los componentes que este exporta (AdminCountriesComponent).
  ]
})
export class AdminModule { }
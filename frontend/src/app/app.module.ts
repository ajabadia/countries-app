// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';

// ¡IMPORTANTE! Se eliminan todas las importaciones de componentes de 'admin/' y 'public/'
// ya que están declarados en sus módulos perezosos correspondientes.

@NgModule({
  // Solo se declara el componente raíz
  declarations: [
    AppComponent, 
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    SharedModule, // Asumo que SharedModule contiene componentes usados por AppComponent
    HttpClientModule // Necesario para servicios globales como CountriesService
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
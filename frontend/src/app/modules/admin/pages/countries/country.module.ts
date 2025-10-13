import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Importa SharedModule si usas componentes compartidos como modals, botones o iconos.
import { SharedModule } from 'src/app/modules/shared/shared.module';

// Importa aquí todos tus componentes country
import { CountryTableComponent } from './components/country-table/country-table.component';
import { CountryModalComponent } from './components/country-modal/country-modal.component';
// IMPORTANTE: el nombre y path deben coincidir exactamente con tu componente tabla hijo.
import { HtmlCountryTableComponent } from './components/country-table/html-country-table/html-country-table.component';

@NgModule({
  declarations: [
    CountryTableComponent,      // Componente padre (gestiona lógica y muestra la tabla hijo)
    CountryModalComponent,      // Componente modal para países
    HtmlCountryTableComponent,  // Componente hijo desacoplado para la tabla de países

    // añade aquí otros relacionados, como country-confirm-dialog si lo creas igual de modular
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
    // importa aquí SharedModule si usas componentes compartidos dentro (botones, modals, inputs...)
  ],
  exports: [
    CountryTableComponent,
    CountryModalComponent,
    // Si necesitas exponer la tabla hija fuera (raro, si solo la usas adentro puedes quitarla)
    HtmlCountryTableComponent
    // y cualquiera que necesites usar fuera de este módulo
  ]
})
export class CountryModule {}

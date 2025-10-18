// src/app/modules/public/pages/countries/countries.component.ts

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

// --- Componentes Standalone ---
import { UiHeadingComponent } from '@shared/components/ui-heading/ui-heading.component';
import { SearchBoxComponent } from '@shared/components/search-box/search-box.component';
// NOTA: Aquí deberías importar los componentes para mostrar los países, como una lista o tarjetas.

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [
    CommonModule,
    UiHeadingComponent,
    // SearchBoxComponent, // Eliminado temporalmente para quitar el warning
  ],
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'], // Asumo que existe un archivo de estilos
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesComponent {}
// src/app/modules/public/pages/countries/countries.component.ts

import { Component } from '@angular/core';
// ✅ CORREGIDO: Importamos SharedModule para que la plantilla pueda usar <app-ui-heading>
import { SharedModule } from '../../../shared/shared.module';

@Component({
    selector: 'app-countries',
    standalone: true,
    imports: [
      SharedModule
    ],
    templateUrl: './countries.component.html'
})
export class CountriesComponent {}
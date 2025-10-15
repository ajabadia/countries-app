// src/app/modules/public/pages/landing-page/landing-page.component.ts

import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';

// --- Componentes Standalone ---
import { UiHeadingComponent } from '@shared/components/ui-heading/ui-heading.component';
import { UiStatCardComponent } from '@shared/components/ui-stat-card/ui-stat-card.component';

// --- Servicios ---
import { CountriesService } from '@services/countries.service';
import { ContinentsService } from '@services/continents.service';
import { LanguagesService } from '@services/languages.service';
import { BaseCrudService } from '@services/base-crud.service';

/** Helper para obtener el total de un servicio CRUD */
const getCount = (service: BaseCrudService<any, any>): Observable<number> => {
  return service.getAll({ page: 1, pageSize: 1 }).pipe(map(response => response.total));
};

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    UiHeadingComponent,
    UiStatCardComponent // Añadimos la tarjeta de estadística para usarla en la plantilla
  ],
  templateUrl: './landing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  private countriesService = inject(CountriesService);
  private continentsService = inject(ContinentsService);
  private languagesService = inject(LanguagesService);

  // ✅ CÓDIGO MÁS LIMPIO: Usamos la función de utilidad para eliminar la lógica repetitiva de RxJS.
  public countriesCount$ = getCount(this.countriesService);
  public continentsCount$ = getCount(this.continentsService);
  public languagesCount$ = getCount(this.languagesService);
}
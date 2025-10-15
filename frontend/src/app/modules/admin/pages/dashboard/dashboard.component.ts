import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map, catchError, of } from 'rxjs';

// Componentes
import { UiStatCardComponent } from '../../../shared/components/ui-stat-card/ui-stat-card.component';
import { UiHeadingComponent } from '../../../shared/components/ui-heading/ui-heading.component'; // ✅ Importado

// Servicios   
import { CountriesService } from 'src/app/services/countries.service';
import { LanguagesService } from 'src/app/services/languages.service';
import { AreasService } from 'src/app/services/areas.service';
import { DependenciesService } from 'src/app/services/dependencies.service';
import { ContinentsService } from 'src/app/services/continents.service';
import { TranslationsService } from 'src/app/services/translations.service';

// Modelo de respuesta genérico
import { CountResponse } from 'src/app/services/api-response.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, UiStatCardComponent, UiHeadingComponent], // ✅ Añadido a los imports
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  // Inyectamos todos los servicios necesarios
  private countriesService = inject(CountriesService);
  private languagesService = inject(LanguagesService);
  private areasService = inject(AreasService);
  private dependenciesService = inject(DependenciesService);
  private continentsService = inject(ContinentsService);
  private translationsService = inject(TranslationsService);
  
  // ✅ MEJORA: Observables que llaman a la API y extraen el total.
  public countriesCount$: Observable<number | null> = this.countriesService.getCount().pipe(map(res => res.total), catchError(() => of(null)));
  public languagesCount$: Observable<number | null> = this.languagesService.getCount().pipe(map(res => res.total), catchError(() => of(null)));
  public areasCount$: Observable<number | null> = this.areasService.getCount().pipe(map(res => res.total), catchError(() => of(null)));
  public dependenciesCount$: Observable<number | null> = this.dependenciesService.getCount().pipe(map(res => res.total), catchError(() => of(null)));
  public continentsCount$: Observable<number | null> = this.continentsService.getCount().pipe(map(res => res.total), catchError(() => of(null)));
  public translationsCount$: Observable<number | null> = this.translationsService.getCount().pipe(map(res => res.total), catchError(() => of(null)));

  // El constructor puede permanecer vacío, la magia ocurre con los observables y el async pipe.
}
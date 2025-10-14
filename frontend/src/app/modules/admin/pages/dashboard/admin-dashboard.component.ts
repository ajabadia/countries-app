// src/app/modules/admin/pages/dashboard/admin-dashboard.component.ts

import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CountriesService } from 'src/app/core/services/countries.service';
import { ContinentsService } from 'src/app/core/services/continents.service';
import { AreasService } from 'src/app/core/services/areas.service';
// ✅ CORREGIDO: Ruta del servicio de lenguajes.
import { LanguagesService } from 'src/app/core/services/languages.service';
import { DependenciesService } from 'src/app/core/services/dependencies.service';
import { TranslationsService } from 'src/app/core/services/translations.service';

interface DashboardData {
  countries: number | string;
  continents: number | string;
  areas: number | string;
  languages: number | string;
  dependencies: number | string;
  translations: number | string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [ CommonModule, SharedModule ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDashboardComponent implements OnInit {
  private countriesService = inject(CountriesService);
  private continentsService = inject(ContinentsService);
  private areasService = inject(AreasService);
  private languagesService = inject(LanguagesService);
  private dependenciesService = inject(DependenciesService);
  private translationsService = inject(TranslationsService);

  public data$!: Observable<DashboardData>;

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.data$ = forkJoin({
      countries: this.getCount(this.countriesService.getCount()),
      continents: this.getCount(this.continentsService.getCount()),
      areas: this.getCount(this.areasService.getCount()),
      languages: this.getCount(this.languagesService.getCount()),
      dependencies: this.getCount(this.dependenciesService.getCount()),
      translations: this.getCount(this.translationsService.getCount())
    });
  }

  private getCount(obs: Observable<{ total: number }>): Observable<number | string> {
    return obs.pipe(
      map(result => result.total),
      catchError(() => of('—')) 
    );
  }
}
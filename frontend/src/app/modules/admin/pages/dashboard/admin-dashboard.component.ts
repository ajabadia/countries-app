// src/app/modules/admin/components/admin-dashboard/admin-dashboard.component.ts
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';

// --- Servicios ---
import { CountriesService } from '@services/countries.service';
import { AreasService } from '@services/areas.service';
import { ContinentsService } from '@services/continents.service';
import { DependenciesService } from '@services/dependencies.service';
import { LanguagesService } from '@services/languages.service';
import { TranslationsService } from '@services/translations.service';
import { BaseCrudService } from '@services/base-crud.service';

// --- Utilidades ---


// --- Componentes Standalone ---
import { UiHeadingComponent } from '@shared/components/ui-heading/ui-heading.component';
import { UiStatCardComponent } from '@shared/components/ui-stat-card/ui-stat-card.component';
import { RouterModule } from '@angular/router';

/** Helper para obtener el total de un servicio CRUD */
const getCount = (service: BaseCrudService<any, any>): Observable<number> => {
  return service.getAll({ page: 1, pageSize: 1 }).pipe(map(response => response.total));
};

interface StatCard {
  title: string;
  count$: Observable<number>;
  name: string; // ✅ CORRECCIÓN: Renombramos 'icon' a 'name' para alinear con ui-stat-card
  route: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    UiHeadingComponent,
    UiStatCardComponent,
    RouterModule
  ],
  templateUrl: './dashboard.component.html', // ✅ CORRECCIÓN: Apuntamos al HTML correcto
  styleUrls: ['./dashboard.component.scss'], // ✅ CORRECCIÓN: Apuntamos al SCSS correcto
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent {
  // ✅ MEJORA: Agrupamos la información de las tarjetas en un array para un template más limpio.
  public statCards: StatCard[] = [
    { title: 'Países', count$: getCount(inject(CountriesService)), name: 'globe', route: '/admin/countries' },
    { title: 'Lenguajes', count$: getCount(inject(LanguagesService)), name: 'language', route: '/admin/languages' },
    { title: 'Áreas', count$: getCount(inject(AreasService)), name: 'map', route: '/admin/areas' },
    { title: 'Dependencias', count$: getCount(inject(DependenciesService)), name: 'puzzle', route: '/admin/dependencies' },
    { title: 'Continentes', count$: getCount(inject(ContinentsService)), name: 'compass', route: '/admin/continents' },
    { title: 'Traducciones', count$: getCount(inject(TranslationsService)), name: 'translate', route: '/admin/translations' },
  ];
}

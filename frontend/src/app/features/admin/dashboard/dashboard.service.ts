// File: d:\desarrollos\countries2\frontend\src\app\features\admin\dashboard\dashboard.service.ts | New File

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, map, of, catchError } from 'rxjs';

export interface Stat {
  title: string;
  value: number;
  icon: string;
}

interface PaginatedResponse<T> {
  total: number;
  data: T[];
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private apiUrl = '/api'; // Asumiendo una URL base

  private getCount(entity: string): Observable<number> {
    return this.http
      .get<PaginatedResponse<unknown>>(`${this.apiUrl}/${entity}?pageSize=1`)
      .pipe(
        map(response => response.total),
        catchError(error => {
          console.error(`Error fetching count for ${entity}:`, error);
          return of(0); // Devuelve 0 si hay un error para no romper el forkJoin
        })
      );
  }

  getStats(): Observable<Stat[]> {
    return forkJoin({
      countries: this.getCount('countries'),
      continents: this.getCount('continents'),
      languages: this.getCount('languages'),
      areas: this.getCount('areas'),
      dependencies: this.getCount('dependencies'),
      translations: this.getCount('multilingualnames'),
      users: this.getCount('users'), // Intentará obtener usuarios, fallará y mostrará 0
    }).pipe(
      map(results => [
        { title: 'Países', value: results.countries, icon: 'icon-country' },
        { title: 'Continentes', value: results.continents, icon: 'icon-continents' },
        { title: 'Idiomas', value: results.languages, icon: 'icon-languages' },
        { title: 'Áreas', value: results.areas, icon: 'icon-area' },
        { title: 'Dependencias', value: results.dependencies, icon: 'icon-dependencies' },
        { title: 'Traducciones', value: results.translations, icon: 'icon-translate' },
        { title: 'Usuarios', value: results.users, icon: 'icon-user' },
      ])
    );
  }
}
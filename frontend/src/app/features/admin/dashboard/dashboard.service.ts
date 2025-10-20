// File: d:\desarrollos\countries2\frontend\src\app\features\admin\dashboard\dashboard.service.ts | New File

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';

export interface Stat {
  title: string;
  value: number;
  icon: string;
}

interface PaginatedResponse<T> {
  totalRecords: number;
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
      .pipe(map(response => response.totalRecords));
  }

  getStats(): Observable<Stat[]> {
    return forkJoin({
      countries: this.getCount('countries'),
      continents: this.getCount('continents'),
      languages: this.getCount('languages'),
      users: this.getCount('auth/users'),
    }).pipe(
      map(results => [
        { title: 'Países', value: results.countries, icon: 'flag' },
        { title: 'Continentes', value: results.continents, icon: 'globe' },
        { title: 'Idiomas', value: results.languages, icon: 'language' },
        { title: 'Usuarios', value: results.users, icon: 'people' },
      ])
    );
  }
}
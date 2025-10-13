import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface adaptada a tu base de datos (foto SQLite)
export interface Country {
  id: string;
  alpha2may: string;
  alpha3may: string;
  numeric: string;
  defaultname: string;
}

@Injectable({ providedIn: 'root' })
export class CountriesService {

  constructor(private http: HttpClient) {}

  getCountriesCount(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>('/api/countries/count');
  }

  getAreasCount(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>('/api/areas/count');
  }

  getContinentsCount(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>('/api/continents/count');
  }

  getLanguagesCount(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>('/api/languages/count');
  }

  getDependenciesCount(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>('/api/dependencies/count');
  }

  getTranslationsCount(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>('/api/multilingualnames/count');
  }

  getCountries(params: { search?: string; page?: number; pageSize?: number; sortKey?: string; sortOrder?: 'asc' | 'desc' } = {}): Observable<{ data: Country[]; total: number }> {
    let httpParams = new HttpParams();
    if (params.search)    httpParams = httpParams.set('search', params.search);
    if (params.page)      httpParams = httpParams.set('page', params.page.toString());
    if (params.pageSize)  httpParams = httpParams.set('pageSize', params.pageSize.toString());
    if (params.sortKey)   httpParams = httpParams.set('sortKey', params.sortKey);
    if (params.sortOrder) httpParams = httpParams.set('sortOrder', params.sortOrder);
    return this.http.get<{ data: Country[]; total: number }>('/api/countries', { params: httpParams });
  }
}

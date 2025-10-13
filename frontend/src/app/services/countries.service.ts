import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from 'src/app/modules/shared/models/country.model';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  constructor(private http: HttpClient) {}

  // --- Contadores (No modificados) ---
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

  // --- Listado con filtros y paginación ---
  getCountries(params: {
    page?: number;
    pageSize?: number;
    search?: string;
    sortKey?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}): Observable<{ data: Country[]; total: number }> {
    let httpParams = new HttpParams();
    if (params.search) httpParams = httpParams.set('search', params.search);
    if (params.page) httpParams = httpParams.set('page', params.page.toString());
    if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    if (params.sortKey) httpParams = httpParams.set('sortKey', params.sortKey);
    if (params.sortOrder) httpParams = httpParams.set('sortOrder', params.sortOrder);
    
    return this.http.get<{ data: Country[]; total: number }>(
      '/api/countries',
      { params: httpParams }
    );
  }

  // --- CRUD de países ---
  
  /**
   * Actualiza un país existente. Coincide con el nombre esperado 'update'.
   */
  update(country: Country): Observable<any> {
    return this.http.put(`/api/countries/${country.id}`, country);
  }

  /**
   * Crea un país nuevo. Coincide con el nombre esperado 'create'.
   */
  create(country: Country): Observable<any> {
    return this.http.post('/api/countries', country);
  }

  /**
   * Borra un país por ID.
   * ✅ AÑADIDO: Este método 'delete' es el que faltaba y soluciona el error TS2339 en el componente.
   */
  delete(id: string | number): Observable<any> {
    return this.http.delete(`/api/countries/${id}`);
  }

  /** Borra varios países por id */
  deleteMany(ids: (string | number)[]): Observable<any> {
    return this.http.post('/api/countries/delete-many', { ids });
  }
}

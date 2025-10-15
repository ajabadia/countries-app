import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../services/country.model';
import { ApiResponse, CountResponse } from '../services/api-response.model';
import { BaseCrudService } from './base-crud.service';

/**
 * Parámetros para la petición de países.
 */
export interface GetCountriesParams {
  page?: number;
  pageSize?: number;
  search?: string | null;
  sortKey?: string;
  sortOrder?: 'asc' | 'desc';
}

@Injectable({ providedIn: 'root' })
export class CountriesService implements BaseCrudService<Country, Partial<Country>> {
  private apiUrl = '/api/countries';
  private http = inject(HttpClient);

  getCount(): Observable<CountResponse> {
    return this.http.get<CountResponse>(`${this.apiUrl}/count`);
  }

  // Implementación del método `getAll` de `BaseCrudService`
  getAll(params: GetCountriesParams = {}): Observable<ApiResponse<Country>> {
    let httpParams = new HttpParams();

    // ✅ Forma más limpia de construir parámetros, evitando `if` repetitivos.
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        httpParams = httpParams.set(key, String(value));
      }
    });

    return this.http.get<ApiResponse<Country>>(this.apiUrl, { params: httpParams });
  }

  create(country: Partial<Country>): Observable<Country> {
    return this.http.post<Country>(this.apiUrl, country);
  }

  // El ID puede ser string o number, lo convertimos a string para la URL.
  update(id: string | number, country: Partial<Country>): Observable<Country> {
    return this.http.put<Country>(`${this.apiUrl}/${id}`, country);
  }

  delete(ids: (string | number)[]): Observable<void> {
    return this.http.delete<void>(this.apiUrl, { body: { ids } });
  }
}
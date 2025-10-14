// src/app/core/services/countries.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from 'src/app/modules/shared/models/country.model';
import { ApiResponse } from '../models/api-response.model';
import { BaseCrudService } from './base-crud.service';

@Injectable({ providedIn: 'root' })
export class CountriesService implements BaseCrudService<Country> {
  private apiUrl = '/api/countries';

  constructor(private http: HttpClient) {}

  /** ✅ NUEVO: Método unificado para el dashboard */
  getCount(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${this.apiUrl}/count`);
  }

  getAll(params: any = {}): Observable<ApiResponse<Country>> {
    let httpParams = new HttpParams();
    if (params.search) httpParams = httpParams.set('search', params.search);
    if (params.page) httpParams = httpParams.set('page', params.page.toString());
    if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    if (params.sortKey) httpParams = httpParams.set('sortKey', params.sortKey);
    if (params.sortOrder) httpParams = httpParams.set('sortOrder', params.sortOrder);
    return this.http.get<ApiResponse<Country>>(this.apiUrl, { params: httpParams });
  }

  create(country: Partial<Country>): Observable<Country> {
    return this.http.post<Country>(this.apiUrl, country);
  }

  update(id: string, country: Partial<Country>): Observable<Country> {
    return this.http.put<Country>(`${this.apiUrl}/${id}`, country);
  }

  delete(ids: string[]): Observable<void> {
    return this.http.delete<void>(this.apiUrl, { body: { ids } });
  }
}
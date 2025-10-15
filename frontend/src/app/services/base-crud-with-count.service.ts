// src/app/services/base-crud-with-count.service.ts

import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, CountResponse } from './api-response.model';
import { BaseCrudService } from './base-crud.service';

/**
 * Clase base abstracta para servicios CRUD que también implementan un método getCount.
 * Centraliza la lógica HTTP común para evitar la duplicación de código.
 */
export abstract class BaseCrudWithCountService<T, C> implements BaseCrudService<T, C> {
  protected abstract apiUrl: string;
  protected http = inject(HttpClient);

  getAll(params: any = {}): Observable<ApiResponse<T>> {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) { httpParams = httpParams.set(key, String(value)); }
    });
    return this.http.get<ApiResponse<T>>(this.apiUrl, { params: httpParams });
  }

  create(entity: C): Observable<T> { return this.http.post<T>(this.apiUrl, entity); }
  update(id: string | number, entity: C): Observable<T> { return this.http.put<T>(`${this.apiUrl}/${id}`, entity); }
  delete(ids: (string | number)[]): Observable<void> { return this.http.delete<void>(this.apiUrl, { body: { ids } }); }
  getCount(): Observable<CountResponse> { return this.http.get<CountResponse>(`${this.apiUrl}/count`); }
}
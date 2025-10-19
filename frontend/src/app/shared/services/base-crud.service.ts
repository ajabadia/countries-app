// File: d:\desarrollos\countries2\frontend\src\app\shared\services\base-crud.service.ts | Last Modified: 2025-10-19

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagedResponse } from '@shared/types/paged-response.interface';

// Definimos el servicio como una clase abstracta para que sirva como "contrato"
// para los servicios específicos de cada módulo (CountriesService, LanguagesService, etc.).
// No se puede inyectar directamente, solo se puede heredar de ella.
export abstract class BaseCrudService<T> {
  protected abstract readonly apiUrl: string;

  constructor(protected http: HttpClient) {}

  // Obtener una lista paginada de elementos
  getAll(params: HttpParams): Observable<PagedResponse<T>> {
    return this.http.get<PagedResponse<T>>(this.apiUrl, { params });
  }

  // Obtener un elemento por su ID
  getById(id: number | string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo elemento
  create(item: Partial<T>): Observable<T> {
    return this.http.post<T>(this.apiUrl, item);
  }

  // Actualizar un elemento existente
  update(id: number | string, item: Partial<T>): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, item);
  }

  // Eliminar un elemento
  delete(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
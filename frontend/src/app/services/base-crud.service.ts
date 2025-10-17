// src/app/services/base-crud.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from './api-response.model'; // ✅ Importamos el modelo unificado
import { Directive, inject } from '@angular/core'; // ✅ Importamos Directive e inject


/**
 * Clase base para servicios CRUD.
 * Proporciona métodos genéricos para interactuar con una API RESTful.
 * @template T - El tipo de la entidad.
 * @template C - El tipo del DTO para crear la entidad (puede ser un subset de T).
 */
@Directive() // ✅ Hacemos la clase base inyectable para que los hijos hereden el constructor
export class BaseCrudService<T, C> {
  protected apiUrl!: string;
  protected http = inject(HttpClient);

  constructor(entityName: string) {
    this.apiUrl = `/api/${entityName}`; // El apiUrl se construye aquí
  }

  /**
   * Obtiene una lista paginada y filtrada de entidades.
   * @param params - Opciones de paginación, ordenamiento y búsqueda.
   * @returns Un observable con la respuesta de la API.
   */
  getAll(params: { page?: number, pageSize?: number, orderBy?: string, orderDir?: 'asc' | 'desc', search?: string | null } = {}): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(this.apiUrl, { params: this.toHttpParams(params) });
  }

  /**
   * Obtiene una entidad por su ID.
   * @param id - El ID de la entidad.
   * @returns Un observable con la entidad encontrada.
   */
  getById(id: number | string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea una nueva entidad.
   * @param data - Los datos para crear la entidad.
   * @returns Un observable con la entidad creada.
   */
  create(data: C): Observable<T> {
    return this.http.post<T>(this.apiUrl, data);
  }

  /**
   * Actualiza una entidad existente.
   * @param id - El ID de la entidad a actualizar.
   * @param data - Los datos para actualizar.
   * @returns Un observable con la entidad actualizada.
   */
  update(id: number | string, data: Partial<C>): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, data);
  }

  /**
   * Elimina una o varias entidades.
   * @param ids - Un array con los IDs de las entidades a eliminar.
   * @returns Un observable que se completa cuando la operación termina.
   */
  delete(ids: (number | string)[]): Observable<void> {
    // ✅ ROBUSTEZ: No hacer la petición si el array de IDs está vacío.
    if (!ids || ids.length === 0) {
      return new Observable(observer => observer.complete());
    }

    return this.http.request<void>('delete', this.apiUrl, { body: { ids } });
  }

  protected toHttpParams(params: any): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        httpParams = httpParams.set(key, params[key].toString());
      }
    });
    return httpParams;
  }
}
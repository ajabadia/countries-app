// src/app/core/services/base-crud.service.ts

import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';

/**
 * Interfaz que define el "contrato" para un servicio CRUD genérico.
 * Cualquier servicio que gestione una entidad (países, continentes, etc.)
 * deberá implementar estos métodos.
 * @template T El tipo de la entidad (ej: Country).
 * @template C El tipo para crear la entidad (puede ser un Partial<T>).
 */
export interface BaseCrudService<T, C = Partial<T>> {
  getAll(params?: any): Observable<ApiResponse<T>>;
  create(entity: C): Observable<T>;
  update(id: string | number, entity: C): Observable<T>;
  delete(ids: (string | number)[]): Observable<void>;
}
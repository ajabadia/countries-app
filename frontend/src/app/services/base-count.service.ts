// src/app/services/base-count.service.ts

import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CountResponse } from '../services/api-response.model';

/**
 * Clase base abstracta para servicios que solo necesitan obtener un conteo.
 * Simplifica la creación de nuevos servicios de conteo.
 */
export abstract class BaseCountService {
  protected abstract apiUrl: string;
  protected http = inject(HttpClient);

  getCount(): Observable<CountResponse> {
    return this.http.get<CountResponse>(`${this.apiUrl}/count`);
  }
}
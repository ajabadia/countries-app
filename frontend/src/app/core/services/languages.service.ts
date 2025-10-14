// src/app/core/services/languages.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LanguagesService {
  private apiUrl = '/api/languages';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene el número total de idiomas.
   * Este método es utilizado por el Dashboard.
   */
  getCount(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${this.apiUrl}/count`);
  }

  // Aquí añadiríamos en el futuro los métodos getAll, create, update, delete
  // para el CRUD completo de Idiomas.
}
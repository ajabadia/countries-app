// src/app/core/services/translations.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslationsService {
  private apiUrl = '/api/multilingualnames'; // Según tu backend-tree.txt

  constructor(private http: HttpClient) {}

  getCount(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${this.apiUrl}/count`);
  }
}
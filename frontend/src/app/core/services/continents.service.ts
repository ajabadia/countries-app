// src/app/core/services/continents.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContinentsService {
  private apiUrl = '/api/continents';

  constructor(private http: HttpClient) {}

  getCount(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${this.apiUrl}/count`);
  }
}
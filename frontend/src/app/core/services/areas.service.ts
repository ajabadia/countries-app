// src/app/core/services/areas.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AreasService {
  private apiUrl = '/api/areas';

  constructor(private http: HttpClient) {}

  getCount(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${this.apiUrl}/count`);
  }
}
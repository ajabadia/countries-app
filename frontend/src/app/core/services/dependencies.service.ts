// src/app/core/services/dependencies.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DependenciesService {
  private apiUrl = '/api/dependencies';

  constructor(private http: HttpClient) {}

  getCount(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${this.apiUrl}/count`);
  }
}
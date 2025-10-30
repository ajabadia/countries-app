// File: d:\desarrollos\countries2\frontend\src\app\features\admin\dashboard\dashboard.service.ts | Last Modified: 2025-10-29

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of, catchError } from 'rxjs';
import { ActionService } from '@app/core/services/action.service';

export interface Stat {
  title: string;
  value: number;
  icon: string;
  route?: string | any[];
}

interface DashboardStatsResponse {
  countries: number;
  users: number;
  languages: number;
  continents: number;
  areas: number;
  area_types: number;
  dependencies: number;
  multilingualnames: number;
  [key: string]: number; // Index signature
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private actionService = inject(ActionService);
  private apiUrl = '/api/admin/dashboard'; // ✅ El endpoint unificado y correcto

  getStats(): Observable<Stat[]> {
    return this.http.get<DashboardStatsResponse>(this.apiUrl).pipe(
      map(backendStats => {
        // Obtiene todas las acciones de la categoría 'admin'
        const adminActions = this.actionService.getActionsByCategory('admin');

        // Filtra para quedarse solo con las que tienen un 'routerLink' y no son el dashboard mismo
        return adminActions
          .filter(action => action.routerLink && action.id !== 'dashboard-admin')
          .map(action => {
            // Extrae la clave de la entidad del ID de la acción (ej. 'countries-admin' -> 'countries')
            const entityKey = action.id.replace('-admin', '');

            return {
              title: action.label,
              value: backendStats[entityKey] ?? 0,
              icon: action.icon,
              route: action.routerLink,
            };
          });
      }),
      catchError(error => {
        console.error('Error fetching dashboard stats:', error);
        return of([]); // Devuelve un array vacío en caso de error
      })
    );
  }
}
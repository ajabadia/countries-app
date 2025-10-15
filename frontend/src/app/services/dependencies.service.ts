import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, CountResponse } from './api-response.model';
import { BaseCrudService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class DependenciesService implements BaseCrudService<any, any> {
  protected apiUrl = '/api/dependencies';
  protected http = inject(HttpClient);

  getAll(params: any = {}): Observable<ApiResponse<any>> {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) { httpParams = httpParams.set(key, String(value)); }
    });
    return this.http.get<ApiResponse<any>>(this.apiUrl, { params: httpParams });
  }
  create(entity: any): Observable<any> { return this.http.post<any>(this.apiUrl, entity); }
  update(id: string | number, entity: any): Observable<any> { return this.http.put<any>(`${this.apiUrl}/${id}`, entity); }
  delete(ids: (string | number)[]): Observable<void> { return this.http.delete<void>(this.apiUrl, { body: { ids } }); }
  getCount(): Observable<CountResponse> { return this.http.get<CountResponse>(`${this.apiUrl}/count`); }
}
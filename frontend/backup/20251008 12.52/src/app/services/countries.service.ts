// src/app/services/countries.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  constructor(private http: HttpClient) {}

  // Cambia la URL si NO tienes proxy.conf.json
  getCountriesCount(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>('http://localhost:3000/api/countries/count');
  
    // Si tienes proxy, deja la ruta así:
    // return this.http.get<{ total: number }>('/api/countries/count');
  }
  getAreasCount(): Observable<{ total: number }> {
  return this.http.get<{ total: number }>('http://localhost:3000/api/areas/count');
  }
  getContinentsCount(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>('http://localhost:3000/api/continents/count');
  }
  getLanguagesCount(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>('http://localhost:3000/api/languages/count');
  }
  getDependenciesCount(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>('http://localhost:3000/api/dependencies/count');
  }
  getTranslationsCount(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>('http://localhost:3000/api/multilingualnames/count');
  }

}






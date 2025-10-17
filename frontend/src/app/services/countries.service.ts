import { Injectable, inject } from '@angular/core';
import { Country } from '../services/country.model';
import { BaseCrudService } from './base-crud.service';

@Injectable({ providedIn: 'root' })
export class CountriesService extends BaseCrudService<Country, Partial<Country>> {
  constructor() {
    // ✅ Llamamos al constructor padre con el nombre de la entidad.
    super('countries');
  }
}
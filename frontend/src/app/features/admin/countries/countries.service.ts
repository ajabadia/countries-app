import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '@app/shared/services/base-crud.service';
import type { Country } from '@app/types/country.types';

@Injectable({
  providedIn: 'root',
})
export class CountriesService extends BaseCrudService<Country> {
  apiUrl = '/api/countries';

  constructor() {
    super(inject(HttpClient));
  }
}
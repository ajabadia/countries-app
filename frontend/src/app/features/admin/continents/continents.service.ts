import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '@shared/services/base-crud.service';
import { Continent } from '@app/core/types/continent.types';

@Injectable({
  providedIn: 'root'
})
export class ContinentsService extends BaseCrudService<Continent> {
  apiUrl = '/api/continents';
  constructor() {
    super(inject(HttpClient));
  }
}
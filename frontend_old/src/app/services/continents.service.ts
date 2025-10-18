// src/app/core/services/continents.service.ts

import { Injectable } from '@angular/core';
import { BaseCrudService } from './base-crud.service';
import { Continent } from './continent.model';

@Injectable({ providedIn: 'root' })
export class ContinentsService extends BaseCrudService<Continent, Partial<Continent>> {
  constructor() {
    super('continents');
  }
}
// src/app/core/services/continents.service.ts

import { Injectable } from '@angular/core';
import { BaseCrudService } from './base-crud.service';

@Injectable({ providedIn: 'root' })
export class ContinentsService extends BaseCrudService<any, any> {
  constructor() {
    super('continents');
  }
}
// src/app/core/services/continents.service.ts

import { Injectable } from '@angular/core';
import { BaseCrudWithCountService } from './base-crud-with-count.service';

@Injectable({ providedIn: 'root' })
export class ContinentsService extends BaseCrudWithCountService<any, any> {
  protected apiUrl = '/api/continents';
}
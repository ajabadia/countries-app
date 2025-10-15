// src/app/core/services/continents.service.ts

import { Injectable } from '@angular/core';
import { BaseCountService } from './base-count.service';

@Injectable({ providedIn: 'root' })
export class ContinentsService extends BaseCountService {
  protected override apiUrl = '/api/continents';
}
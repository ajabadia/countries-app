// src/app/core/services/areas.service.ts

import { Injectable } from '@angular/core';
import { BaseCountService } from './base-count.service';

@Injectable({ providedIn: 'root' })
export class AreasService extends BaseCountService {
  protected override apiUrl = '/api/areas';
}
// src/app/core/services/areas.service.ts

import { Injectable } from '@angular/core';
import { BaseCrudService } from './base-crud.service';
import { Area } from './area.model';

@Injectable({ providedIn: 'root' })
export class AreasService extends BaseCrudService<Area, Partial<Area>> {
  constructor() {
    super('areas');
  }
}
// src/app/core/services/areas.service.ts

import { Injectable } from '@angular/core';
import { BaseCrudService } from './base-crud.service';

@Injectable({ providedIn: 'root' })
export class AreasService extends BaseCrudService<any, any> {
  // ✅ Llamamos al constructor de la clase padre con el nombre de la entidad.
  constructor() {
    super('areas');
  }
}
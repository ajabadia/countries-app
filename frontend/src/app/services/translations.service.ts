// src/app/core/services/translations.service.ts

import { Injectable } from '@angular/core';
import { BaseCrudService } from './base-crud.service';

@Injectable({ providedIn: 'root' })
export class TranslationsService extends BaseCrudService<any, any> {
  constructor() {
    super('multilingualnames'); // Según tu backend-tree.txt
  }
}
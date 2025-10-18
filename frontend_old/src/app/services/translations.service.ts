// src/app/core/services/translations.service.ts

import { Injectable } from '@angular/core';
import { BaseCrudService } from './base-crud.service';
import { Translation } from './translation.model';

@Injectable({ providedIn: 'root' })
export class TranslationsService extends BaseCrudService<Translation, Partial<Translation>> {
  constructor() {
    super('multilingualnames'); // Según tu backend-tree.txt
  }
}
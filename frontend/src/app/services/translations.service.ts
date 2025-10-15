// src/app/core/services/translations.service.ts

import { Injectable } from '@angular/core';
import { BaseCountService } from './base-count.service';

@Injectable({ providedIn: 'root' })
export class TranslationsService extends BaseCountService {
  protected override apiUrl = '/api/multilingualnames'; // Según tu backend-tree.txt
}
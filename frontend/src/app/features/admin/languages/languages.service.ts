import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '@app/shared/services/base-crud.service'; // Aseguramos la ruta correcta
import type { Language } from '@app/core/types/language.types';

@Injectable({
  providedIn: 'root',
})
export class LanguagesService extends BaseCrudService<Language> {
  apiUrl = '/api/languages';
  
  constructor() {
    super(inject(HttpClient));
  }
}
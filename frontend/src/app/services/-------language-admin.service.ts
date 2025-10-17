// src/app/services/language-admin.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from './base-crud.service'; // Asumo que este servicio base existe
import { Language } from '../models/language.model';

@Injectable({
  providedIn: 'root'
})
export class LanguageAdminService extends BaseCrudService<Language, Partial<Language>> {
  constructor() {
    super('/api/languages', inject(HttpClient)); // Le pasamos el endpoint específico
  }
}
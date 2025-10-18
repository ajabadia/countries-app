import { Injectable } from '@angular/core';
import { Language } from '../services/language.model';
import { BaseCrudService } from './base-crud.service';

@Injectable({ providedIn: 'root' })
export class LanguagesService extends BaseCrudService<Language, Partial<Language>> {
  constructor() {
    super('languages');
  }
}
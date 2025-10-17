import { Injectable } from '@angular/core';
import { BaseCrudService } from './base-crud.service';
import { Language } from '../models/language.model';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService extends BaseCrudService<Language, Partial<Language>> {
  constructor() {
    super('languages');
  }
}
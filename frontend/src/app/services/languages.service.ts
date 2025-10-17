import { Injectable, inject } from '@angular/core';
import { BaseCrudService } from './base-crud.service';
import { Language } from '../models/language.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService extends BaseCrudService<Language, Partial<Language>> {
  constructor() {
    super('languages', inject(HttpClient));
  }
}
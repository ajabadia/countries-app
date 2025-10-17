import { Injectable, inject } from '@angular/core';
import { BaseCrudService } from './base-crud.service';
import { Language } from '../models/language.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService extends BaseCrudService<Language, Partial<Language>> {
  constructor() {
    // El constructor de la clase base solo espera el nombre del endpoint.
    // HttpClient ya se inyecta en la clase base.
    super('languages');
  }
}
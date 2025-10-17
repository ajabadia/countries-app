import { Injectable, inject } from '@angular/core';
import { BaseCrudService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService extends BaseCrudService<any, any> {
  constructor() {
    super('languages');
  }
}
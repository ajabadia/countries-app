import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '@app/shared/services/base-crud.service';
import { Multilingualname } from '@app/types/multilingualname.types';

@Injectable({
  providedIn: 'root'
})
export class MultilingualnamesService extends BaseCrudService<Multilingualname> {
  apiUrl = '/api/multilingualnames';
  constructor() {
    super(inject(HttpClient));
  }
}
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '@app/shared/services/base-crud.service';
import { AreaType } from '@app/types/area_type.types';

@Injectable({
  providedIn: 'root'
})
export class AreaTypesService extends BaseCrudService<AreaType> {
  apiUrl = '/api/area_types';
  constructor() {
    super(inject(HttpClient));
  }
}
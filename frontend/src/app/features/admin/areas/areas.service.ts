import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '@app/shared/services/base-crud.service';
import { Area } from '@app/core/types/area.types';

@Injectable({
  providedIn: 'root'
})
export class AreasService extends BaseCrudService<Area> {
  apiUrl = '/api/areas';
  constructor() {
    super(inject(HttpClient));
  }
}
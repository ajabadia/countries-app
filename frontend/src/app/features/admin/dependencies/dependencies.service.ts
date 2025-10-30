import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '@app/shared/services/base-crud.service';
import { Dependency } from '@app/types/dependency.types';

@Injectable({
  providedIn: 'root'
})
export class DependenciesService extends BaseCrudService<Dependency> {
  apiUrl = '/api/dependencies';
  constructor() {
    super(inject(HttpClient));
  }
}
import { Injectable, inject } from '@angular/core';
import { BaseCrudService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class DependenciesService extends BaseCrudService<any, any> {
  constructor() {
    super('dependencies');
  }
}
import { Injectable } from '@angular/core';
import { BaseCrudService } from './base-crud.service';
import { Dependency } from './dependency.model';

@Injectable({
  providedIn: 'root'
})
export class DependenciesService extends BaseCrudService<Dependency, Partial<Dependency>> {
  constructor() {
    super('dependencies');
  }
}
import { Injectable } from '@angular/core';
import { BaseCountService } from './base-count.service';

@Injectable({
  providedIn: 'root'
})
export class DependenciesService extends BaseCountService {
  protected override apiUrl = '/api/dependencies';
}
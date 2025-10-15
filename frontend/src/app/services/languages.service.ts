import { Injectable } from '@angular/core';
import { BaseCountService } from './base-count.service';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService extends BaseCountService {
  protected override apiUrl = '/api/languages';
}
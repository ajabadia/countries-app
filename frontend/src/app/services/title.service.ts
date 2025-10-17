// src/app/services/title.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  // Un BehaviorSubject para mantener el estado del título actual.
  public readonly title$ = new BehaviorSubject<string>('Inicio');

  public setTitle(newTitle: string): void {
    this.title$.next(newTitle);
  }
}
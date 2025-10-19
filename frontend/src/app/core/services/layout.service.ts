// File: d:\desarrollos\countries2\frontend\src\app\core\services\layout.service.ts | Last Modified: 2025-10-19

import { Injectable, signal } from '@angular/core';

/**
 * Servicio singleton para gestionar el estado del layout principal de la aplicación.
 * Permite a los componentes de las páginas comunicarse con el AppComponent
 * para actualizar elementos comunes como el título de la cabecera.
 */
@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public readonly pageTitle = signal<string>('Dashboard');

  public setPageTitle(title: string): void {
    this.pageTitle.set(title);
  }
}
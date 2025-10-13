// src/app/services/icon.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';

// Tipos para el componente de icono (los definimos aquí para que sean globales)
export type UiIconType = 'system' | 'flag-circle' | 'flag-detail' | 'flag-language' | 'other-circle' | 'map-globe';
export type UiIconRender = 'svg' | 'image';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  // El caché ahora es un mapa de Observables para manejar peticiones concurrentes de forma eficiente
  private readonly cache = new Map<string, Observable<SafeHtml>>();
  
  // Icono de error por defecto
  private readonly errorIcon: SafeHtml;

  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  constructor() {
    // Sanitizamos el icono de error una sola vez en el constructor
    const errorSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor">
        <line x1="8" y1="8" x2="24" y2="24" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
        <line x1="24" y1="8" x2="8" y2="24" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
      </svg>
    `;
    this.errorIcon = this.sanitizer.bypassSecurityTrustHtml(this.patchSvg(errorSvg));
  }

  /**
   * Obtiene el contenido de un icono SVG.
   * Si el icono ya está en caché, devuelve el resultado cacheado.
   * Si no, hace una petición HTTP, lo cachea y lo devuelve.
   */
  public getIcon(name: string, type: UiIconType): Observable<SafeHtml> {
    const path = this.getIconPath(name, type);
    
    // Si la ruta ya está en el caché, devolvemos el Observable cacheado
    if (this.cache.has(path)) {
      return this.cache.get(path)!;
    }

    // Si no, creamos una nueva petición HTTP
    const icon$ = this.http.get(path, { responseType: 'text' }).pipe(
      map(svg => this.sanitizer.bypassSecurityTrustHtml(this.patchSvg(svg))),
      catchError(() => of(this.errorIcon)), // En caso de error, devuelve el icono de fallback
      shareReplay(1) // Cachea el primer resultado y lo comparte con todas las suscripciones
    );

    // Guardamos el Observable en el caché para futuras peticiones
    this.cache.set(path, icon$);
    return icon$;
  }

  /**
   * Resuelve la ruta completa del archivo del icono.
   * Ahora es público para que el componente también pueda usarlo para imágenes.
   */
  public getIconPath(name: string, type: UiIconType, extension: string = 'svg'): string {
    switch (type) {
      case 'flag-circle': return `assets/icons/flags/circle-flags/${name}.${extension}`;
      case 'flag-detail': return `assets/icons/flags/${name}.${extension}`;
      case 'flag-language': return `assets/icons/flags/circle-flags/language/${name}.${extension}`;
      case 'other-circle': return `assets/icons/flags/circle-flags/other/${name}.${extension}`;
      case 'map-globe': return `assets/icons/globes/${name}.${extension}`;
      case 'system':
      default: return `assets/icons/${name}.${extension}`;
    }
  }

  /**
   * Procesa el SVG crudo para hacerlo compatible con CSS (currentColor).
   */
  private patchSvg(svg: string): string {
    svg = svg.replace(/fill="[^"]*"/g, 'fill="currentColor"');
    svg = svg.replace(/stroke="[^"]*"/g, 'stroke="currentColor"');
    return svg;
  }
}
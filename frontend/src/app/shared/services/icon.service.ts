// File: d:\desarrollos\countries2\frontend\src\app\shared\services\icon.service.ts | Last Modified: 2025-10-19

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { map, shareReplay, catchError } from 'rxjs/operators';

export type UiIconType = 'system' | 'flag' | 'circle-flag' | 'globe' | 'lang-circle-flag' | 'other-circle-flag' | string;
export type UiIconSize = 'xs' | 's' | 'm' | 'l' | 'xl';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  // Caché para almacenar los Observables de los iconos ya solicitados.
  private iconCache = new Map<string, Observable<SafeHtml>>();

  /**
   * Obtiene el contenido de un icono SVG por su nombre.
   * Utiliza una caché para evitar peticiones HTTP duplicadas.
   * @param name El nombre del archivo del icono (sin extensión).
   * @param type El tipo (subdirectorio) del icono. Por defecto 'system'.
   * @returns Un Observable con el contenido HTML seguro del SVG.
   */
  getIcon(name: string, type: UiIconType = 'system'): Observable<SafeHtml> {
    // Usamos un mapeo para determinar la ruta, es más limpio que un switch largo.
    const typeToPathMap: { [key: string]: string } = {
      'flag': 'flags/square-flags',
      'circle-flag': 'flags/circle-flags',
      'area': 'areas',
      'globe': 'globes',
      'lang-circle-flag': 'flags/language-flags',
      'other-circle-flag': 'flags/other-flags',
      'system': 'system'
    };

    // Obtener la ruta específica del mapa. Si no existe, usar 'system' como fallback.
    const typePath = typeToPathMap[type] || 'system';

    const iconUrl = `/assets/icons/${typePath}/${name}.svg`;
    const cacheKey = iconUrl; // Usar la URL completa como clave de caché para evitar colisiones.

    if (this.iconCache.has(cacheKey)) {
      // console.log(`[IconService] Serving from cache: ${iconUrl}`);
      return this.iconCache.get(cacheKey)!;
    }

    // console.log(`[IconService] Requesting new icon: ${iconUrl}`);
    const icon$ = this.http.get(iconUrl, { responseType: 'text' }).pipe(
      // Sanitizar el SVG para prevenir ataques XSS al usar [innerHTML].
      map(svg => this.sanitizer.bypassSecurityTrustHtml(svg)),
      // En caso de error, intentar cargar un icono de fallback.
      catchError(() => {
        console.warn(`Icon "${name}" not found at ${iconUrl}`);
        return this.getIcon('UNK', 'system');
      }),
      // shareReplay(1) es la clave: cachea el último valor emitido y lo comparte
      // con todos los suscriptores, asegurando que la petición HTTP solo se haga una vez.
      shareReplay(1)
    );

    // Guardar el Observable en la caché para futuras peticiones.
    this.iconCache.set(cacheKey, icon$);
    return icon$;
  }

  /**
   * Construye la ruta a un icono de tipo imagen.
   * @param name El nombre del archivo del icono (sin extensión).
   * @param type El tipo (subdirectorio) del icono.
   * @param extension La extensión del archivo de imagen (ej. 'png', 'jpg').
   * @returns La ruta completa al recurso de imagen.
   */
  getIconPath(name: string, type: UiIconType, extension: string): string {
      return `/assets/icons/${type}/${name}.${extension}`;
  }
}
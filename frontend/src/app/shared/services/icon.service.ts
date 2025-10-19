import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { map, shareReplay, catchError } from 'rxjs/operators';

export type UiIconType = 'system' | 'flag' | string;
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
    const cacheKey = `${type}:${name}`;
    // Si el icono ya está en caché, devolver el Observable cacheado.
    if (this.iconCache.has(cacheKey)) {
      return this.iconCache.get(cacheKey)!;
    }

    // Si no está en caché, crear la petición HTTP.
    const iconUrl = `/assets/icons/${type}/${name}.svg`;
    const icon$ = this.http.get(iconUrl, { responseType: 'text' }).pipe(
      // Sanitizar el SVG para prevenir ataques XSS al usar [innerHTML].
      map(svg => this.sanitizer.bypassSecurityTrustHtml(svg)),
      // En caso de error, intentar cargar un icono de fallback.
      catchError(() => {
        console.warn(`Icon "${name}" not found at ${iconUrl}`);
        // Evita bucle infinito si el propio 'unknown' no se encuentra.
        if (name === 'unknown') {
          return of(this.sanitizer.bypassSecurityTrustHtml('?')); // Fallback final
        }
        return this.getIcon('unknown', 'system');
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
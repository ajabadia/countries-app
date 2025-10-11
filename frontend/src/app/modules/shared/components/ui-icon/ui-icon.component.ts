import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-ui-icon',
  templateUrl: './ui-icon.component.html',
  styleUrls: ['./ui-icon.component.scss'],
})
export class UiIconComponent implements OnInit {
  /** Nombre del icono (sin extensión). Ej: 'icon-pen' */
  @Input() icon!: string;

  /** Tipo de icono para rutas/fondo. Ej: 'system', 'flag-circle', ... */
  @Input() type: string = 'system';

  /** Color CSS/hex para el icono */
  @Input() color?: string;

  /**
   * Tamaño del icono: admite número en px o string ('xs', 's', 'm', 'l', 'xl').
   * Se valida en computedSize para asegurar que siempre hay un tamaño positivo correcto.
   */
  @Input() size: number | 'xs' | 's' | 'm' | 'l' | 'xl' = 24;

  /** Clase CSS adicional para variantes o estilos */
  @Input() class?: string;

  /** SVG ya transformado/listo para inyectar en el innerHTML */
  svgContent: SafeHtml | null = null;

  /** SVG de error si no se encuentra el icono */
  errorIcon: string = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24" fill="currentColor">
    <line x1="8" y1="8" x2="24" y2="24" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
    <line x1="24" y1="8" x2="8" y2="24" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
  </svg>
  `;

  // Tabla para traducir strings a valores px
  private readonly sizeMap: Record<'xs' | 's' | 'm' | 'l' | 'xl', number> = {
    xs: 16,
    s: 20,
    m: 24,
    l: 32,
    xl: 40
  };

  /**
   * Devuelve el tamaño real en píxeles ya validado y seguro:
   * - Si es number, devuelve el absoluto o 24 si <=0
   * - Si es un string válido, devuelve el mapeo definido
   * - Si es string inválido, devuelve 24
   */
  get computedSize(): number {
    if (typeof this.size === 'number') {
      const absNumber = Math.abs(this.size);
      return absNumber > 0 ? absNumber : 24;
    }
    // size es string: buscamos en el mapeo o devolvemos 24 por defecto.
    return this.sizeMap[this.size] ?? 24;
  }

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const path = this.getIconPath();

    this.http.get(path, { responseType: 'text' }).subscribe({
      next: svg =>
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(this.patchSvg(svg)),
      error: () =>
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(this.errorIcon),
    });
  }

  /** Calcula el path correcto del SVG según el tipo de icono */
  private getIconPath(): string {
    switch (this.type) {
      case 'flag-circle':
        return `assets/icons/flags/circle-flags/${this.icon}.svg`;
      case 'flag-detail':
        return `assets/icons/flags/${this.icon}.svg`;
      case 'flag-language':
        return `assets/icons/flags/circle-flags/language/${this.icon}.svg`;
      case 'other-circle':
        return `assets/icons/flags/circle-flags/other/${this.icon}.svg`;
      case 'map-globe':
        return `assets/icons/globes/${this.icon}.svg`;
      case 'system':
      default:
        return `assets/icons/${this.icon}.svg`;
    }
  }

  /**
   * Parchea el SVG para asegurar:
   * - fill="currentColor" siempre presente
   * - elimina width/height fijos
   * - siempre escalable según computedSize
   */
  private patchSvg(svg: string): string {
    // Patch fill
    svg = svg.replace(/fill="[^\"]*"/g, 'fill="currentColor"');

    // Añade fill="currentColor" al SVG si falta
    svg = svg.replace(/<svg([^>]*)>/, (match, attrs) => {
      return match.includes('fill=') ? match : `<svg${attrs} fill="currentColor">`;
    });

    // Elimina width y height fijos en root SVG
    svg = svg.replace(/(width|height)="[^\"]*"/g, '');

    return svg;
  }
}

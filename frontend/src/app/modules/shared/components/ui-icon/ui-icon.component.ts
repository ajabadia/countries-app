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

  /** Tamaño del icono: admite número en px o string ('xs', 's', 'm', 'l', 'xl') */
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

  // ----- Tabla de conversión de tamaños -----
  private readonly sizeMap: Record<string, number> = {
    xs: 16,
    s: 20,
    m: 24,
    l: 32,
    xl: 40
  };

  /** Propiedad computada para el tamaño final en px */
  get computedSize(): number {
    return typeof this.size === 'number'
      ? this.size
      : this.sizeMap[this.size] ?? 24;
  }
  // ------------------------------------------

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
   * Patch para asegurar que el SVG:
   * - Lleve fill="currentColor" para heredar color CSS/SCSS
   * - Elimine restricciones de width/height
   * - Permite escalar el SVG según [size]
   */
  private patchSvg(svg: string): string {
    // Cambia cualquier fill a currentColor
    svg = svg.replace(/fill="[^\"]*"/g, 'fill="currentColor"');

    // Añade fill="currentColor" al svg si le falta
    svg = svg.replace(/<svg([^>]*)>/, (match, attrs) => {
      return match.includes('fill=') ? match : `<svg${attrs} fill="currentColor">`;
    });

    // Elimina width/height fijos
    svg = svg.replace(/(width|height)="[^\"]*"/g, '');

    return svg;
  }
}

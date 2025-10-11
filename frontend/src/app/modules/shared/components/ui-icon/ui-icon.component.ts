import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-ui-icon',
  templateUrl: './ui-icon.component.html',
  styleUrls: ['./ui-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // CLAVE: solo redibuja si cambian los inputs
})
export class UiIconComponent implements OnInit {
  @Input() icon!: string;
  @Input() type: string = 'system';
  @Input() color?: string;
  @Input() size: number | 'xs' | 's' | 'm' | 'l' | 'xl' = 24;
  @Input() class?: string;

  svgContent: SafeHtml | null = null;

  errorIcon: string = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor">
      <line x1="8" y1="8" x2="24" y2="24" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
      <line x1="24" y1="8" x2="8" y2="24" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
    </svg>
  `;

  private readonly sizeMap: Record<'xs' | 's' | 'm' | 'l' | 'xl', number> = {
    xs: 16, s: 20, m: 24, l: 32, xl: 40
  };

  // CACHE e instancia única para cada icono/tipo/tamaño/color
  private static svgCache = new Map<string, SafeHtml>();

  get computedSize(): number {
    if (typeof this.size === 'number') {
      const absNumber = Math.abs(this.size);
      return absNumber > 0 ? absNumber : 24;
    }
    return this.sizeMap[this.size] ?? 24;
  }

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const cacheKey = `${this.type}|${this.icon}|${this.computedSize}|${this.color || ''}`;
    // Si ya tenemos este SVG en el caché global, usarlo directamente
    if (UiIconComponent.svgCache.has(cacheKey)) {
      this.svgContent = UiIconComponent.svgCache.get(cacheKey)!;
      return;
    }

    const path = this.getIconPath();
    this.http.get(path, { responseType: 'text' }).subscribe({
      next: svg => {
        // Parchea y cachea
        const patched = this.sanitizer.bypassSecurityTrustHtml(this.patchSvg(svg));
        UiIconComponent.svgCache.set(cacheKey, patched);
        this.svgContent = patched;
      },
      error: () => {
        const safeErrorIcon = this.sanitizer.bypassSecurityTrustHtml(this.errorIcon);
        UiIconComponent.svgCache.set(cacheKey, safeErrorIcon);
        this.svgContent = safeErrorIcon;
      }
    });
  }

  private getIconPath(): string {
    switch (this.type) {
      case 'flag-circle': return `assets/icons/flags/circle-flags/${this.icon}.svg`;
      case 'flag-detail': return `assets/icons/flags/${this.icon}.svg`;
      case 'flag-language': return `assets/icons/flags/circle-flags/language/${this.icon}.svg`;
      case 'other-circle': return `assets/icons/flags/circle-flags/other/${this.icon}.svg`;
      case 'map-globe': return `assets/icons/globes/${this.icon}.svg`;
      case 'system':
      default: return `assets/icons/${this.icon}.svg`;
    }
  }

  private patchSvg(svg: string): string {
    svg = svg.replace(/fill="[^\"]*"/g, 'fill="currentColor"');
    svg = svg.replace(/<svg([^>]*)>/, (match, attrs) => {
      return match.includes('fill=') ? match : `<svg${attrs} fill="currentColor">`;
    });
    svg = svg.replace(/(width|height)="[^\"]*"/g, '');
    return svg;
  }
}

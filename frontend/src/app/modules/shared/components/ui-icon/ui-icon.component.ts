import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-ui-icon',
  templateUrl: './ui-icon.component.html',
  styleUrls: ['./ui-icon.component.scss']
})
export class UiIconComponent implements OnInit {
  @Input() icon!: string; // Ej: "icon-pen"
  @Input() type: string = 'system';
  @Input() color?: string;
  @Input() size: number = 24;
  @Input() class?: string;

  svgContent: SafeHtml | null = null;
  errorIcon: string = '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" fill="#f44336"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-size="12" font-family="Arial" dy=".3em">!</text></svg>';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const path = this.getIconPath();
    this.http.get(path, { responseType: 'text' }).subscribe({
      next: svg => this.svgContent = this.sanitizer.bypassSecurityTrustHtml(this.patchSvg(svg)),
      error: () => this.svgContent = this.sanitizer.bypassSecurityTrustHtml(this.errorIcon)
    });
  }

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

  // Añade fill="currentColor" a la etiqueta SVG principal si falta
  private patchSvg(svg: string): string {
    return svg.replace(/<svg([^>]*)>/, (match) => {
      return match.includes('fill=') ? match : match.replace('<svg', '<svg fill="currentColor"');
    });
  }
}

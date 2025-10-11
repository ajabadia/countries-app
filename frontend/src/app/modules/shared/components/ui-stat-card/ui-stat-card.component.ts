import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
// Sólo usa estos imports si tienes SVG legacy
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-ui-stat-card',
  templateUrl: './ui-stat-card.component.html',
  styleUrls: ['./ui-stat-card.component.scss']
})
export class UiStatCardComponent implements OnInit {
  /** Texto del label (leyenda) */
  @Input() label!: string;
  /** Valor principal (número/dato a mostrar) */
  @Input() value!: string | number;
  /** Nombre del icono SVG/corporativo a mostrar */
  @Input() icon?: string;
  /** Tipo de icono para el componente ui-icon ('system', 'flag-circle', ...) */
  @Input() iconType: string = 'system';
  /** Ruta de detalle, navega al clic sobre la tarjeta */
  @Input() detailRoute?: string;
  /** Clase CSS opcional para el icono */
  @Input() iconClass: string = '';
  /** Color del icono, acepta hex, nombre CSS, variable, etc. */
  @Input() iconColor: string = '';
  /**
   * Tamaño del icono ('xs' = 32px, 's' = 48px, 'm' = 72px, 'l' = 96px, 'xl' = 120px)
   * También acepta un número específico en px.
   * Valor por defecto: 'm'
   */
  @Input() iconSize: 'xs' | 's' | 'm' | 'l' | 'xl' | number = 'm';

  // Sólo si usas SVG manualmente (legacy)
  svgContent: SafeHtml | null = null;
  isActive = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    if (this.icon && !this.usaUiIcon()) {
      this.http.get(`/assets/icons/${this.icon}.svg`, { responseType: 'text' }).subscribe({
        next: svg => this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svg),
        error: () => this.svgContent = null
      });
    }
  }

  /** Mapea los tamaños de icono textuales a píxeles */
  getIconSizePx(): number {
    switch (this.iconSize) {
      case 'xs': return 32;
      case 's':  return 48;
      case 'm':  return 72;
      case 'l':  return 96;
      case 'xl': return 120;
      default:   return typeof this.iconSize === 'number' ? this.iconSize : 72;
    }
  }

  /** Cambia esto si en algún caso quieres usar SVG legacy en vez de ui-icon */
  usaUiIcon(): boolean {
    return true;
  }

  /** Navega a la ruta de detalle si está definida */
  onClick(): void {
    if (this.detailRoute) {
      this.router.navigate([this.detailRoute]);
    }
  }

  /** Permite activar el click por teclado (accesibilidad) */
  @HostListener('keydown.enter')
  @HostListener('keydown.space')
  onKeydown() {
    this.onClick();
  }
}

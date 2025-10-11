import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
// Si ya NO vas a cargar SVG manualmente, puedes eliminar las dos siguientes líneas:
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-ui-stat-card',
  templateUrl: './ui-stat-card.component.html',
  styleUrls: ['./ui-stat-card.component.scss']
})
export class UiStatCardComponent implements OnInit {
  @Input() label!: string;
  @Input() value!: string | number;
  /** Nombre del icono SVG (sin extensión) para usar con ui-icon (recomendado) */
  @Input() icon?: string;
  /** Tipo de icono para ui-icon ('system', 'flag-circle', etc.) */
  @Input() iconType: string = 'system'; // Si tienes lógica distinta por tipo, lo mantienes
  /** Alternativamente, si quieres seguir usando SVG a mano: */
  svgContent: SafeHtml | null = null; // puedes eliminar si no la quieres nunca
  /** Ruta de detalle a navegar al hacer clic */
  @Input() detailRoute?: string;
@Input() iconClass: string = ''; // Opcional. Recibe la clase para indicar tipo de icono
@Input() iconColor: string = ''; // El color parametrizable en formato CSS (ej: '#10416a' o 'var(--color-primary)')


  isActive = false;

  constructor(
    private router: Router,
    private http: HttpClient,           // puedes eliminar si no usas svgContent
    private sanitizer: DomSanitizer     // puedes eliminar si no usas svgContent
  ) {}

  ngOnInit() {
    // Si quieres seguir manteniendo la función legacy para svg inyectado manual:
    if (this.icon && !this.usaUiIcon()) {
      this.http.get(`/assets/icons/${this.icon}.svg`, { responseType: 'text' }).subscribe({
        next: svg => this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svg),
        error: () => this.svgContent = null
      });
    }
  }

  /** Determina si se debe usar el nuevo componente ui-icon o el método antiguo */
  usaUiIcon(): boolean {
    // Si quisieras forzar tipo/condición para usar uno u otro, ajusta aquí
    return true; // usa siempre <app-ui-icon>; pon false si quieres legacy
  }

  /** Acción navegable al hacer click en la tarjeta */
  onClick(): void {
    if (this.detailRoute) {
      this.router.navigate([this.detailRoute]);
    }
  }

  /** Teclado: enter y espacio disparan onClick */
  @HostListener('keydown.enter')
  @HostListener('keydown.space')
  onKeydown() { this.onClick(); }
}

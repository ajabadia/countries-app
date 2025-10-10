import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-ui-heading',
  templateUrl: './ui-heading.component.html',
  styleUrls: ['./ui-heading.component.scss']
})
export class UiHeadingComponent implements OnInit, OnChanges {

  // Tipo de heading (h1, h2, h3, etc.)
  @Input() level: 1 | 2 | 3 | 4 | 5 | 6 = 1;

  // Texto del heading
  @Input() text: string = '';

  // Alineación del texto
  @Input() textAlign: 'left' | 'center' | 'right' = 'left';

  // Color del heading
  @Input() color: 'primary' | 'secondary' | 'accent' | 'text' | 'muted' = 'text';

  // Iconografía
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' | 'top' | 'bottom' = 'left';
  @Input() iconSize: 'xs' | 's' | 'm' | 'l' | 'xl' | number = 'm';

  // Tamaño del texto (sobreescribe el tamaño por defecto del nivel)
  @Input() textSize?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | number;

  // Accesibilidad
  @Input() ariaLabel?: string;

  // Para contenido HTML si es necesario
  @Input() allowHtml: boolean = false;

  svgContent: SafeHtml | null = null;

  private readonly iconSizes = { xs: 16, s: 20, m: 24, l: 32, xl: 40 };
  private readonly textSizes = { 
    xs: '0.75rem', 
    s: '0.875rem', 
    m: '1rem', 
    l: '1.25rem', 
    xl: '1.5rem',
    xxl: '2rem'
  };

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.loadSvg();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['icon'] && !changes['icon'].isFirstChange()) {
      this.loadSvg();
    }
  }

  private loadSvg() {
    if (this.icon) {
      this.http.get(`/assets/icons/${this.icon}.svg`, { responseType: 'text' }).subscribe({
        next: svg => this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svg),
        error: () => this.svgContent = null
      });
    } else {
      this.svgContent = null;
    }
  }

getIconStyle() {
  // Si NO se pasa iconSize, que el tamaño del icono dependa del tamaño del texto
  let size: string;
  if (this.iconSize) {
    size = typeof this.iconSize === 'number'
      ? `${this.iconSize}px`
      : `${this.iconSizes[this.iconSize] ?? this.iconSizes.m}px`;
  } else if (this.textSize) {
    // Si no hay iconSize pero sí textSize, igualar tamaños
    size = typeof this.textSize === 'number'
      ? `${this.textSize}px`
      : this.textSizes[this.textSize] ?? this.textSizes.m;
  } else {
    // Por defecto
    size = `${this.iconSizes.m}px`;
  }

  return {
    width: size,
    height: size,
    minWidth: size,
    minHeight: size,
    verticalAlign: this.iconPosition === 'top' || this.iconPosition === 'bottom' ? 'middle' : 'text-bottom'
  };
}


  getTextStyle() {
    if (this.textSize) {
      const size = typeof this.textSize === 'number'
        ? `${this.textSize}px`
        : this.textSizes[this.textSize] ?? this.textSizes.m;
      return { fontSize: size };
    }
    return {};
  }

  getHeadingClasses(): string {
    return [
      'ui-heading',
      `ui-heading--level-${this.level}`,
      `ui-heading--color-${this.color}`,
      `ui-heading--align-${this.textAlign}`,
      this.icon ? 'ui-heading--has-icon' : '',
      this.icon ? `ui-heading--icon-${this.iconPosition}` : ''
    ].filter(Boolean).join(' ');
  }

  getHeadingTag(): string {
    return `h${this.level}`;
  }
}

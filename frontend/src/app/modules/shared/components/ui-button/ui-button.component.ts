import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-ui-button',
  templateUrl: './ui-button.component.html',
  styleUrls: ['./ui-button.component.scss']
})
export class UiButtonComponent implements OnInit, OnChanges {

  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() active = false;
  @Input() fullWidth = false;
  @Input() color: 'primary' | 'secondary' | 'accent' | 'danger' | 'surface' | 'success' | 'warning' | 'info' | 'icon' = 'primary';

  // Iconografía
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' | 'top' | 'only' = 'left';
  @Input() iconSize: 'xs' | 's' | 'm' | 'l' | 'xl' | number = 'm';

  // Texto del botón
  @Input() textSize: 'xs' | 's' | 'm' | 'l' | 'xl' | number = 'm';

  // Accesibilidad
  @Input() ariaLabel?: string;

  // Loading state
  @Input() loading: boolean = false;

  @Output() onClick = new EventEmitter<MouseEvent>();

  svgContent: SafeHtml | null = null;
  private readonly iconSizes = { xs: 16, s: 20, m: 24, l: 32, xl: 40 };
  private readonly textSizes = { xs: '0.75rem', s: '0.875rem', m: '1rem', l: '1.25rem', xl: '1.5rem' };

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
    const size = typeof this.iconSize === 'number'
      ? `${this.iconSize}px`
      : `${this.iconSizes[this.iconSize] ?? this.iconSizes.m}px`;
    return {
      width: size,
      height: size,
      minWidth: size,
      minHeight: size,
      verticalAlign: this.iconPosition === 'top' ? 'middle' : 'text-bottom'
    };
  }
  getTextStyle() {
    const size = typeof this.textSize === 'number'
      ? `${this.textSize}px`
      : this.textSizes[this.textSize] ?? this.textSizes.m;
    return { fontSize: size };
  }
  getButtonClasses(): string {
    return [
      'ui-button',
      `ui-button--${this.color}`,
      this.fullWidth ? 'ui-button--full-width' : '',
      this.active ? 'ui-button--active' : '',
      this.icon ? 'ui-button--has-icon' : '',
      this.icon ? `ui-button--icon-${this.iconPosition}` : '',
      this.iconPosition === 'only' ? 'ui-button--icon-only' : ''
    ].filter(Boolean).join(' ');
  }
  handleClick(event: MouseEvent) {
    if (!this.disabled && !this.loading) {
      this.onClick.emit(event);
    }
  }
}

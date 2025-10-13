import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-ui-heading',
  templateUrl: './ui-heading.component.html',
  styleUrls: ['./ui-heading.component.scss']
})
export class UiHeadingComponent implements OnInit, OnChanges {
  @Input() level: 1 | 2 | 3 | 4 | 5 | 6 = 1;
  @Input() subtitle?: string;
  @Input() desc?: string;
  @Input() text: string = '';
  @Input() textAlign: 'left' | 'center' | 'right' = 'left';
  @Input() color: 'primary' | 'secondary' | 'accent' | 'text' | 'muted' | 'transparent' = 'text';
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' | 'top' | 'bottom' = 'left';
  @Input() iconSize: 'xs' | 's' | 'm' | 'l' | 'xl' | number = 'm';
  @Input() textSize?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | number;
  @Input() ariaLabel?: string;
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
    let size: string;
    if (this.iconSize) {
      size = typeof this.iconSize === 'number'
        ? `${this.iconSize}px`
        : `${this.iconSizes[this.iconSize] ?? this.iconSizes.m}px`;
    } else if (this.textSize) {
      size = typeof this.textSize === 'number'
        ? `${this.textSize}px`
        : this.textSizes[this.textSize] ?? this.textSizes.m;
    } else {
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
}

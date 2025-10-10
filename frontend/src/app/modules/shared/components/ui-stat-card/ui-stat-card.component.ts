import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
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
  @Input() icon?: string;         // Nombre de archivo SVG (sin la extensión)
  @Input() detailRoute?: string;

  svgContent: SafeHtml | null = null;
  isActive = false;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.icon) {
      this.http.get(`/assets/icons/${this.icon}.svg`, { responseType: 'text' }).subscribe({
        next: svg => this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svg),
        error: () => this.svgContent = null
      });
    }
  }

  onClick(): void {
    if (this.detailRoute) {
      this.router.navigate([this.detailRoute]);
    }
  }

  @HostListener('keydown.enter')
  @HostListener('keydown.space')
  onKeydown() { this.onClick(); }
}

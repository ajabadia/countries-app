import { Component, Input, ChangeDetectionStrategy, HostBinding, ViewChild, ElementRef, AfterContentInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiIconComponent, UiIconType } from '@shared/components/ui-icon/ui-icon.component';

// --- Tipos exportables para consistencia en la aplicación ---
export type ButtonColor = 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
export type ButtonVariant = 'solid' | 'outline' | 'ghost';
export type ButtonSize = 's' | 'm' | 'l';


@Component({
  selector: 'button[app-ui-button], a[app-ui-button]',
  standalone: true,
  imports: [CommonModule, UiIconComponent],
  templateUrl: './ui-button.component.html',
  styleUrls: ['./ui-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiButtonComponent implements AfterContentInit, OnChanges {
  // --- API del Botón ---
  @Input({ alias: 'button-color' }) color: ButtonColor = 'primary';
  @Input({ alias: 'button-variant' }) variant: ButtonVariant = 'solid';
  @Input({ alias: 'button-size' }) size: ButtonSize = 'm';
  @Input({ alias: 'button-disabled' }) disabled = false;
  @Input({ alias: 'button-loading' }) loading = false;
  @Input({ alias: 'button-full-width' }) fullWidth = false;
  @Input({ alias: 'button-aria-label' }) ariaLabel?: string;

  // --- API para el Icono ---
  @Input({ alias: 'icon-name' }) name?: string;
  @Input({ alias: 'icon-position' }) iconPosition: 'left' | 'right' | 'only' = 'left';
  @Input({ alias: 'icon-type' }) iconType: UiIconType = 'system';

  // --- Detección de contenido ---
  @ViewChild('contentWrapper') private contentWrapper!: ElementRef<HTMLSpanElement>;
  private hasContent = true;

  ngAfterContentInit(): void {
    this.updateHasContent();
  }

  ngOnChanges(): void {
    // Si el contenido se actualiza dinámicamente, necesitamos re-evaluar
    if (this.contentWrapper) {
      this.updateHasContent();
    }
  }

  private updateHasContent(): void {
    const content = this.contentWrapper.nativeElement.textContent?.trim() ?? '';
    this.hasContent = content.length > 0;
  }

  // --- Vinculación de clases al Host ---
  @HostBinding('class')
  get hostClasses(): string {
    const isIconOnly = this.name && (!this.hasContent || this.iconPosition === 'only');
    return `
      ui-button
      ui-button--${this.color}
      ui-button--${this.variant}
      ui-button--${this.size}
      ${this.loading ? 'ui-button--loading' : ''}
      ${this.fullWidth ? 'ui-button--full-width' : ''}
      ${isIconOnly ? 'ui-button--icon-only' : ''}
    `;
  }

  @HostBinding('attr.disabled')
  get isDisabled(): boolean | null {
    return this.disabled || this.loading ? true : null;
  }

  @HostBinding('attr.aria-label')
  get finalAriaLabel(): string | undefined {
    // Proporciona un aria-label si no hay texto visible, para accesibilidad.
    return this.ariaLabel || (this.name && !this.hasContent ? this.name : undefined);
  }
}
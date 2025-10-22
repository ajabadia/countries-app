// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-button\ui-button.component.ts | Last Modified: 2025-10-19

import { Component, Input, ChangeDetectionStrategy, HostBinding, ViewChild, ElementRef, AfterContentInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiIconComponent } from '@shared/components/ui-icon/ui-icon.component';
import { UiIconSize, UiIconType } from '@shared/services/icon.service';

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
  @Input({ alias: 'uiButtonColor' }) color: ButtonColor = 'primary';
  @Input({ alias: 'uiButtonVariant' }) variant: ButtonVariant = 'solid';
  @Input({ alias: 'uiButtonSize' }) size: ButtonSize = 'm';
  @Input({ alias: 'uiButtonDisabled' }) disabled = false;
  @Input({ alias: 'uiButtonLoading' }) loading = false;
  @Input({ alias: 'uiButtonFullWidth' }) fullWidth = false;
  @Input({ alias: 'uiButtonAriaLabel' }) ariaLabel?: string;

  // --- API para el Icono (Pass-through) ---
  @Input({ alias: 'uiIconName' }) iconName?: string;
  @Input({ alias: 'uiIconPosition' }) iconPosition: 'left' | 'right' | 'only' = 'left';
  @Input({ alias: 'uiIconType' }) iconType: UiIconType = 'system';
  @Input({ alias: 'uiIconSize' }) iconSize?: UiIconSize | 'inherit' | string;
  @Input({ alias: 'uiIconColor' }) iconColor?: string;
  @Input({ alias: 'uiIconClass' }) iconClass = '';

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
    // ✅ CORRECCIÓN: Se añade una guarda para comprobar que `contentWrapper` existe
    // antes de intentar acceder a `nativeElement`. Esto soluciona el error `TypeError`
    // que ocurre cuando el botón no tiene contenido proyectado.
    if (this.contentWrapper) {
      const content = this.contentWrapper.nativeElement.textContent?.trim() ?? '';
      this.hasContent = content.length > 0;
    }
  }

  // --- Vinculación de clases al Host ---
  @HostBinding('class')
  get hostClasses(): string {
    const isIconOnly = this.iconName && (!this.hasContent || this.iconPosition === 'only');
    return `
      ui-button
      ui-button--${this.color}
      ui-button--${this.variant}
      ui-button--${this.size}
      ${this.loading ? 'ui-button--loading' : ''}
      ${this.fullWidth ? 'ui-button--full-width' : ''}
      ${isIconOnly ? 'ui-button--icon-only' : ''}
    `.trim();
  }

  @HostBinding('attr.disabled')
  get isDisabled(): boolean | null {
    return this.disabled || this.loading ? true : null;
  }

  @HostBinding('attr.aria-label')
  get finalAriaLabel(): string | undefined {
    // Proporciona un aria-label si no hay texto visible, para accesibilidad.
    return this.ariaLabel || (this.iconName && !this.hasContent ? this.iconName : undefined);
  }
}
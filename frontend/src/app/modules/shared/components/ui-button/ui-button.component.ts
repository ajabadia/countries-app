// src/app/modules/shared/components/ui-button/ui-button.component.ts

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiIconType } from '@services/icon.service';
import { UiIconComponent } from '../ui-icon/ui-icon.component';

@Component({
  selector: 'app-ui-button',
  standalone: true,
  imports: [ CommonModule, UiIconComponent ],
  templateUrl: './ui-button.component.html',
  styleUrls: ['./ui-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() color: 'primary' | 'secondary' | 'accent' | 'danger' | 'surface' | 'success' | 'warning' | 'info' | 'icon' = 'primary';
  @Input() variant: 'solid' | 'outline' | 'ghost' | 'link' | 'icon' = 'solid'; // ✅ CORREGIDO: Añadido 'icon'
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' | 'only' = 'left';
  @Input() iconType: UiIconType = 'system';
  @Input() iconSize: string = '1em';
  @Input() ariaLabel?: string;

  @Output() onClick = new EventEmitter<MouseEvent>();

  get buttonClasses() {
    return {
      'ui-button': true,
      [`ui-button--${this.color}`]: true,
      [`ui-button--${this.variant}`]: true,
      [`ui-button--${this.size}`]: true,
      'ui-button--icon-only': this.iconPosition === 'only',
      'ui-button--loading': this.loading,
    };
  }

  handleClick(event: MouseEvent): void {
    // ✅ CORREGIDO: 'this.' autocompletado a 'this.loading'
    if (!this.disabled && !this.loading) {
      this.onClick.emit(event);
    }
  }
}
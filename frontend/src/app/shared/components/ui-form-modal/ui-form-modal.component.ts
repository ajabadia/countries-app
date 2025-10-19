// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-form-modal\ui-form-modal.component.ts | Last Modified: 2025-10-19

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

// Dependencias de componentes de UI compartidos
import { UiHeadingComponent } from '@shared/components/ui-heading/ui-heading.component';
import { UiButtonComponent } from '@shared/components/ui-button/ui-button.component';
import { UiToolbarButtonsComponent, ToolbarButtonConfig } from '@shared/components/ui-toolbar-buttons/ui-toolbar-buttons.component';

// Tipos de variantes para el modal
export type ModalVariant = 'info' | 'success' | 'error' | 'warning' | 'default';

@Component({
  selector: 'app-ui-form-modal',
  standalone: true,
  imports: [CommonModule, UiHeadingComponent, UiButtonComponent, UiToolbarButtonsComponent],
  templateUrl: './ui-form-modal.component.html',
  styleUrls: ['./ui-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormModalComponent {
  // --- Entradas (Inputs) Propias del Modal ---
  @Input({ alias: 'ui-form-modal-visible' }) visible = false;
  @Input({ alias: 'ui-form-modal-title' }) title = 'Formulario';
  @Input({ alias: 'ui-form-modal-variant' }) variant: ModalVariant = 'default';
  @Input({ alias: 'ui-form-modal-buttons' }) buttons: ToolbarButtonConfig[] = [];

  // --- Entradas de "Pass-through" para componentes hijos ---
  @Input({ alias: 'ui-heading-icon-name' }) headingIconName?: string;

  // --- Salidas (Outputs) del componente ---
  @Output() cancelClick = new EventEmitter<void>();

  get iconName(): string {
    const iconMap: Record<ModalVariant, string> = {
      info: 'icon-info-circle',
      success: 'icon-success',
      error: 'icon-error',
      warning: 'icon-warning',
      default: 'icon-pen',
    };
    return iconMap[this.variant];
  }

  onCancel(): void {
    this.cancelClick.emit();
  }
}
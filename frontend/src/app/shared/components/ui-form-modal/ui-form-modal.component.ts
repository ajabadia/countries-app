// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-form-modal\ui-form-modal.component.ts | Last Modified: 2025-10-19

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

// Dependencias de componentes de UI compartidos
import { UiHeadingComponent } from '@shared/components/ui-heading/ui-heading.component';
import { UiButtonComponent } from '@shared/components/ui-button/ui-button.component';

// Tipos de variantes para el modal
export type ModalVariant = 'info' | 'success' | 'error' | 'warning' | 'default';

@Component({
  selector: 'app-ui-form-modal',
  standalone: true,
  imports: [CommonModule, UiHeadingComponent, UiButtonComponent],
  templateUrl: './ui-form-modal.component.html',
  styleUrls: ['./ui-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormModalComponent {
  // --- Entradas (Inputs) Propias del Modal ---
  @Input({ alias: 'uiFormModalVisible' }) visible = false;
  @Input({ alias: 'uiFormModalTitle' }) title = 'Formulario';
  @Input({ alias: 'uiFormModalVariant' }) variant: ModalVariant = 'default';
  @Input({ alias: 'uiFormModalIsLoading' }) isLoading = false;

  // --- Entradas de "Pass-through" para componentes hijos ---
  @Input({ alias: 'uiHeadingIconName' }) headingIconName?: string;

  // --- Salidas (Outputs) del componente ---
  @Output('uiFormModalClose') close = new EventEmitter<void>();
  @Output('uiFormModalSave') save = new EventEmitter<void>();

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

  onClose(): void {
    this.close.emit();
  }

  onSave(): void {
    this.save.emit();
  }
}
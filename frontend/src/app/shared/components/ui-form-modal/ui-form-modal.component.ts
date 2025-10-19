// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-form-modal\ui-form-modal.component.ts | Last Modified: 2025-10-19

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

// Dependencias de componentes de UI compartidos
import { UiHeadingComponent } from '@shared/components/ui-heading/ui-heading.component';
import { UiButtonComponent, ButtonColor } from '@shared/components/ui-button/ui-button.component';
import { UiToolbarButtonsComponent, ToolbarButtonConfig } from '@shared/components/ui-toolbar-buttons/ui-toolbar-buttons.component';

// Tipos de variantes para el modal
export type ModalVariant = 'info' | 'success' | 'error' | 'warning' | 'default';

@Component({
  selector: 'app-ui-form-modal', // REFACTOR: Selector actualizado
  standalone: true,
  imports: [CommonModule, UiHeadingComponent, UiButtonComponent, UiToolbarButtonsComponent],
  templateUrl: './ui-form-modal.component.html', // REFACTOR: Apunta al nuevo nombre de archivo
  styleUrls: ['./ui-form-modal.component.scss'], // REFACTOR: Apunta al nuevo nombre de archivo
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormModalComponent implements OnChanges {
  // --- Entradas (Inputs) Propias del Modal ---
  @Input({ alias: 'ui-form-modal-visible' }) visible = false;
  @Input({ alias: 'ui-form-modal-title' }) title = 'Formulario';
  @Input({ alias: 'ui-form-modal-variant' }) variant: ModalVariant = 'default';
  @Input({ alias: 'ui-form-modal-is-loading' }) isLoading = false;

  // --- Entradas de "Pass-through" para componentes hijos ---
  @Input({ alias: 'ui-heading-icon-name' }) headingIconName?: string;
  @Input({ alias: 'ui-button-save-color' }) saveButtonColor: ButtonColor = 'primary';
  @Input({ alias: 'ui-button-cancel-color' }) cancelButtonColor: ButtonColor = 'secondary';

  // --- Salidas (Outputs) del componente ---
  @Output() saveClick = new EventEmitter<void>();
  @Output() cancelClick = new EventEmitter<void>();

  // --- Configuración para el Toolbar de Botones ---
  public footerButtons: ToolbarButtonConfig[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    // Si cualquier input que afecta a los botones cambia, los regeneramos.
    if (changes['isLoading'] || changes['saveButtonColor'] || changes['cancelButtonColor']) {
      this.updateFooterButtons();
    }
  }

  private updateFooterButtons(): void {
    this.footerButtons = [
      {
        id: 'cancel',
        label: 'Cancelar',
        action: () => this.onCancel(),
        color: this.cancelButtonColor,
        variant: 'outline',
      },
      {
        id: 'save',
        label: 'Guardar',
        action: () => this.onSave(),
        color: this.saveButtonColor,
        variant: 'solid',
        disabled$: of(this.isLoading),
      },
    ];
  }

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

  onSave(): void {
    if (!this.isLoading) {
      this.saveClick.emit();
    }
  }

  onCancel(): void {
    this.cancelClick.emit();
  }
}

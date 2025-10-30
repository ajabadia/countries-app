import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiHeadingComponent } from '@app/shared/components/ui-heading/ui-heading.component'; // Asumiendo esta ruta
import { UiButtonComponent } from '@app/shared/components/ui-button/ui-button.component'; // Asumiendo esta ruta

@Component({
  selector: 'app-ui-form-modal',
  standalone: true,
  imports: [CommonModule, UiHeadingComponent, UiButtonComponent],
  templateUrl: './ui-form-modal.component.html',
  styleUrls: ['./ui-form-modal.component.scss'],
})
export class UiFormModalComponent {
  // --- Inputs ---
  @Input() uiFormModalIsVisible: boolean = false;
  @Input() uiFormModalTitle: string = '';
  @Input() uiFormModalIsEditing: boolean = false; // Nuevo input para diferenciar Crear de Actualizar
  @Input() uiFormModalIsSaving: boolean = false;
  @Input() uiFormModalMode: 'form' | 'confirm' = 'form';

  // --- Outputs ---
  @Output() uiFormModalSave = new EventEmitter<void>();
  @Output() uiFormModalClose = new EventEmitter<void>();
  @Output() uiFormModalConfirm = new EventEmitter<void>(); // Nuevo evento para el modo confirmación

  onClose(): void {
    this.uiFormModalClose.emit();
  }

  onSave(): void {
    this.uiFormModalSave.emit();
  }

  onConfirm(): void {
    this.uiFormModalConfirm.emit();
  }
}
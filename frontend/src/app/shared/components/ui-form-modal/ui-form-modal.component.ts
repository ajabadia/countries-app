import { Component, Input, Output, EventEmitter, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
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
  @Input() uiFormModalFormGroup!: FormGroup; // Form group para el modo formulario
  @Input() uiFormModalIsSaving: boolean = false;
  @Input() uiFormModalMode: 'form' | 'confirm' = 'form';

  // --- Outputs ---
  @Output() uiFormModalSave = new EventEmitter<void>();
  @Output() uiFormModalClose = new EventEmitter<void>();

  // Propiedad computada para verificar si el formulario es inválido (solo relevante en modo 'form')
  isFormInvalid = computed(() => {
    if (this.uiFormModalMode === 'form' && this.uiFormModalFormGroup) {
      return this.uiFormModalFormGroup.invalid;
    }
    return false;
  });

  onClose(): void {
    this.uiFormModalClose.emit();
  }

  onSave(): void {
    this.uiFormModalSave.emit();
  }
}
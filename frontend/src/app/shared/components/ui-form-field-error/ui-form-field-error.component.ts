// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-form-field-error\ui-form-field-error.component.ts | New File

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-ui-form-field-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (errorMessage) {
      <div class="form-field-error">
        {{ errorMessage }}
      </div>
    }
  `,
  styles: `
    .form-field-error {
      color: var(--color-danger);
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
  `,
})
export class UiFormFieldErrorComponent implements OnChanges {
  @Input() control: AbstractControl | null = null;
  errorMessage: string | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['control']) {
      this.updateErrorMessage();
    }
  }

  private updateErrorMessage(): void {
    if (!this.control || !this.control.errors) {
      this.errorMessage = null;
      return;
    }

    const errors = this.control.errors;
    if (errors['required']) { this.errorMessage = 'Este campo es obligatorio.'; }
    else if (errors['minlength']) { this.errorMessage = `Debe tener al menos ${errors['minlength'].requiredLength} caracteres.`; }
    else if (errors['maxlength']) { this.errorMessage = `No puede tener más de ${errors['maxlength'].requiredLength} caracteres.`; }
    else if (errors['email']) { this.errorMessage = 'El formato del email no es válido.'; }
    else if (errors['pattern']) { this.errorMessage = 'El formato del campo no es válido.'; }
    else { this.errorMessage = 'Campo inválido.'; }
  }
}
// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-dynamic-form\ui-dynamic-form.component.ts | New File

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormField } from '@app/shared/types/form.types';
import { UiFormFieldErrorComponent } from '../ui-form-field-error/ui-form-field-error.component';

@Component({
  selector: 'app-ui-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiFormFieldErrorComponent],
  templateUrl: './ui-dynamic-form.component.html',
  styleUrls: ['./ui-dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDynamicFormComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) fields: FormField[] = [];

  /**
   * Transforma el valor de un campo de texto a mayúsculas o minúsculas
   * según la configuración del campo.
   * @param event El evento de input del campo.
   * @param field La configuración del campo.
   */
  onInput(event: Event, field: FormField): void {
    const control = this.form.get(field.name);
    if (!control || !field.characterCasing) return;

    let value = control.value as string;
    if (field.characterCasing === 'uppercase') {
      value = value.toUpperCase();
    } else if (field.characterCasing === 'lowercase') {
      value = value.toLowerCase();
    }
    control.setValue(value, { emitEvent: false });
  }
}
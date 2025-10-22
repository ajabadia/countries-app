// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-dynamic-form\ui-dynamic-form.component.ts | New File

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormField } from '@app/shared/types/form.types';

@Component({
  selector: 'app-ui-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ui-dynamic-form.component.html',
  styleUrls: ['./ui-dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDynamicFormComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) fields: FormField[] = [];
}
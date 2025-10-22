// File: d:\desarrollos\countries2\frontend\src\app\shared\types\form.types.ts | New File

import { ValidatorFn } from '@angular/forms';

export type FormFieldType = 'text' | 'number' | 'email' | 'password' | 'textarea' | 'select';

export interface FormField {
  name: string; // Corresponde al formControlName
  label: string;
  type: FormFieldType;
  placeholder?: string;
  validators?: ValidatorFn[];
  defaultValue?: any;
  options?: {
    value: string | number;
    label: string;
  }[];
}
// src/app/modules/admin/pages/areas/components/area-form/area-form.component.ts

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-area-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './area-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AreaFormComponent {
  /**
   * El FormGroup que controla el formulario.
   * Se pasa desde el componente padre (BaseAdminComponent).
   */
  @Input() form!: FormGroup;

  /**
   * Mensajes de error de validación.
   */
  @Input() validationErrors: { [key: string]: string[] } = {};
}
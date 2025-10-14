// src/app/modules/admin/pages/countries/components/country-form/country-form.component.ts

import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms'; // No necesita FormBuilder
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@Component({
  selector: 'app-country-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  templateUrl: './country-form.component.html',
  // No necesita su propio SCSS, puede usar los estilos globales de formulario
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryFormComponent implements OnInit {
  /**
   * ✅ MEJORA: Recibe el FormGroup desde el componente padre (el que hereda de BaseCrudComponent).
   * Esto centraliza la definición del formulario y sus validadores.
   */
  @Input({ required: true }) formGroup!: FormGroup;

  /**
   * ✅ MEJORA: Recibe un booleano para saber si está en modo edición.
   * Esto permite deshabilitar campos como el 'id' al editar.
   */
  @Input() isEditMode: boolean = false;

  constructor() {}

  ngOnInit(): void {
    // Deshabilita el control 'id' si estamos en modo de edición.
    if (this.isEditMode) {
      this.formGroup.get('id')?.disable();
    } else {
      this.formGroup.get('id')?.enable();
    }
  }
}
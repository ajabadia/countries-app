// src/app/modules/admin/pages/countries/components/country-form/country-form.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-country-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-container" [formGroup]="form">
      <div class="form-field">
        <label for="defaultname">Nombre</label>
        <input id="defaultname" formControlName="defaultname" placeholder="Ej: España">
      </div>
      <div class="form-field">
        <label for="alpha2may">Alpha-2</label>
        <input id="alpha2may" formControlName="alpha2may" placeholder="ES">
      </div>
      <!-- Agrega aquí el resto de los campos del formulario -->
    </div>
  `,
  styleUrls: ['./country-form.component.scss']
})
export class CountryFormComponent {
  @Input() form!: FormGroup;
}
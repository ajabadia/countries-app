// src/app/modules/admin/pages/countries/components/country-form/country-form.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-country-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Ya no se importa SharedModule
  templateUrl: './country-form.component.html'
})
export class CountryFormComponent {
  @Input() form!: FormGroup;
}
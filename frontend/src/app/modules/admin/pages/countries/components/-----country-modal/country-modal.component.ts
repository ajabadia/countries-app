// src/app/modules/admin/pages/countries/components/country-modal/country-modal.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Country } from 'src/app/modules/shared/models/country.model';
import { CommonModule } from '@angular/common'; // Necesario para ngIf
import { SharedModule } from 'src/app/modules/shared/shared.module'; // Para botones, etc.

@Component({
  selector: 'app-country-modal',
  standalone: true, // ¡CLAVE!
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule // ¡CLAVE! Para [formGroup]
  ],
  templateUrl: './country-modal.component.html',
  styleUrls: ['./country-modal.component.scss'],
})
export class CountryModalComponent implements OnInit {
  @Input() country!: Country;
  countryForm!: FormGroup;
  isEditMode = false;
  
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isEditMode = !!this.country;
    this.countryForm = this.fb.group({
      id: [{ value: this.country?.id || '', disabled: this.isEditMode }, [Validators.required, Validators.maxLength(2)]],
      defaultname: [this.country?.defaultname || '', Validators.required],
      alpha2may: [this.country?.alpha2may || '', [Validators.required, Validators.maxLength(2)]],
      alpha3may: [this.country?.alpha3may || '', [Validators.required, Validators.maxLength(3)]],
      numeric: [this.country?.numeric || '', Validators.required],
    });
  }

  save(): void {
    if (this.countryForm.valid) {
      this.activeModal.close(this.countryForm.getRawValue());
    }
  }
}
// src/app/modules/country/components/country-modal/country-modal.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Country } from 'src/app/core/models/country.model';

@Component({
  selector: 'app-country-modal',
  templateUrl: './country-modal.component.html',
  styleUrls: ['./country-modal.component.scss'],
})
export class CountryModalComponent implements OnInit {
  @Input() country!: Country;
  
  countryForm!: FormGroup;
  isEditMode: boolean = false;
  modalTitle: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.country;
    this.modalTitle = this.isEditMode ? `Editar País: ${this.country.defaultname}` : 'Crear Nuevo País';
    this.buildForm();
  }

  private buildForm(): void {
    this.countryForm = this.fb.group({
      id: [
        { value: this.country?.id || '', disabled: this.isEditMode },
        [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.pattern('^[a-zA-Z]+$')]
      ],
      defaultname: [this.country?.defaultname || '', [Validators.required]],
      alpha2may: [this.country?.alpha2may || '', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      alpha3may: [this.country?.alpha3may || '', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      numeric: [this.country?.numeric || '', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  save(): void {
    if (this.countryForm.invalid) {
      this.countryForm.markAllAsTouched();
      return;
    }
    this.activeModal.close(this.countryForm.getRawValue());
  }
}
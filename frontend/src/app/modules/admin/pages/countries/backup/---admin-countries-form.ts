// admin-countries-form.ts
// Lógica del formulario para añadir o editar países.

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country, CountriesService } from 'src/app/services/countries.service';

export class CountryFormManager {
  form: FormGroup;
  isEditMode = false;         // ¿Estamos editando un país existente?
  showFormModal = false;      // ¿Está visible el formulario (ventana modal)?

  // Modelo vacío, útil para inicializar el formulario
  COUNTRY_EMPTY: Country = {
    id: '',
    alpha2may: '',
    alpha3may: '',
    numeric: '',
    defaultname: ''
  };

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) {
    // Inicializamos el formulario con validaciones (ejemplo: todos obligatorios excepto id)
    this.form = this.fb.group({
      id:            [''],
      alpha2may:     ['', Validators.required],
      alpha3may:     ['', Validators.required],
      numeric:       ['', Validators.required],
      defaultname:   ['', Validators.required]
    });
  }

  // Para botón "Añadir": abre el formulario limpio
  startAdd() {
    this.isEditMode = false;
    this.form.reset(this.COUNTRY_EMPTY);
    this.showFormModal = true;
  }

  // Para botón "Editar": abre el formulario con el país a editar
  startEdit(country: Country) {
    this.isEditMode = true;
    this.form.patchValue(country);
    this.showFormModal = true;
  }

  // Guardar cambios (añadir o modificar existente)
  saveCountry(onSaved: (country: Country) => void) {
    const data = this.form.value as Country;
    if (this.isEditMode) {
      this.countriesService.updateCountry(data).subscribe(onSaved);
    } else {
      this.countriesService.addCountry(data).subscribe(onSaved);
    }
    this.showFormModal = false;
  }
}

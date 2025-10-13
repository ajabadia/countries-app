// admin-countries-selection.ts
// Lógica para seleccionar uno o varios países de la tabla y configurar los botones.

import { Country } from 'src/app/services/countries.service';

export class CountrySelectionManager {
  selectedCountries: Country[] = [];  // Array de países seleccionados

  // Marcar/Desmarcar un país
  toggleCountrySelection(country: Country, selected: boolean) {
    if (selected) {
      this.selectedCountries.push(country);
    } else {
      this.selectedCountries = this.selectedCountries.filter(c => c.id !== country.id);
    }
  }

  // ¿Se puede editar? (solo si hay uno seleccionado)
  canEdit(): boolean {
    return this.selectedCountries.length === 1;
  }

  // ¿Se puede borrar? (solo si hay como mínimo uno seleccionado)
  canDelete(): boolean {
    return this.selectedCountries.length > 0;
  }
}

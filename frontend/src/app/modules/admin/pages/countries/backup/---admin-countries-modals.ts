// admin-countries-modals.ts
// Lógica para mostrar/cerrar ventanas emergentes (modals) para confirmar acciones, etc.

import { CountriesService, Country } from 'src/app/services/countries.service';

export class CountryModalsManager {
  showFormModal = false;      // Modal visible para editar/crear país
  showConfirmModal = false;   // Modal visible para confirmar borrado

  constructor(private countriesService: CountriesService) {}

  // Mostrar modal de confirmación de borrado
  confirmDelete() {
    this.showConfirmModal = true;
  }

  // Ejecutar borrado real (llama a la API/backend)
  onConfirmDeletion(selectedCountries: Country[], onDeleted: () => void) {
    this.countriesService.deleteCountries(selectedCountries.map(c => c.id)).subscribe(onDeleted);
    this.showConfirmModal = false;
  }
}

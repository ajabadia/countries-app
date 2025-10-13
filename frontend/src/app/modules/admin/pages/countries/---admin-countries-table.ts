// admin-countries-table.ts
// Lógica de la tabla principal: muestra la lista de países y gestiona su carga, búsqueda y paginación.

import { Country, CountriesService } from 'src/app/services/countries.service';

// Estado principal de la tabla y paginación
export class CountriesTableManager {
  countries: Country[] = [];           // Lista completa de países
  filteredCountries: Country[] = [];   // Lista tras aplicar búsqueda/filtros
  columns = [                          // Columnas que aparecerán en la tabla
    { field: 'id',        header: 'ID' },
    { field: 'alpha2may', header: 'Alpha-2' },
    { field: 'alpha3may', header: 'Alpha-3' },
    { field: 'numeric',   header: 'Numérico' },
    { field: 'defaultname', header: 'Nombre por defecto' }
  ];
  page = 1;
  perPage = 25;
  totalPages = 1;
  searchTerm = '';

  constructor(private countriesService: CountriesService) {}

  // Cargar todos los países de la BD al abrir la página de administración
  loadCountries() {
    this.countriesService.getAllCountries().subscribe(lista => {
      this.countries = lista;
      this.resetPagination();
      this.applyFilters();
    });
  }

  // Aplica el filtro de búsqueda, por texto
  applyFilters() {
    if (this.searchTerm) {
      this.filteredCountries = this.countries.filter((p) =>
        p.defaultname.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCountries = [...this.countries];
    }
    this.totalPages = Math.ceil(this.filteredCountries.length / this.perPage);
  }

  // Reinicia la paginación
  resetPagination() {
    this.page = 1;
    this.totalPages = Math.ceil(this.countries.length / this.perPage);
  }
}

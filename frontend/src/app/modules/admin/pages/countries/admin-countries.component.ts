
// admin-countries.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/modules/shared/models/country.model';
import { CountriesService } from '../../../../services/countries.service';
import { COUNTRY_TABLE_COLUMNS } from './country-table.columns';


@Component({
  selector: 'app-admin-countries',
  templateUrl: './admin-countries.component.html',
  styleUrls: ['./admin-countries.component.scss'],
})
export class AdminCountriesComponent implements OnInit {
  // ==== Estados y colecciones principales ====
  countries: Country[] = [];
  pagedCountries: Country[] = [];
  selectedCountries: Country[] = [];
  editingCountry: Country | null = null;
// columnas
  columns = COUNTRY_TABLE_COLUMNS;
  // ==== Formulario reactivo para el modal ====
  countryForm: FormGroup;

  // ==== Estados de la interfaz (modals, paginación, etc) ====
  showEditModal = false;
  isEditMode = false;
  showConfirmDialog = false;
  searchTerm = '';
  page = 1;
  // Cambia perPage por pageSize para correspondencia directa con paginador
  pageSize: number = 25;
  totalPages = 1;
  totalCountries: number = 0; // Número total tras filtros

  // ==== Ordenación ====
  sortKey: string = 'name';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) {
    // Inicializamos el formulario básico (puedes ampliarlo)
    this.countryForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      // ...otros campos...
    });
  }

  // ===============================
  //           LIFECYCLE
  // ===============================
  ngOnInit() {
    this.loadCountries();
  }

  // ===============================
  //         CARGA Y LISTADO
  // ===============================

  /** Carga los países desde el backend */
  loadCountries() {
    this.countriesService.getAll().subscribe((data: Country[]) => {
      this.countries = data;
      this.applyFilterSortAndPaging();
    });
  }

  /** Aplica filtro, orden y paginación al listado ya cargado */
  applyFilterSortAndPaging() {
    // Filtrado
let filtered = this.countries.filter(country =>
  (
    (country['defaultname'] || '') +
    ' ' + (country['alpha2may'] || '') +
    ' ' + (country['numeric'] || '') +
    ' ' + (country['id'] || '') +
    ' ' + (country['alpha3may'] || '')
  ).toLowerCase().includes(this.searchTerm.toLowerCase())
);


    // Ordenación
    filtered = filtered.sort((a, b) => {
      const aValue = a[this.sortKey] ?? '';
      const bValue = b[this.sortKey] ?? '';
      return this.sortOrder === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
    // Paginación local usando pageSize en vez de perPage
    this.totalPages = Math.ceil(filtered.length / this.pageSize);
    const start = (this.page - 1) * this.pageSize;
    this.pagedCountries = filtered.slice(start, start + this.pageSize);
    this.totalCountries = filtered.length; // <-- Actualiza aquí
  }

  // ===============================
  //         INTERACCIONES UI
  // ===============================

  /** Al cambiar el término de búsqueda (llamado desde ngModel y handleSearchInput) */

onSearchChange(term: string) {
  this.searchTerm = term;
  this.page = 1;
  this.applyFilterSortAndPaging();
}

  /** Compatible: método seguro para Angular 17+ si decides usar $event */
  handleSearchInput(event: Event) {
    this.onSearchChange((event.target as HTMLInputElement).value);
  }

  /** Recarga todos los datos */
  onRefresh() {
    this.loadCountries();
  }

  /** Prepara modal para crear país */
  onAddCountry() {
    this.editingCountry = null;
    this.isEditMode = false;
    this.countryForm.reset();
    this.showEditModal = true;
  }

  /** Prepara modal para editar país */
  onEditCountry(country: Country) {
    this.editingCountry = { ...country };
    this.isEditMode = true;
    this.countryForm.patchValue(this.editingCountry);
    this.showEditModal = true;
  }

  /** Llama cuando se guarda desde la modal (crear/editar) */
  onSaveCountry(data: any) {
    const isEdit = !!this.editingCountry;
    const action$ = isEdit
      ? this.countriesService.update({ ...this.editingCountry, ...data })
      : this.countriesService.create(data);

    action$.subscribe(() => {
      this.showEditModal = false;
      this.loadCountries();
    });
  }

  /** Cierra el modal de edición/creación */
  onCloseModal() {
    this.showEditModal = false;
  }

  /** Al cambiar selección de la tabla */
  onSelectionChange(selected: Country[]) {
    this.selectedCountries = selected;
  }

  /** Al ordenar columnas en la tabla */
  onSortChange({ key, order }: { key: string; order: 'asc' | 'desc' }) {
    this.sortKey = key;
    this.sortOrder = order;
    this.applyFilterSortAndPaging();
  }

  /** Cambio de página */
  onPageChange(newPage: number) {
    this.page = newPage;
    this.applyFilterSortAndPaging();
  }

  /** Cambio de tamaño de página (paginador) */
  onPageSizeChange(event: number) {
    this.pageSize = event;
    this.page = 1; // Reinicia a la primera página
    this.applyFilterSortAndPaging();
  }

  // ===============================
  //    CONFIRMACIÓN Y BORRADO
  // ===============================

  /** Confirma borrado múltiple */
  onConfirmDelete() {
    this.countriesService
      .deleteMany(this.selectedCountries.map((c) => c.id))
      .subscribe(() => {
        this.showConfirmDialog = false;
        this.selectedCountries = [];
        this.loadCountries();
      });
  }

  /** Cancela ventana de borrado múltiple */
  onCancelDelete() {
    this.showConfirmDialog = false;
  }
}

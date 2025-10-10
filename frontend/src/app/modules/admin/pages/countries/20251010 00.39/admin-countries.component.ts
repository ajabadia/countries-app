import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableColumn } from 'src/app/modules/shared/models/table-column.model';
import { CountriesService, Country } from 'src/app/services/countries.service';

const COUNTRY_EMPTY: Country = {
  id: '',
  alpha2may: '',
  alpha3may: '',
  numeric: '',
  defaultname: ''
};

@Component({
  selector: 'app-admin-countries',
  templateUrl: './admin-countries.component.html',
  styleUrls: ['./admin-countries.component.scss']
})
export class AdminCountriesComponent implements OnInit {

  searchTerm: string = '';
  countries: Country[] = [];
  tableColumns: TableColumn[] = [
    { key: 'toggle', label: '', sticky: 'left', width: '44px' },
    { key: 'defaultname', label: 'Nombre', sortable: true, minWidth: '55%' sticky: 'left' },
    { key: 'alpha2may', label: 'Alpha-2', sortable: true, maxWidth: '5%', sticky: 'right' },
    { key: 'alpha3may', label: 'Alpha-3', sortable: true, maxWidth: '5%', sticky: 'right' },
    { key: 'numeric', label: 'Numérico', sortable: true, maxWidth: '5%', sticky: 'right' }
  ];
  totalCountries = 0;
  page = 1;
  pageSize = 10;
  selectedItems: Country[] = [];
  sortKey: string | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';

  pais: Country = { ...COUNTRY_EMPTY };
  showEditModal = false;
  showConfirmDelete = false;
  editMode = false;
  errorMsg = '';
  countryForm!: FormGroup;

  get totalPages(): number {
    return Math.ceil(this.totalCountries / this.pageSize) || 1;
  }

  constructor(
    private countriesService: CountriesService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.countryForm = this.fb.group({
      id: ['', Validators.required],
      alpha2may: [''],
      alpha3may: [''],
      numeric: [''],
      defaultname: ['', Validators.required]
    });
    this.fetchCountries();
  }

  fetchCountries(): void {
    this.countriesService.getCountries({
      search: this.searchTerm,
      page: this.page,
      pageSize: this.pageSize,
      sortKey: this.sortKey ?? undefined,
      sortOrder: this.sortOrder
    }).subscribe((result: { data: Country[]; total: number }) => {
      this.countries = result.data;
      this.totalCountries = result.total;
    });
  }

  onValueChange(term: string): void {
    this.searchTerm = term;
    this.page = 1;
    this.fetchCountries();
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.fetchCountries();
  }

  onSelectionChange(selectedRows: Country[]): void {
    this.selectedItems = selectedRows;
  }

  onSortChange(sort: { key: string, order: 'asc' | 'desc' }): void {
    this.sortKey = sort.key;
    this.sortOrder = sort.order;
    this.fetchCountries();
  }

  // ---- Modales, Modelo y Formulario ----
  onNew(): void {
    this.editMode = false;
    this.showEditModal = true;
    this.countryForm.reset();
    this.countryForm.patchValue({ ...COUNTRY_EMPTY });
    this.errorMsg = '';
    this.selectedItems = [];
    this.pais = { ...COUNTRY_EMPTY };
  }

  onEdit(row?: Country): void {
    const paisEditar = row || this.selectedItems[0];
    if (!paisEditar) { return; }
    this.editMode = true;
    this.showEditModal = true;
    this.countryForm.reset();
    this.countryForm.patchValue({ ...paisEditar });
    this.errorMsg = '';
    this.pais = { ...paisEditar };
  }

  saveCountry(): void {
    if (this.countryForm.invalid) {
      this.errorMsg = 'Rellena todos los campos obligatorios';
      return;
    }
    const valores = this.countryForm.value as Country;
    if (this.editMode) {
      this.countriesService.updateCountry(valores).subscribe(
        () => {
          this.showEditModal = false;
          this.fetchCountries();
          this.selectedItems = [];
          this.pais = { ...COUNTRY_EMPTY };
        },
        error => {
          this.errorMsg = 'Error actualizando país';
          console.error(error);
        }
      );
    } else {
      this.countriesService.createCountry(valores).subscribe(
        () => {
          this.showEditModal = false;
          this.fetchCountries();
          this.selectedItems = [];
          this.pais = { ...COUNTRY_EMPTY };
        },
        error => {
          this.errorMsg = 'Error creando país';
          console.error(error);
        }
      );
    }
  }

  closeCountryModal(): void {
    this.showEditModal = false;
    this.countryForm.reset();
    this.editMode = false;
    this.errorMsg = '';
    this.selectedItems = [];
    this.pais = { ...COUNTRY_EMPTY };
  }

  abrirConfirmEliminar(): void {
    const toDelete = this.selectedItems[0] || this.pais;
    if (!toDelete || !toDelete.id) { return; }
    this.pais = { ...toDelete };
    this.showConfirmDelete = true;
  }

eliminarPais(): void {
  if (!this.pais || !this.pais.id) { return; }
  this.countriesService.deleteCountry(this.pais.id).subscribe(() => {
    this.showConfirmDelete = false;
    this.fetchCountries();
    this.selectedItems = [];
    this.pais = { ...COUNTRY_EMPTY };
  });
}

cancelarEliminar(): void {
  this.showConfirmDelete = false;
  this.pais = { ...COUNTRY_EMPTY };
}


  onDeleteSelected(): void {
    if (this.selectedItems.length > 0) {
      this.editMode = true;
      this.countryForm.patchValue({ ...this.selectedItems[0] });
      this.abrirConfirmEliminar();
    }
  }
}

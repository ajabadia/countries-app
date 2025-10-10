import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableColumn } from 'src/app/modules/shared/models/table-column.model';
import { CountriesService, Country } from 'src/app/services/countries.service';
import { SelectionService } from 'src/app/modules/shared/components/services/selection/selection.service';

// País vacío para inicializar/resetear formularios y selección
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
  // --- Estados básicos de la vista ---
  searchTerm = '';
  countries: Country[] = [];
  tableColumns: TableColumn[] = [
    { key: 'toggle', label: '', sticky: 'left', width: '44px' },
    { key: 'defaultname', label: 'Nombre', sortable: true, minWidth: '35%' },
    { key: 'alpha2may', label: 'Alpha-2', sortable: true, maxWidth: '5%', sticky: 'right' },
    { key: 'alpha3may', label: 'Alpha-3', sortable: true, maxWidth: '5%', sticky: 'right' },
    { key: 'numeric', label: 'Numérico', sortable: true, maxWidth: '5%', sticky: 'right' }
  ];
  totalCountries = 0;
  page = 1;
  pageSize = 10;
  sortKey: string | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';
  
  // --- Estados de la UI/modal/formulario ---
  pais: Country = { ...COUNTRY_EMPTY };
  showEditModal = false;
  showConfirmDelete = false;
  editMode = false;
  errorMsg = '';
  countryForm!: FormGroup;

  // --- Servicio avanzado de selección de filas ---
  public selection: SelectionService<Country> = new SelectionService<Country>();
  // Proxy para compatibilidad con <app-toolbar-buttons>
  get selectedItems(): Country[] { return this.selection.selected; }
  set selectedItems(val: Country[]) { this.selection.selected = val; }

  constructor(
    private countriesService: CountriesService,
    private fb: FormBuilder
  ) {}

  // --- Inicialización: crea el formulario y carga los países ---
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

  // --- Carga los países de la página activa ---
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
      // Sincroniza la selección solo a filas visibles (paginación)
      this.selection.selected = this.selection.selected.filter(sel =>
        this.countries.some(c => c.id === sel.id)
      );
    });
  }

  // --- Interacciones de paginación, búsqueda y ordenación ---
  onValueChange(term: string): void {
    this.searchTerm = term;
    this.page = 1;
    this.fetchCountries();
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.fetchCountries();
  }

  onSortChange(sort: { key: string, order: 'asc' | 'desc' }): void {
    this.sortKey = sort.key;
    this.sortOrder = sort.order;
    this.fetchCountries();
  }

  // --- Selección avanzada y compatibilidad con tabla/toolbar ---
  onSelectionChange(selectedRows: Country[]): void {
    this.selection.selected = [...selectedRows];
  }

  isSelected(row: Country): boolean {
    return this.selection.selected.some(item => item.id === row.id);
  }

  // Click en fila: selección simple, múltiple o por rango
  onRowClick(row: Country, event: MouseEvent): void {
    if (event.ctrlKey || event.metaKey) {
      // Toggle selección
      if (this.isSelected(row)) {
        this.selection.selected = this.selection.selected.filter(item => item.id !== row.id);
      } else {
        this.selection.selected = [...this.selection.selected, row];
      }
    } else if (event.shiftKey) {
      // Selección por rango
      const lastIdx = this.countries.findIndex(item => item.id === (this.selection.selected[this.selection.selected.length - 1]?.id));
      const thisIdx = this.countries.findIndex(item => item.id === row.id);
      if (lastIdx !== -1) {
        const [start, end] = [lastIdx, thisIdx].sort((a, b) => a - b);
        const range = this.countries.slice(start, end + 1);
        const newSelection = [
          ...this.selection.selected,
          ...range.filter(r => !this.isSelected(r))
        ];
        this.selection.selected = this.countries.filter(country =>
          newSelection.some(s => s.id === country.id)
        );
      } else {
        this.selection.selected = [row];
      }
    } else {
      this.selection.selected = [row];
    }
  }

  // --- Funciones generales y por fila para los toggles de selección/checkboxes ---
  get generalToggleState(): 'checked' | 'unchecked' | 'indeterminate' {
    if (this.selection.selected.length === this.countries.length && this.countries.length > 0)
      return 'checked';
    if (this.selection.selected.length > 0)
      return 'indeterminate';
    return 'unchecked';
  }

  rowToggleState(row: Country): 'checked' | 'unchecked' {
    return this.isSelected(row) ? 'checked' : 'unchecked';
  }

  // Toggle general (cabecera)
  onGeneralToggle(newState: 'checked' | 'unchecked' | 'indeterminate'): void {
    if (newState === 'checked') {
      this.selection.selected = [...this.countries];
    } else {
      this.selection.selected = [];
    }
  }

  // Toggle individual (por fila)
  onRowToggle(row: Country, newState: 'checked' | 'unchecked' | 'indeterminate'): void {
    if (newState === 'checked') {
      if (!this.isSelected(row)) {
        this.selection.selected = [...this.selection.selected, row];
      }
    } else {
      this.selection.selected = this.selection.selected.filter(item => item.id !== row.id);
    }
  }

  // --- Getters para la habilitación de botones y estilos de selección ---
  get allVisibleSelected() {
    return this.selection.selected.length === this.countries.length && this.countries.length > 0;
  }
  get someVisibleSelected() {
    return this.selection.selected.length > 0 && this.selection.selected.length < this.countries.length;
  }
  get anySelected() {
    return this.selection.selected.length > 0;
  }

  // --- Gestión de modales y flujo CRUD ---
  onNew(): void {
    this.editMode = false;
    this.showEditModal = true;
    this.countryForm.reset();
    this.countryForm.patchValue({ ...COUNTRY_EMPTY });
    this.errorMsg = '';
    this.selection.selected = [];
    this.pais = { ...COUNTRY_EMPTY };
  }

  onEdit(row?: Country): void {
    const paisEditar = row || this.selection.selected[0];
    if (!paisEditar) return;
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
          this.selection.selected = [];
          this.pais = { ...COUNTRY_EMPTY };
        },
        error => {
          this.errorMsg = 'Error actualizando país';
          console.error(error);
        });
    } else {
      this.countriesService.createCountry(valores).subscribe(
        () => {
          this.showEditModal = false;
          this.fetchCountries();
          this.selection.selected = [];
          this.pais = { ...COUNTRY_EMPTY };
        },
        error => {
          this.errorMsg = 'Error creando país';
          console.error(error);
        });
    }
  }

  closeCountryModal(): void {
    this.showEditModal = false;
    this.countryForm.reset();
    this.editMode = false;
    this.errorMsg = '';
    this.selection.selected = [];
    this.pais = { ...COUNTRY_EMPTY };
  }

  abrirConfirmEliminar(): void {
    const toDelete = this.selection.selected[0] || this.pais;
    if (!toDelete || !toDelete.id) return;
    this.pais = { ...toDelete };
    this.showConfirmDelete = true;
  }

  eliminarPais(): void {
    if (!this.pais || !this.pais.id) return;
    this.countriesService.deleteCountry(this.pais.id).subscribe(() => {
      this.showConfirmDelete = false;
      this.fetchCountries();
      this.selection.selected = [];
      this.pais = { ...COUNTRY_EMPTY };
    });
  }

  cancelarEliminar(): void {
    this.showConfirmDelete = false;
    this.pais = { ...COUNTRY_EMPTY };
  }

  onDeleteSelected(): void {
    if (this.selection.selected.length > 0) {
      this.editMode = true;
      this.countryForm.patchValue({ ...this.selection.selected[0] });
      this.abrirConfirmEliminar();
    }
  }

  // --- Paginación auxiliar ---
  get totalPages(): number {
    return Math.ceil(this.totalCountries / this.pageSize) || 1;
  }
}

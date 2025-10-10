import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableColumn } from 'src/app/modules/shared/models/table-column.model';
import { CountriesService, Country } from 'src/app/services/countries.service';
import { SelectionService } from 'src/app/modules/shared/components/services/selection/selection.service';

// País vacío para resets/modales
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
  // --- Estados del componente ---
  searchTerm: string = '';
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

  pais: Country = { ...COUNTRY_EMPTY };
  showEditModal = false;
  showConfirmDelete = false;
  editMode = false;
  errorMsg = '';
  countryForm!: FormGroup;

  constructor(
    private countriesService: CountriesService,
    private fb: FormBuilder,
    public selection: SelectionService<Country>
  ) {}

  // Total de páginas para el paginador
  get totalPages(): number {
    return Math.ceil(this.totalCountries / this.pageSize) || 1;
  }

  // Estado visual del toggle general (cabecera)
  get generalToggleState(): 'checked' | 'unchecked' | 'indeterminate' {
    if (this.selection.selected.length === this.countries.length && this.countries.length > 0) return 'checked';
    if (this.selection.selected.length > 0) return 'indeterminate';
    return 'unchecked';
  }

  // Estado visual de cada toggle por fila
  rowToggleState(row: Country): 'checked' | 'unchecked' {
    return this.selection.selected.some(item => item.id === row.id) ? 'checked' : 'unchecked';
  }

  // --- FUNCIONES DE SELECCIÓN VISUAL Y ACCESIBILIDAD ---
  isSelected(row: Country): boolean {
    return this.selection.selected.some(item => item.id === row.id);
  }

  // Click en fila: selección avanzada (ctrl, shift, simple)
  onRowClick(row: Country, event: MouseEvent): void {
    if (event.ctrlKey || event.metaKey) {
      // Toggle selección con Ctrl/Cmd
      if (this.isSelected(row)) {
        this.selection.selected = this.selection.selected.filter(item => item.id !== row.id);
      } else {
        this.selection.selected = [...this.selection.selected, row];
      }
    } else if (event.shiftKey) {
      // Selección por rango con Shift
      const lastIdx = this.countries.findIndex(item => item.id === (this.selection.selected[this.selection.selected.length - 1]?.id));
      const thisIdx = this.countries.findIndex(item => item.id === row.id);
      if (lastIdx !== -1) {
        const [start, end] = [lastIdx, thisIdx].sort((a, b) => a - b);
        const range = this.countries.slice(start, end + 1);
        const newSelection = [
          ...this.selection.selected,
          ...range.filter(r => !this.isSelected(r))
        ];
        // Elimina duplicados y mantiene orden original
        this.selection.selected = this.countries.filter(country =>
          newSelection.some(s => s.id === country.id)
        );
      } else {
        this.selection.selected = [row];
      }
    } else {
      // Selección simple (click normal)
      this.selection.selected = [row];
    }
  }

  // --- CRUD Y MODALES ---
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
      // Sincro selección según la página visible
      this.selection.selected = this.selection.selected.filter(sel =>
        this.countries.some(c => c.id === sel.id)
      );
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
    this.selection.selected = [...selectedRows];
  }

  onSortChange(sort: { key: string, order: 'asc' | 'desc' }): void {
    this.sortKey = sort.key;
    this.sortOrder = sort.order;
    this.fetchCountries();
  }

  // --- FUNCIONES DE TOGGLE GENERAL Y FILA ---
  onGeneralToggle(newState: 'checked' | 'unchecked' | 'indeterminate') {
    if (newState === 'checked') {
      this.selection.selected = [...this.countries];
    } else {
      this.selection.selected = [];
    }
  }

  onRowToggle(row: Country, newState: 'checked' | 'unchecked' | 'indeterminate') {
    if (newState === 'checked') {
      if (!this.isSelected(row)) {
        this.selection.selected = [...this.selection.selected, row];
      }
    } else {
      this.selection.selected = this.selection.selected.filter(item => item.id !== row.id);
    }
  }

  // --- GETTERS PARA BOTONES Y MODALES ---
  get allVisibleSelected() { return this.selection.selected.length === this.countries.length && this.countries.length > 0; }
  get someVisibleSelected() { return this.selection.selected.length > 0 && this.selection.selected.length < this.countries.length; }
  get anySelected() { return this.selection.selected.length > 0; }

  // --- MODALES Y FLUJO CRUD ---
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
        }
      );
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
        }
      );
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
}

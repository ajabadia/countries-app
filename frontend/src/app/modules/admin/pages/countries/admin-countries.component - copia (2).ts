//admin-countries.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableColumn } from 'src/app/modules/shared/models/table-column.model';
import { CountriesService, Country } from 'src/app/services/countries.service';
import { SelectionService } from 'src/app/modules/shared/components/services/selection/selection.service';
import { ToolbarButtonConfig } from 'src/app/modules/shared/components/toolbar-buttons/toolbar-buttons.component';





// Interfaz global para la configuración de toolbar-buttons

/* ---antiguo, quitar cuando vaya bien--
export interface ToolbarButtonConfig {
  iconSrc: string; // Ruta al SVG de iconos (ej: 'assets/icons/icon-add.svg')
  label: string;
  color: 'main' | 'edit' | 'danger' | string;
  disabled?: boolean;
  action: () => void;
}
  */

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
  //---------------------------
  // ESTADOS PRINCIPALES
  //---------------------------
  searchTerm = '';
  countries: Country[] = [];
tableColumns: TableColumn[] = [
  { key: 'toggle', label: '', sticky: 'left', width: '44px' },
  { key: 'defaultname', label: 'Nombre', sortable: true, width: '40%', minWidth: '160px' },
  { key: 'alpha2may', label: 'Alpha-2', sortable: true, maxWidth: '8%', sticky: 'right' },
  { key: 'alpha3may', label: 'Alpha-3', sortable: true, maxWidth: '8%', sticky: 'right' },
  { key: 'numeric', label: 'Numérico', sortable: true, maxWidth: '8%', sticky: 'right' }
];


  totalCountries = 0;
  page = 1;
  pageSize = 10;
  sortKey: string | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';

  //---------------------------
  // ESTADOS DE MODAL, FORMULARIO Y ERRORES
  //---------------------------
  pais: Country = { ...COUNTRY_EMPTY };
  showEditModal = false;
  showConfirmDelete = false;
  editMode = false;
  errorMsg = '';
  countryForm!: FormGroup;

  //---------------------------
  // SELECCIÓN Y TOOLBAR
  //---------------------------
  public selection: SelectionService<Country> = new SelectionService<Country>();
  get selectedItems(): Country[] { return this.selection.selected; }
  set selectedItems(val: Country[]) { this.selection.selected = val; }

  entity = 'country';

  // Botones de la toolbar configurados y sincronizados con el estado actual (SVG desde assets)
  /* Antiguo, quitar cuando todo vaya bien
  
  get toolbarButtons(): ToolbarButtonConfig[] {
    return [
      {
        iconSrc: 'assets/icons/icon-add.svg',
        label: `Nuevo ${this.entity}`,
        color: 'main',
        action: () => this.onNew(),
        disabled: false
      },
      {
        iconSrc: 'assets/icons/icon-edit.svg',
        label: 'Editar',
        color: 'edit',
        action: () => this.onEdit(),
        disabled: !(this.selection.selected.length === 1)
      },
      {
        iconSrc: 'assets/icons/icon-delete.svg',
        label: 'Borrar',
        color: 'danger',
        action: () => this.onDeleteSelected(),
        disabled: !this.selection.selected.length
      }
    ];
  }
*/

get toolbarButtons(): ToolbarButtonConfig[] {
  return [
    {
      // iconSrc: 'assets/icons/icon-add.svg',
      icon: 'icon-user', // <--- campo obligatorio
      iconType: 'system',    // <- explícitamente por coherencia
      iconSize: 's',         // <-- puedes poner 's' (20px)
      label: `Nuevo ${this.entity}`,
      color: 'main',
      action: () => this.onNew(),
      disabled: false
    },
    {
      // iconSrc: 'assets/icons/icon-edit.svg',
      icon: 'icon-edit', // <--- campo obligatorio
      label: 'Editar',
      color: 'edit',
      action: () => this.onEdit(),
      disabled: !(this.selection.selected.length === 1)
    },
    {
      // iconSrc: 'assets/icons/icon-delete.svg',
      icon: 'icon-delete', // <--- campo obligatorio
      label: 'Borrar',
      color: 'danger',
      action: () => this.onDeleteSelected(),
      disabled: !this.selection.selected.length
    }
  ];
}


  constructor(
    private countriesService: CountriesService,
    private fb: FormBuilder
  ) {}

  //-----------------------------------------------
  // FLUJO PRINCIPAL: INICIALIZACIÓN Y CARGA
  //-----------------------------------------------
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
    // Lógica de paginación, filtros, etc.
    this.countriesService.getCountries({
      search: this.searchTerm,
      page: this.page,
      pageSize: this.pageSize,
      sortKey: this.sortKey ?? undefined,
      sortOrder: this.sortOrder
    }).subscribe((result: { data: Country[]; total: number }) => {
      this.countries = result.data;
      this.totalCountries = result.total;
      // Selección sincronizada con la página actual
      this.selection.selected = this.selection.selected.filter(sel =>
        this.countries.some(c => c.id === sel.id)
      );
    });
  }

  //-----------------------------------------------
  // HANDLERS DE BUSQUEDA, PAGINACIÓN Y ORDEN
  //-----------------------------------------------
  onValueChange(term: string): void {
    this.searchTerm = term;
    this.page = 1;
    this.fetchCountries();
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.fetchCountries();
  }

  onSortChange(key: string) {
  if (this.sortKey === key) {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortKey = key;
    this.sortOrder = 'asc';
  }
  this.fetchCountries();
}

  //-----------------------------------------------
  // TABLA Y SELECCIÓN AVANZADA
  //-----------------------------------------------
  onSelectionChange(selectedRows: Country[]): void {
    this.selection.selected = [...selectedRows];
  }

  isSelected(row: Country): boolean {
    return this.selection.selected.some(item => item.id === row.id);
  }

  // Selección tipo Excel/múltiple CTRL/SHIFT
  onRowClick(row: Country, event: MouseEvent): void {
    if (event.ctrlKey || event.metaKey) {
      if (this.isSelected(row)) {
        this.selection.selected = this.selection.selected.filter(item => item.id !== row.id);
      } else {
        this.selection.selected = [...this.selection.selected, row];
      }
    } else if (event.shiftKey) {
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

  //-----------------------------------------------
  // TOGGLES DE CHECKBOX, CABECERA, FILA
  //-----------------------------------------------
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

  onGeneralToggle(newState: 'checked' | 'unchecked' | 'indeterminate'): void {
    if (newState === 'checked') {
      this.selection.selected = [...this.countries];
    } else {
      this.selection.selected = [];
    }
  }

  onRowToggle(row: Country, newState: 'checked' | 'unchecked' | 'indeterminate'): void {
    if (newState === 'checked') {
      if (!this.isSelected(row)) {
        this.selection.selected = [...this.selection.selected, row];
      }
    } else {
      this.selection.selected = this.selection.selected.filter(item => item.id !== row.id);
    }
  }

  //-----------------------------------------------
  // GETTERS PARA ESTADO DE LOS BOTONES Y ESTILOS
  //-----------------------------------------------
  get allVisibleSelected() {
    return this.selection.selected.length === this.countries.length && this.countries.length > 0;
  }
  get someVisibleSelected() {
    return this.selection.selected.length > 0 && this.selection.selected.length < this.countries.length;
  }
  get anySelected() {
    return this.selection.selected.length > 0;
  }

  //-----------------------------------------------
  // CRUD Y MODALES DE PAÍS
  //-----------------------------------------------
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

  //-----------------------------------------------
  // PAGINACIÓN AUXILIAR
  //-----------------------------------------------
  get totalPages(): number {
    return Math.ceil(this.totalCountries / this.pageSize) || 1;
  }
  
}





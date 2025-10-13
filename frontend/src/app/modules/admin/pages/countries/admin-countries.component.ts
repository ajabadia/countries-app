import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Importamos HttpErrorResponse para tipar el error correctamente (soluciona TS7006)
import { HttpErrorResponse } from '@angular/common/http'; 
import { Country } from 'src/app/modules/shared/models/country.model';
import { CountriesService } from 'src/app/services/countries.service';
import { COUNTRY_TABLE_COLUMNS } from './country-table.columns'; 

@Component({
  selector: 'app-admin-countries',
  templateUrl: './admin-countries.component.html',
  styleUrls: ['./admin-countries.component.scss']
})
export class AdminCountriesComponent implements OnInit {
  // --- Estado principal y configuración de tabla ---
  countries: Country[] = [];              // Array visible en la tabla
  selectedCountries: Country[] = [];      // Array de países seleccionados
  // Asignamos las columnas exportadas
  columns: any[] = COUNTRY_TABLE_COLUMNS;                    
  page = 1;                               // Página actual
  pageSize = 10;                          // Tamaño de página
  totalCountries = 0;                     // Total de países (para el paginador)
  totalPages: number = 1;                 // Total de páginas (calculado)
  sortKey: string | null = null;          // Clave de ordenación
  sortOrder: 'asc' | 'desc' = 'asc';      // Sentido de orden
  searchTerm = '';                        // Buscador actual
  
  // Configuración de botones (Ejemplo: Añadir, Borrar)
  toolbarButtons: any[] = []; 

  // --- Modal y formulario reactivo ---
  // ✅ CORREGIDO: Uso de '!' para inicialización diferida en ngOnInit (Soluciona TS2564)
  countryForm!: FormGroup;                 
  showEditModal = false;                  
  editMode = false;                       
  pais: Country | null = null;            
  errorMsg = '';                          
  showConfirmDelete = false;              

  constructor(private countriesService: CountriesService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.fetchCountries();
    this.initializeToolbarButtons();
  }

  /** Inicializa los botones de la toolbar (Nuevo, Eliminar Múltiple) */
  private initializeToolbarButtons(): void {
    this.toolbarButtons = [
      { 
        icon: 'icon-add', 
        label: 'Nuevo País', 
        color: 'main', 
        action: () => this.openCreateModal(),
        disabled: false
      },
      { 
        icon: 'icon-delete', 
        label: 'Eliminar Seleccionados', 
        color: 'danger', 
        action: () => this.openBulkDeleteModal(),
        // Se deshabilita si no hay países seleccionados
        disabled: this.selectedCountries.length === 0 
      }
    ];
  }


  /** Inicializa el formulario reactivo, con o sin datos de un país para edición */
  private initForm(country?: Country) {
    this.countryForm = this.fb.group({
      id: [country ? country.id : null],
      alpha2may: [country ? country.alpha2may : '', [Validators.required, Validators.maxLength(2)]],
      alpha3may: [country ? country.alpha3may : '', [Validators.required, Validators.maxLength(3)]],
      numeric: [country ? country.numeric : '', [Validators.required, Validators.maxLength(3)]],
      defaultname: [country ? country.defaultname : '', Validators.required]
    });
  }

  /** Carga los países desde el servicio, aplicando filtros y paginación */
  fetchCountries() {
    this.countriesService.getCountries({
      page: this.page,
      pageSize: this.pageSize,
      search: this.searchTerm,
      sortKey: this.sortKey || undefined,
      sortOrder: this.sortOrder
    }).subscribe({
      next: (res) => {
        this.countries = res.data;
        this.totalCountries = res.total;
        this.totalPages = Math.ceil(this.totalCountries / this.pageSize);
        // Actualizar el estado de los botones tras recarga
        this.initializeToolbarButtons();
      },
      error: (err: HttpErrorResponse) => { 
        this.errorMsg = err.error?.message || 'Error al cargar países.'; 
      }
    });
  }

  /** Handler: guardar país (crear o actualizar) */
  saveCountry() {
    if (this.countryForm.invalid) return;
    const country: Country = this.countryForm.value;
    
    // ✅ CORREGIDO: Uso de `update` y `create` (Soluciona TS2339)
    const save$ = this.editMode
      ? this.countriesService.update(country) 
      : this.countriesService.create(country); 

    save$.subscribe({
      next: () => {
        this.showEditModal = false;
        this.fetchCountries();  
      },
      // ✅ CORREGIDO: Tipado de error explícito (Soluciona TS7006)
      error: (err: HttpErrorResponse) => { 
        this.errorMsg = err.error?.message || 'Error al guardar'; 
      }
    });
  }

  /** Cierra el modal de edición/creación */
  closeCountryModal() {
    this.showEditModal = false; 
    this.editMode = false;
    this.errorMsg = ''; 
    this.countryForm.reset();
  }

  /** Lanza la acción de borrado tras la confirmación */
  eliminarPais() {
    if (this.pais) {
      // ✅ CORREGIDO: Uso de 'delete' y conversión a string (Soluciona TS2345)
      this.countriesService.delete(this.pais.id.toString()).subscribe({
        next: () => {
          this.fetchCountries();
          this.showConfirmDelete = false;
          this.pais = null;
        },
        error: (err: HttpErrorResponse) => { this.errorMsg = err.error?.message || 'Error al eliminar'; }
      });
    }
  }

  // --- Handlers de Interacción ---

  cancelarEliminar(){ this.showConfirmDelete = false; }
  onRowClick(country: Country) { console.log('Row clicked:', country); }
  
  onSelectionChange(selected: Country[]) { 
    this.selectedCountries = selected; 
    // Asegura que los botones de la toolbar se actualicen inmediatamente
    this.initializeToolbarButtons();
  }
  
  onSortChange(sortEvent: { key: string, order: 'asc' | 'desc' }) { 
    this.sortKey = sortEvent.key;
    this.sortOrder = sortEvent.order;
    this.fetchCountries();
  }
  
  onValueChange(searchTerm: string) { this.searchTerm = searchTerm; this.page = 1; this.fetchCountries(); }
  onPageChange(newPage: number) { this.page = newPage; this.fetchCountries(); }
  onPageSizeChange(newSize: number) { this.pageSize = newSize; this.page = 1; this.fetchCountries(); }
  
  /** Abre el modal para crear un nuevo país */
  openCreateModal() {
    this.editMode = false;
    this.pais = null;
    this.initForm(); 
    this.showEditModal = true;
  }

  /** Abre el modal para editar un país */
  openEditModal(country: Country) {
    this.editMode = true;
    this.pais = country;
    this.initForm(country); 
    this.showEditModal = true;
  }
  
  /** Abre el modal de confirmación para borrar el país actualmente seleccionado */
  openDeleteModal(country: Country) {
    this.pais = country;
    this.showConfirmDelete = true;
  }

  /** Abre el modal para borrado múltiple (Si es necesario) */
  openBulkDeleteModal() {
    // Implementar si tienes un diálogo de borrado múltiple
    console.log('Borrado múltiple de:', this.selectedCountries);
  }
}
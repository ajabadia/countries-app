import { Component, OnInit, OnDestroy } from '@angular/core'; // Importamos OnDestroy
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs'; // Importamos Subject y takeUntil
import { takeUntil } from 'rxjs/operators';
import { Country } from 'src/app/modules/shared/models/country.model';
import { CountriesService } from 'src/app/services/countries.service';
import { COUNTRY_TABLE_COLUMNS } from './country-table.columns';

@Component({
    selector: 'app-admin-countries',
    templateUrl: './admin-countries.component.html',
    styleUrls: ['./admin-countries.component.scss'],
    standalone: false
})
export class AdminCountriesComponent implements OnInit, OnDestroy { // Implementamos OnDestroy
  
  // Propiedad para gestionar la desuscripción automática
  private destroy$ = new Subject<void>();

  // --- El resto de tus propiedades se mantienen igual ---
  countries: Country[] = [];
  selectedCountries: Country[] = [];
  columns: any[] = COUNTRY_TABLE_COLUMNS;
  page = 1;
  pageSize = 10;
  totalCountries = 0;
  totalPages: number = 1;
  sortKey: string | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';
  searchTerm = '';
  toolbarButtons: any[] = [];
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

  // Este método se ejecuta cuando el componente se destruye
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

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
        disabled: this.selectedCountries.length === 0 
      }
    ];
  }

  private initForm(country?: Country) {
    this.countryForm = this.fb.group({
      id: [country ? country.id : null],
      alpha2may: [country ? country.alpha2may : '', [Validators.required, Validators.maxLength(2)]],
      alpha3may: [country ? country.alpha3may : '', [Validators.required, Validators.maxLength(3)]],
      numeric: [country ? country.numeric : '', [Validators.required, Validators.maxLength(3)]],
      defaultname: [country ? country.defaultname : '', Validators.required]
    });
  }

  fetchCountries() {
    this.countriesService.getCountries({
      page: this.page,
      pageSize: this.pageSize,
      search: this.searchTerm,
      sortKey: this.sortKey || undefined,
      sortOrder: this.sortOrder
    })
    .pipe(takeUntil(this.destroy$)) // ✅ Añadimos el pipe takeUntil
    .subscribe({
      next: (res) => {
        this.countries = res.data;
        this.totalCountries = res.total;
        this.totalPages = Math.ceil(this.totalCountries / this.pageSize);
      },
      error: (err: HttpErrorResponse) => { 
        this.errorMsg = err.error?.message || 'Error al cargar países.'; 
      }
    });
  }

  saveCountry() {
    if (this.countryForm.invalid) return;
    const country: Country = this.countryForm.value;
    
    const save$ = this.editMode
      ? this.countriesService.update(country) 
      : this.countriesService.create(country); 

    save$
    .pipe(takeUntil(this.destroy$)) // ✅ Añadimos el pipe takeUntil
    .subscribe({
      next: () => {
        this.showEditModal = false;
        this.fetchCountries();  
      },
      error: (err: HttpErrorResponse) => { 
        this.errorMsg = err.error?.message || 'Error al guardar'; 
      }
    });
  }

  eliminarPais() {
    if (this.pais) {
      this.countriesService.delete(this.pais.id.toString())
      .pipe(takeUntil(this.destroy$)) // ✅ Añadimos el pipe takeUntil
      .subscribe({
        next: () => {
          this.fetchCountries();
          this.showConfirmDelete = false;
          this.pais = null;
        },
        error: (err: HttpErrorResponse) => { this.errorMsg = err.error?.message || 'Error al eliminar'; }
      });
    }
  }

  // --- El resto de tus métodos no necesitan cambios ---
  closeCountryModal() { this.showEditModal = false; this.editMode = false; this.errorMsg = ''; this.countryForm.reset(); }
  cancelarEliminar(){ this.showConfirmDelete = false; }
  onRowClick(country: Country) { console.log('Row clicked:', country); }
  
  onSelectionChange(selected: Country[]) { 
    this.selectedCountries = selected; 
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
  
  openCreateModal() { this.editMode = false; this.pais = null; this.initForm(); this.showEditModal = true; }
  openEditModal(country: Country) { this.editMode = true; this.pais = country; this.initForm(country); this.showEditModal = true; }
  openDeleteModal(country: Country) { this.pais = country; this.showConfirmDelete = true; }
  openBulkDeleteModal() { console.log('Borrado múltiple de:', this.selectedCountries); }
}
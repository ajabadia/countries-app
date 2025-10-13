import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Country } from 'src/app/modules/shared/models/country.model';

// Componente principal para mostrar la tabla de países como elemento hijo.
// Sólo gestiona datos, selección, edición y ordenación, sin toolbar ni paginador.

@Component({
  selector: 'app-html-country-table',
  templateUrl: './html-country-table.component.html',
  styleUrls: ['./html-country-table.component.scss']
})
export class HtmlCountryTableComponent {
  // --- Entradas ---

  // Array de países a mostrar en la tabla
  @Input() countries: Country[] = [];

  // Array de países seleccionados (checkbox), gestionado por el padre
  @Input() selectedCountries: Country[] = [];

  // Estructura de columnas (clave, título, si es ordenable)
@Input() columns: { field: string; header: string; sortable?: boolean }[] = [];

  // Clave y orden actuales para ordenación
  @Input() sortKey: string = 'name';
  @Input() sortOrder: 'asc' | 'desc' = 'asc';

  // --- Salidas (eventos para el padre) ---

  // Click en fila
  @Output() rowClick = new EventEmitter<Country>();


  // Cambio de selección (checkbox en fila o selección global)
  @Output() selectionChange = new EventEmitter<Country[]>();

  // Cambio de ordenación (columna y dirección)
  @Output() sortChange = new EventEmitter<{ key: string; order: 'asc' | 'desc' }>();

  // Selección individual de país
@Output() selectCountry = new EventEmitter<{ country: Country; selected: boolean }>();

  // Click en editar país
  @Output() editCountry = new EventEmitter<Country>();

  // --- Métodos útiles para la plantilla ---

  // Devuelve true si el país está seleccionado (checkbox), busca por ID
  isSelected(country: Country): boolean {
    return !!this.selectedCountries?.find(c => c.id === country.id);
  }

  // Handler para el checkbox individual de cada país
  onToggleSelect(country: Country, event: Event): void {
    const checked = !!((event?.target as HTMLInputElement).checked);
    this.selectCountry.emit({ country, selected: checked });
    this.selectionChange.emit(this.selectedCountries);
  }

  // Handler para el checkbox global "seleccionar todos"
  toggleAll(event: Event): void {
    const checked = !!((event?.target as HTMLInputElement).checked);
    this.countries.forEach(country => {
      this.selectCountry.emit({ country, selected: checked });
    });
    this.selectionChange.emit(this.selectedCountries);
  }

  // Devuelve true si todos los países del array están seleccionados
  allSelected(): boolean {
    return (
      this.countries.length > 0 &&
      this.selectedCountries.length === this.countries.length
    );
  }

  // Devuelve el valor para una celda concreta, de forma genérica según campo
  getColValue(country: Country, field: string) {
    return country[field];
  }

  // Handler para botón editar
  onEdit(country: Country): void {
    this.editCountry.emit(country);  // Notifica al padre
    this.rowClick.emit(country);     // Opcional: también como click en la fila
  }

  // Handler para click en la fila completa
  onRowClick(country: Country): void {
    this.rowClick.emit(country);
  }

  // Handler para cambio de ordenación: emite columna y orden nuevos
  onSortChange(key: string, order: 'asc' | 'desc'): void {
    this.sortChange.emit({ key, order });
  }
}

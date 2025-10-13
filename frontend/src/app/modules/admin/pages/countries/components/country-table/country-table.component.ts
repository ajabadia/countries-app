import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Country } from 'src/app/modules/shared/models/country.model';

/**
 * Componente padre que gestiona datos, filtros y acciones,
 * delegando la tabla internamente a un hijo (html-country-table),
 * y gestionando aquí sólo la lógica externa (paginación, barra, etc.)
 */

@Component({
  selector: 'app-country-table',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.scss']
})
export class CountryTableComponent {
  // ==== ESTADO PRINCIPAL DE LA TABLA (se pasa desde admin) ====
  @Input() countries: Country[] = [];
  @Input() selectedCountries: Country[] = [];
  @Input() columns: any[] = [];
  @Input() sortKey: string = '';
  @Input() sortOrder: 'asc' | 'desc' = 'asc';
    // Paginación (añade estos)
  page: number = 1;
  perPage: number = 25;
  totalPages: number = 1;
  totalItems: number = 0; // Calcula según countries o toda la fuente de datos

  // ==== EVENTOS REENVIADOS HACIA ARRIBA ====
  @Output() rowClick = new EventEmitter<Country>();
  @Output() selectionChange = new EventEmitter<Country[]>();
  @Output() sortChange = new EventEmitter<{ key: string, order: 'asc' | 'desc' }>();
  @Output() selectCountry = new EventEmitter<{ country: Country, selected: boolean }>();
  @Output() editCountry = new EventEmitter<Country>();




  /** Handler: click en fila */
  onRowClick(country: Country) { this.rowClick.emit(country); }

  /** Handler: cambio en selección múltiple */
  onSelectionChange(selected: Country[]) { this.selectionChange.emit(selected); }

  /** Handler: cambio en ordenación */
  onSortChange(e: { key: string, order: 'asc' | 'desc' }) { this.sortChange.emit(e); }

  /** Handler: selección individual */
  onSelectCountry(e: { country: Country, selected: boolean }) { this.selectCountry.emit(e); }

  /** Handler: edición de país */
  onEditCountry(country: Country) { this.editCountry.emit(country); }

  
  onPageChange(newPage: number) {
  this.page = newPage;
  // Si necesitas emitir a un padre o recargar, llama al método adecuado aquí
}
onPageSizeChange(newSize: number) {
  this.perPage = newSize;
  this.page = 1;
  // Igual, recarga/actualiza si usas datos desde servidor o filtrado fuera
}


}

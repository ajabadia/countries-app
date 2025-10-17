// src/app/modules/admin/pages/countries/components/country-table/country-table.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Country } from 'src/app/modules/shared/models/country.model';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { HtmlCountryTableComponent } from './html-country-table/html-country-table.component';

@Component({
  selector: 'app-country-table',
  standalone: true,
  imports: [ CommonModule, SharedModule, HtmlCountryTableComponent ],
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.scss']
})
export class CountryTableComponent {
  @Input() countries: Country[] = [];
  @Input() selectedCountries: Country[] = [];
  @Input() columns: any[] = [];
  @Input() sortKey: string = '';
  @Input() sortOrder: 'asc' | 'desc' = 'asc';
  // Propiedades de paginación
  @Input() page: number = 1;
  @Input() totalPages: number = 1;
  @Input() pageSize: number = 10;
  @Input() totalItems: number = 0;

  @Output() rowClick = new EventEmitter<Country>();
  @Output() selectionChange = new EventEmitter<Country[]>();
  @Output() sortChange = new EventEmitter<{ key: string, order: 'asc' | 'desc' }>();
  @Output() editCountry = new EventEmitter<Country>();
  @Output() deleteCountry = new EventEmitter<Country>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  // Handlers que re-emiten los eventos
  onRowClick(c: Country) { this.rowClick.emit(c); }
  onSelectionChange(s: Country[]) { this.selectionChange.emit(s); }
  onSortChange(e: { key: string, order: 'asc' | 'desc' }) { this.sortChange.emit(e); }
  onEditCountry(c: Country) { this.editCountry.emit(c); }
  onDeleteCountry(c: Country) { this.deleteCountry.emit(c); }
  onPageChange(p: number) { this.pageChange.emit(p); }
  onPageSizeChange(ps: number) { this.pageSizeChange.emit(ps); }
}
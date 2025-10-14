// src/app/modules/admin/pages/countries/components/country-table/html-country-table/html-country-table.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Country } from 'src/app/modules/shared/models/country.model';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@Component({
  selector: 'app-html-country-table',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './html-country-table.component.html',
  styleUrls: ['./html-country-table.component.scss']
})
export class HtmlCountryTableComponent {
  @Input() countries: Country[] = [];
  @Input() selectedCountries: Country[] = [];
  @Input() columns: { field: string; header: string; sortable?: boolean }[] = [];
  @Input() sortKey: string = 'name';
  @Input() sortOrder: 'asc' | 'desc' = 'asc';

  @Output() rowClick = new EventEmitter<Country>();
  @Output() selectionChange = new EventEmitter<Country[]>();
  @Output() sortChange = new EventEmitter<{ key: string; order: 'asc' | 'desc' }>();
  @Output() editCountry = new EventEmitter<Country>();
  @Output() deleteCountry = new EventEmitter<Country>();
  // ¡RESTAURADO! Este evento es necesario
  @Output() selectCountry = new EventEmitter<{ country: Country, selected: boolean }>();

  // --- Lógica Restaurada ---
  onToggleSelect(country: Country, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.selectCountry.emit({ country, selected: checked });
  }

  toggleAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    const newSelection = checked ? [...this.countries] : [];
    this.selectionChange.emit(newSelection);
  }

  isSelected(country: Country): boolean {
    return this.selectedCountries.some(c => c.id === country.id);
  }

  allSelected(): boolean {
    return this.countries.length > 0 && this.selectedCountries.length === this.countries.length;
  }
  
  getColValue(item: any, field: string): any {
    return field.split('.').reduce((o, i) => o?.[i], item);
  }
  
  onSort(key: string) {
    const order = (this.sortKey === key && this.sortOrder === 'asc') ? 'desc' : 'asc';
    this.sortChange.emit({ key, order });
  }

  onEdit(country: Country): void { this.editCountry.emit(country); }
  onDelete(country: Country): void { this.deleteCountry.emit(country); }
  onRowClick(country: Country): void { this.rowClick.emit(country); }
}
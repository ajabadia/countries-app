// src/app/modules/admin/pages/countries/components/country-table/html-country-table/html-country-table.component.ts

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Country } from 'src/app/modules/shared/models/country.model';
import { CommonModule } from '@angular/common';
import { TableComponent, SortChangeEvent, ActionEvent } from 'src/app/modules/shared/components/table/table.component';
import { TableColumn } from 'src/app/services/table-column.model';
import { SelectionService } from 'src/app/services/selection.service';

@Component({
  selector: 'app-html-country-table',
  standalone: true,
  imports: [CommonModule, TableComponent],
  template: `
    <app-table
      [items]="countries"
      [columns]="tableColumns"
      [selection]="selection"
      [sortKey]="sort.key"
      [sortOrder]="sort.direction"
      (sortChange)="sortChange.emit($event)"
      (action)="action.emit($event)"
    ></app-table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HtmlCountryTableComponent {
  @Input() countries: Country[] = [];
  @Input() tableColumns: TableColumn[] = [];
  @Input() selection?: SelectionService<Country>;
  @Input() sort: SortChangeEvent = { key: 'defaultname', direction: 'asc' };

  @Output() sortChange = new EventEmitter<SortChangeEvent>();
  @Output() action = new EventEmitter<ActionEvent>();
}
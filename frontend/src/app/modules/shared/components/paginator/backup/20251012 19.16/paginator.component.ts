import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  @Input() page: number = 1;
  @Input() totalPages: number = 1;
  @Input() totalCountries: number = 0;
  @Input() pageSize: number = 10;
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  pageSizeOptions = [10, 25, 50, 100];
  gotoPage: number = 1;

  get startIdx(): number {
    return ((this.page - 1) * this.pageSize) + 1;
  }
  get endIdx(): number {
    return Math.min(this.page * this.pageSize, this.totalCountries);
  }

  setPage(newPage: number) {
    if (newPage < 1) newPage = 1;
    if (newPage > this.totalPages) newPage = this.totalPages;
    if (this.page !== newPage) {
      this.page = newPage;
      this.pageChange.emit(this.page);
    }
    this.gotoPage = newPage;
  }

  onPageSizeChange(event: Event) {
    const newSize = Number((event.target as HTMLSelectElement).value);
    this.pageSizeChange.emit(newSize); // Solo emite el valor nuevo
    this.page = 1;
    this.pageChange.emit(this.page);
  }
}

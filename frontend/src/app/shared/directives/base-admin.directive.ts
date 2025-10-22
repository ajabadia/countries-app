// File: d:\desarrollos\countries2\frontend\src\app\shared\directives\base-admin.directive.ts | Last Modified: 2025-10-22

import {
  Directive,
  OnInit,
  OnDestroy,
  inject,
  signal,
  input,
  Injector,
} from '@angular/core';
import { HttpParams } from '@angular/common/http';
import {
  of,
  combineLatest,
  Subscription,
} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  tap,
  catchError,
  map,
  switchMap,
} from 'rxjs/operators';
import { toObservable } from '@angular/core/rxjs-interop';

import { BaseCrudService } from '@shared/services/base-crud.service';
import { SelectionService } from '@shared/services/selection.service';
import { Sort } from '@shared/types/sort.type';
import { PaginatorChangeEvent } from '@shared/components/ui-paginator/ui-paginator.types';
import { PagedResponse } from '@app/shared/types/paged-response.interface';

@Directive({
  selector: '[appBaseAdmin]',
  standalone: true,
})
export class BaseAdminDirective<T extends { id: number | string }> implements OnInit, OnDestroy {
  // --- Dependencias ---
  private readonly injector = inject(Injector);

  // --- Inputs ---
  service = input.required<BaseCrudService<T>>({ alias: 'appBaseAdminService' });
  searchableFields = input<(keyof T)[]>([], { alias: 'appBaseAdminSearchableFields' });

  // --- Estado Interno Reactivo (Signals) ---
  page = signal(1);
  pageSize = signal(10);
  searchTerm = signal('');
  sort = signal<Sort<T>>({ orderBy: 'id' as keyof T, orderDir: 'asc' });
  refreshTrigger = signal(0);

  // --- Signals Públicos Derivados ---
  data = signal<T[]>([]);
  totalRecords = signal(0);
  isLoading = signal(true);
  selectionService!: SelectionService<T>;

  private dataSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.selectionService = new SelectionService<T>();
    this.initializeDataStream();
  }

  private initializeDataStream(): void {
    // Creamos un observable para cada signal de estado. Usamos el injector.
    const sources$ = {
      page: toObservable(this.page, { injector: this.injector }),
      pageSize: toObservable(this.pageSize, { injector: this.injector }),
      searchTerm: toObservable(this.searchTerm, { injector: this.injector }),
      sort: toObservable(this.sort, { injector: this.injector }),
      refresh: toObservable(this.refreshTrigger, { injector: this.injector }),
    };

    this.dataSubscription = combineLatest([
      sources$.page,
      sources$.pageSize,
      sources$.searchTerm.pipe(debounceTime(300), distinctUntilChanged()),
      sources$.sort,
      sources$.refresh,
    ]).pipe(
      tap(() => this.isLoading.set(true)),
      switchMap(([page, pageSize, search, sort, _refresh]) => {
        const service = this.service(); // Accedemos al servicio aquí, de forma segura.

        const searchable = this.searchableFields();
        let params = new HttpParams().set('page', page.toString()).set('pageSize', pageSize.toString());

        if (search && searchable.length > 0) {
          params = params.set('search', search);
          searchable.forEach(field => { params = params.append('searchFields', field as string); });
        }

        if (sort) {
          params = params.set('orderBy', sort.orderBy as string).set('orderDir', sort.orderDir);
        }

        return service.getAll(params).pipe(
          catchError(err => {
            console.error('Error fetching data:', err);
            return of({
              data: [],
              total: 0,
              page: 1,
              pageSize: 10,
              totalPages: 0,
              hasNextPage: false,
              hasPrevPage: false,
            } as PagedResponse<T>);
          })
        );
      }),
    ).subscribe(response => {
      this.data.set(response.data);
      this.totalRecords.set(response.total);
      this.isLoading.set(false);
      this.selectionService.clear(); // Limpiamos la selección en cada nueva carga de datos.
    });
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }

  public onPageStateChange(event: PaginatorChangeEvent): void {
    this.page.set(event.page);
    this.pageSize.set(event.pageSize);
  }

  onSortChange(sort: Sort<T>): void { this.sort.set(sort); }

  onSearch(searchTerm: string): void {
    this.searchTerm.set(searchTerm);
    this.page.set(1);
    this.selectionService.clear();
  }

  refreshData(): void { this.refreshTrigger.update(v => v + 1); }
}
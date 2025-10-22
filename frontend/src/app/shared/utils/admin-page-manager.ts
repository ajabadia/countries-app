// File: d:\desarrollos\countries2\frontend\src\app\shared\utils\admin-page-manager.ts | New File

import { Injectable, Injector, OnDestroy, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { HttpParams } from '@angular/common/http';
import { Subscription, combineLatest, of } from 'rxjs';
import { switchMap, catchError, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { BaseCrudService } from '@shared/services/base-crud.service';
import { PagedResponse } from '@shared/types/paged-response.interface';
import { PaginatorChangeEvent } from '@shared/components/ui-paginator/ui-paginator.types';
import { Sort } from '@shared/types/sort.type';

/**
 * Configuración para inicializar el AdminPageManager.
 */
export interface AdminPageManagerConfig<T> {
  service: BaseCrudService<T>;
  injector: Injector;
  searchableFields?: (keyof T)[];
}

/**
 * Clase "Headless" que encapsula toda la lógica para gestionar una página de administración.
 * Se encarga de la paginación, búsqueda, ordenación y obtención de datos.
 */
@Injectable()
export class AdminPageManager<T extends { id: number | string }> implements OnDestroy {
  // --- Estado Interno Reactivo (Signals) ---
  page = signal(1);
  pageSize = signal(10);
  searchTerm = signal('');
  sort = signal<Sort<T>>({ orderBy: 'id' as keyof T, orderDir: 'asc' });

  // --- Signals Públicos Derivados ---
  data = signal<T[]>([]);
  totalRecords = signal(0);
  isLoading = signal(true);

  private dataSubscription?: Subscription;
  private config?: AdminPageManagerConfig<T>;

  /**
   * Initializes the manager with the required configuration and starts the data stream.
   * This must be called after the class is instantiated.
   */
  init(config: AdminPageManagerConfig<T>): void {
    this.config = config;

    // Creamos un observable para cada signal de estado.
    const sources$ = {
      page: toObservable(this.page, { injector: this.config.injector }),
      pageSize: toObservable(this.pageSize, { injector: this.config.injector }),
      searchTerm: toObservable(this.searchTerm, { injector: this.config.injector }).pipe(
        debounceTime(300),
        distinctUntilChanged()
      ),
      sort: toObservable(this.sort, { injector: this.config.injector }),
    };

    this.dataSubscription = combineLatest([
      sources$.page,
      sources$.pageSize,
      sources$.searchTerm,
      sources$.sort,
    ]).pipe(
      tap(() => this.isLoading.set(true)),
      switchMap(([page, pageSize, search, sort]) => {
        // Guarda de seguridad: si la configuración no está lista, no hacemos nada.
        if (!this.config) {
          return of({
            data: [],
            total: 0,
            page: 1,
            pageSize: 10,
            totalPages: 0,
            hasNextPage: false,
            hasPrevPage: false,
          } as PagedResponse<T>);
        }
        let params = new HttpParams()
          .set('page', page.toString())
          .set('pageSize', pageSize.toString())
          .set('orderBy', sort.orderBy as string)
          .set('orderDir', sort.orderDir);

        if (search && this.config.searchableFields) {
          params = params.set('search', search);
          this.config.searchableFields.forEach(field => {
            params = params.append('searchFields', field as string);
          });
        }

        return this.config.service.getAll(params).pipe(
          catchError(() => of({
            data: [],
            total: 0,
            page: 1,
            pageSize: 10,
            totalPages: 0,
            hasNextPage: false,
            hasPrevPage: false,
          } as PagedResponse<T>))
        );
      })
    ).subscribe(response => {
      this.data.set(response.data);
      this.totalRecords.set(response.total);
      this.isLoading.set(false);
    });
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }

  // --- Métodos Públicos para la UI ---

  onSortChange(newSort: Sort<T>): void { this.sort.set(newSort); }

  onSearch(newSearchTerm: string): void {
    this.page.set(1);
    this.searchTerm.set(newSearchTerm);
  }

  onPageStateChange(event: PaginatorChangeEvent): void {
    this.page.set(event.page);
    this.pageSize.set(event.pageSize);
  }
}
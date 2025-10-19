// File: d:\desarrollos\countries2\frontend\src\app\shared\directives\base-admin.directive.ts | Last Modified: 2025-10-19

import {
  Directive,
  OnInit,
  OnDestroy,
  inject,
  Injector,
  runInInjectionContext,
  signal,
  computed,
  WritableSignal,
} from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  BehaviorSubject,
  Subject,
  Observable,
  Subscription,
  combineLatest,
  of,
  EMPTY,
} from 'rxjs';
import {
  switchMap,
  startWith,
  debounceTime,
  distinctUntilChanged,
  tap,
  catchError,
  finalize,
} from 'rxjs/operators';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';

import { BaseCrudService } from '@shared/services/base-crud.service';
import { SelectionService } from '@shared/services/selection.service';
import { ActionService } from '@core/services/action.service';
import { ToolbarButtonConfig } from '@shared/components/ui-toolbar-buttons/ui-toolbar-buttons.component';
import { Sort } from '@shared/types/sort.type';
import { PagedResponse } from '@shared/types/paged-response.interface';

@Directive({
  selector: '[appBaseAdmin]',
  standalone: true,
})
export abstract class BaseAdminDirective<T extends { id: number | string }> implements OnInit, OnDestroy {
  // --- Dependencias ---
  protected fb = inject(FormBuilder);
  private injector = inject(Injector);
  private actionService = inject(ActionService);

  // --- Propiedades Abstractas ---
  abstract service: BaseCrudService<T>;
  abstract form: FormGroup;

  // --- Estado de la UI ---
  private page$ = new BehaviorSubject<number>(1);
  private pageSize$ = new BehaviorSubject<number>(10);
  private search$ = new BehaviorSubject<string>('');
  private sort$ = new BehaviorSubject<Sort<T>>({ orderBy: 'id' as keyof T, orderDir: 'asc' });
  private refresh$ = new Subject<void>();

  // --- Estado Público (Signals) ---
  private pagedResponse = toSignal<PagedResponse<T>>(EMPTY as Observable<PagedResponse<T>>);
  data = computed(() => this.pagedResponse()?.data ?? []);
  totalRecords = computed(() => this.pagedResponse()?.total ?? 0);
  isLoading = signal(true);
  selectionService!: SelectionService<T>;

  // --- Gestión de Modales ---
  isModalVisible = signal(false);
  isConfirmModalVisible = signal(false);
  isSaving = signal(false);
  isDeleting = signal(false);
  editingItem: WritableSignal<T | null> = signal(null);
  itemToDelete: WritableSignal<T | null> = signal(null);
  modalButtons: ToolbarButtonConfig[] = [];

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    runInInjectionContext(this.injector, () => {
      this.selectionService = new SelectionService<T>();
    });

    const pagedResponse$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.search$.pipe(debounceTime(300), distinctUntilChanged()),
      this.sort$,
      this.refresh$.pipe(startWith(null)),
    ]).pipe(
      tap(() => this.isLoading.set(true)),
      switchMap(([page, pageSize, search, sort]) => {
        let params = new HttpParams().set('page', page.toString()).set('limit', pageSize.toString());
        if (search) params = params.set('search', search);
        params = params.set('orderBy', sort.orderBy as string).set('orderDir', sort.orderDir);

        return this.service.getAll(params).pipe(
          catchError(err => {
            console.error('Error fetching data:', err);
            return of({ data: [], total: 0, page: 1, limit: pageSize, totalPages: 0, hasNextPage: false, hasPrevPage: false });
          })
        );
      })
    );

    this.pagedResponse = toSignal(pagedResponse$, { initialValue: { data: [], total: 0, page: 1, limit: 10, totalPages: 0, hasNextPage: false, hasPrevPage: false } });

    // --- Generar Botones del Modal usando ActionService ---
    this.setupModalButtons();
  }

  private setupModalButtons(): void {
    // ✅ REFACTOR: Usar getActions y mover la lógica de transformación a la directiva.
    const modalActions = this.actionService.getActions(['admin'])
      .filter(action => action.id === 'toolbar-save' || action.id === 'toolbar-cancel');

    const actionHandlers = new Map<string, () => void>([
      ['toolbar-save', () => this.onSave()],
      ['toolbar-cancel', () => this.closeModal()],
    ]);

    this.modalButtons = modalActions
      .filter(action => actionHandlers.has(action.id))
      .map(action => ({
        id: action.id,
        label: action.label,
        icon: action.icon,
        action: actionHandlers.get(action.id)!,
      }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // --- Métodos de control de la UI ---
  onPageChange(page: number): void { this.page$.next(page); }
  onSortChange(sort: Sort<T>): void { this.sort$.next(sort); }
  onSearch(searchTerm: string): void { this.search$.next(searchTerm); this.page$.next(1); }
  refreshData(): void { this.refresh$.next(); }

  // --- Métodos para operaciones CRUD y modales ---
  openModal(item: T | null = null): void {
    this.editingItem.set(item);
    if (item) {
      this.form.patchValue(item as any);
    } else {
      this.form.reset();
    }
    this.isModalVisible.set(true);
  }

  closeModal(): void {
    this.isModalVisible.set(false);
    this.editingItem.set(null);
    this.form.reset();
  }

  openConfirmDeleteModal(item: T): void {
    this.itemToDelete.set(item);
    this.isConfirmModalVisible.set(true);
  }

  closeConfirmDeleteModal(): void {
    this.itemToDelete.set(null);
    this.isConfirmModalVisible.set(false);
  }

  onSave(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.isSaving.set(true);
    const itemData = this.form.value;
    const currentItem = this.editingItem();

    const saveOperation$: Observable<T> = currentItem
      ? this.service.update(currentItem.id, itemData)
      : this.service.create(itemData);

    this.subscription.add(
      saveOperation$.pipe(
        tap(() => {
          this.closeModal();
          this.refreshData();
        }),
        catchError(err => {
          console.error('Error saving data:', err);
          return of(null as any);
        }),
        finalize(() => this.isSaving.set(false))
      ).subscribe()
    );
  }

  onDelete(): void {
    const item = this.itemToDelete();
    if (!item) return;

    this.isDeleting.set(true);
    this.subscription.add(
      this.service.delete(item.id).pipe(
        tap(() => {
          this.closeConfirmDeleteModal();
          this.refreshData();
          this.selectionService.clear();
        }),
        catchError(err => {
          console.error('Error deleting data:', err);
          return of(null as any);
        }),
        finalize(() => this.isDeleting.set(false))
      ).subscribe()
    );
  }
}
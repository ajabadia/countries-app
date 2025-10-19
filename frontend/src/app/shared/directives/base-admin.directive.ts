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
import { toSignal } from '@angular/core/rxjs-interop';

import { BaseCrudService } from '@shared/services/base-crud.service';
import { SelectionService } from '@shared/services/selection.service';
import { Sort } from '@shared/types/sort.type';
import { PagedResponse } from '@shared/types/paged-response.interface';

/**
 * Directiva base abstracta para gestionar la lógica común de las páginas de administración (CRUD).
 * Proporciona gestión de estado para paginación, búsqueda, ordenación, selección y operaciones CRUD.
 *
 * @template T El tipo de la entidad que se gestiona.
 */
@Directive({
  selector: '[appBaseAdmin]',
  standalone: true,
})
export abstract class BaseAdminDirective<T extends { id: number }>
  implements OnInit, OnDestroy
{
  // --- Dependencias ---
  protected fb = inject(FormBuilder);
  private injector = inject(Injector);

  // --- Propiedades Abstractas (deben ser implementadas por la clase hija) ---

  /**
   * El servicio CRUD específico para la entidad.
   * Ejemplo: `service = inject(CountriesService);`
   */
  abstract service: BaseCrudService<T>;

  /**
   * El formulario para crear/editar la entidad.
   * Ejemplo: `form = this.fb.group({ name: ['', Validators.required] });`
   */
  abstract form: FormGroup;

  // --- Estado de la UI gestionado con Subjects ---
  private page$ = new BehaviorSubject<number>(1);
  private pageSize$ = new BehaviorSubject<number>(10);
  private search$ = new BehaviorSubject<string>('');
  private sort$ = new BehaviorSubject<Sort<T>>({
    orderBy: 'id' as keyof T,
    orderDir: 'asc',
  });
  private refresh$ = new Subject<void>();

  // --- Estado público y Observables ---
  private pagedResponse = toSignal<PagedResponse<T>>(EMPTY as Observable<PagedResponse<T>>);
  data = computed(() => this.pagedResponse()?.data ?? []);
  totalRecords = computed(() => this.pagedResponse()?.total ?? 0);
  isLoading = signal(true); // Se gestiona con tap
  selectionService!: SelectionService<T>; // Se inicializa en ngOnInit

  // --- Gestión de modales ---
  isModalVisible = signal(false);
  isConfirmModalVisible = signal(false);
  isSaving = signal(false);
  isDeleting = signal(false);
  editingItem: WritableSignal<T | null> = signal(null);
  itemToDelete: WritableSignal<T | null> = signal(null);

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    // Inicializamos el servicio de selección dentro del contexto de inyección del componente hijo.
    runInInjectionContext(this.injector, () => {
      this.selectionService = new SelectionService<T>();
    });

    const pagedResponse$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.search$.pipe(debounceTime(300), distinctUntilChanged()),
      this.sort$,
      this.refresh$.pipe(startWith(null)), // Para refresco manual
    ]).pipe(
      tap(() => this.isLoading.set(true)),
      switchMap(([page, pageSize, search, sort]) => {
        let params = new HttpParams()
          .set('page', page.toString())
          .set('limit', pageSize.toString()); // O 'pageSize' si tu backend lo prefiere

        if (search) {
          params = params.set('search', search);
        }
        params = params.set('orderBy', sort.orderBy as string);
        params = params.set('orderDir', sort.orderDir);

        return this.service.getAll(params).pipe(
            catchError(err => {
              console.error('Error fetching data:', err);
              // TODO: Integrar con servicio de notificaciones
              return of({ data: [], total: 0, page: 1, limit: pageSize, totalPages: 0, hasNextPage: false, hasPrevPage: false });
            })
          );
      })
    );

    // Convertimos el stream de datos en una signal
    this.pagedResponse = toSignal(pagedResponse$, { initialValue: { data: [], total: 0, page: 1, limit: 10, totalPages: 0, hasNextPage: false, hasPrevPage: false } });
  }

  // ngOnDestroy ya no es estrictamente necesario si solo gestionaba la subscripción de `combined$`
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // --- Métodos de control de la UI ---

  onPageChange(page: number): void {
    this.page$.next(page);
  }

  onSortChange(sort: Sort<T>): void {
    this.sort$.next(sort);
  }

  onSearch(searchTerm: string): void {
    this.search$.next(searchTerm);
    this.page$.next(1); // Resetear a la primera página en cada búsqueda
  }

  refreshData(): void {
    this.refresh$.next();
  }

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


  /**
   * Gestiona el guardado de un item (creación o actualización).
   * Valida el formulario y llama al servicio correspondiente.
   */
  onSave(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    this.isSaving.set(true);
    const itemData = this.form.value;
    const currentItem = this.editingItem();

    const saveOperation$: Observable<T> = currentItem
      ? this.service.update(currentItem.id, itemData)
      : this.service.create(itemData);

    this.subscription.add(
      saveOperation$
        .pipe(
          tap(() => {
            // TODO: Mostrar notificación de éxito
            this.closeModal();
            this.refreshData();
          }),
          catchError(err => {
            console.error('Error saving data:', err);
            // TODO: Mostrar notificación de error
            return of(null); // O manejar el error de otra forma
          }),
          finalize(() => this.isSaving.set(false))
        )
        .subscribe()
    );
  }

  /**
   * Gestiona el borrado de un item.
   */
  onDelete(): void {
    const item = this.itemToDelete();
    if (!item) {
      return;
    }

    this.isDeleting.set(true);

    this.subscription.add(
      this.service.delete(item.id)
        .pipe(
          tap(() => {
            // TODO: Mostrar notificación de éxito
            this.closeConfirmDeleteModal();
            this.refreshData();
            this.selectionService.clear(); // Limpiar selección si el item estaba seleccionado
          }),
          catchError(err => {
            console.error('Error deleting data:', err);
            // TODO: Mostrar notificación de error
            return of(null);
          }),
          finalize(() => this.isDeleting.set(false))
        )
        .subscribe()
    );
  }
}
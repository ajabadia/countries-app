import {
  Directive,
  OnInit,
  OnDestroy,
  inject,
  Injector,
  runInInjectionContext,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  BehaviorSubject,
  Subject,
  Observable,
  combineLatest,
  Subscription,
} from 'rxjs';
import {
  switchMap,
  startWith,
  debounceTime,
  distinctUntilChanged,
  tap,
  catchError,
  of,
} from 'rxjs/operators';

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
  data$: Observable<T[]> = of([]);
  totalRecords = signal(0);
  isLoading = signal(true);
  selectionService!: SelectionService<T>; // Se inicializa en ngOnInit

  // --- Gestión de modales ---
  isModalVisible = signal(false);
  editingItem: WritableSignal<T | null> = signal(null);

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    // Inicializamos el servicio de selección dentro del contexto de inyección del componente hijo.
    runInInjectionContext(this.injector, () => {
      this.selectionService = new SelectionService<T>();
    });

    const combined$ = combineLatest([
      this.page$,
      this.pageSize$,
      this.search$.pipe(debounceTime(300), distinctUntilChanged()),
      this.sort$,
      this.refresh$.pipe(startWith(null)), // Para refresco manual
    ]).pipe(
      tap(() => this.isLoading.set(true)),
      switchMap(([page, pageSize, search, sort]) =>
        this.service
          .getAll({
            page,
            pageSize,
            search,
            orderBy: sort.orderBy,
            orderDir: sort.orderDir,
          })
          .pipe(
            catchError(err => {
              console.error('Error fetching data:', err);
              // TODO: Integrar con servicio de notificaciones
              return of({ data: [], total: 0 });
            })
          )
      )
    );

    this.subscription.add(
      combined$.subscribe((response: PagedResponse<T>) => {
        this.data$ = of(response.data);
        this.totalRecords.set(response.total);
        this.isLoading.set(false);
        this.selectionService.clear();
      })
    );
  }

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

  // ... (Aquí irían los métodos onSave, onDelete, etc.)
}
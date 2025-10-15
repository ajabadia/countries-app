// src/app/modules/admin/pages/base-admin.component.ts

import { Router } from '@angular/router';
import { Directive, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, switchMap, tap, catchError, of, combineLatest, map } from 'rxjs';

// Interfaces y Modelos
import { ApiResponse } from '@services/api-response.model';
import { PageChangeEvent } from '@shared/components/paginator/paginator.model';
import { SortChangeEvent } from '@shared/components/table/table.component';
import { TableColumn } from '@services/table-column.model';
import { ToolbarButtonConfig as ToolbarButton } from '@shared/components/toolbar-buttons/toolbar-buttons.component';
import { BaseCrudService } from '@services/base-crud.service';
import { SelectionService } from '@services/selection.service'; // La ruta ya es correcta, confirmamos consistencia
import { ALL_ROUTES_MAP } from '@config/route-config';

@Directive()
export abstract class BaseAdminComponent<T extends { id: string | number }> implements OnInit {
  // --- Inyección de dependencias ---
  protected router = inject(Router);
  protected fb = inject(FormBuilder);

  // --- Propiedades abstractas (a implementar por la clase hija) ---
  protected abstract entityService: BaseCrudService<T, Partial<T>>;
  public abstract entityName: string;
  public abstract entityNamePlural: string;
  public abstract tableColumns: TableColumn[];
  public abstract form: FormGroup;

  // --- Propiedades para el encabezado de la página ---
  public pageTitle = '';
  public pageIcon? = '';

  // --- Estado reactivo para la tabla y paginación ---
  public readonly page$ = new BehaviorSubject<number>(1);
  public readonly pageSize$ = new BehaviorSubject<number>(10);
  public readonly search$ = new BehaviorSubject<string | null>(null);
  public readonly sort$ = new BehaviorSubject<SortChangeEvent>({ key: 'id', direction: 'asc' });
  private readonly refresh$ = new Subject<void>();

  // --- Flujo de datos principal ---
  public response$!: Observable<ApiResponse<T> | null>;
  public isLoading = true;

  // --- Gestión de selección ---
  public selection = new SelectionService<T>();

  // --- Gestión de modales ---
  public isModalVisible = false;
  public isConfirmDialogVisible = false;
  public editingEntity: T | null = null;

  // --- Configuración de la Toolbar ---
  public toolbarButtons: ToolbarButton[] = [
    // ✅ MEJORA: Los botones ahora usan observables para su estado 'disabled'.
    // Esto asegura que la UI reaccione a los cambios en la selección.
    { id: 'new', label: 'Nuevo', icon: 'plus-circle', action: () => this.onNew(), color: 'primary', variant: 'solid' },
    { id: 'edit', label: 'Editar', icon: 'pencil', action: () => this.onEdit(), disabled$: this.selection.hasOne$.pipe(map(hasOne => !hasOne)), color: 'secondary', variant: 'solid' },
    { id: 'delete', label: 'Eliminar', icon: 'trash', action: () => this.onDelete(), disabled$: this.selection.isEmpty$, color: 'danger', variant: 'solid' },
  ];

  ngOnInit(): void {
    this.setPageMetadata();

    // Combina todos los streams de estado para recargar los datos
    const params$ = combineLatest({
      page: this.page$,
      pageSize: this.pageSize$,
      search: this.search$,
      sort: this.sort$,
    });

    this.response$ = this.refresh$.pipe(
      // Inicia la carga la primera vez
      tap(() => this.isLoading = true),
      // Cada vez que uno de los parámetros cambia, hacemos la petición
      switchMap(() => params$.pipe(
        switchMap(params => this.entityService.getAll({
          page: params.page, 
          pageSize: params.pageSize,
          search: params.search,
          sortKey: params.sort.key,
          sortOrder: params.sort.direction,
        }))
      )),
      catchError(() => {
        this.isLoading = false;
        // TODO: Manejar el error de forma más elegante (ej: mostrar un toast)
        return of(null);
      }),
      tap(() => this.isLoading = false)
    );

    // Carga inicial
    this.refresh$.next();
  }

  /**
   * Establece el título y el icono de la página basándose en la URL actual.
   */
  private setPageMetadata(): void {
    const currentRouteConfig = ALL_ROUTES_MAP.get(this.router.url);
    if (currentRouteConfig) {
      this.pageTitle = currentRouteConfig.label;
      this.pageIcon = currentRouteConfig.icon;
    }
  }
  // --- Métodos de eventos de la UI ---
  onSearchChange(searchTerm: string | null): void {
    this.page$.next(1);
    this.search$.next(searchTerm);
    this.refresh$.next();
  }

  onPageChange(event: PageChangeEvent): void {
    this.page$.next(event.page);
    this.pageSize$.next(event.pageSize);
    this.refresh$.next();
  }

  onSortChange(event: SortChangeEvent): void {
    this.sort$.next(event);
    this.refresh$.next();
  }

  // --- Métodos CRUD y gestión de modales ---
  onNew(): void {
    this.editingEntity = null;
    this.form.reset();
    this.isModalVisible = true;
  }

  onEdit(entity?: T): void {
    const entityToEdit = entity || this.selection.first;
    // ✅ ROBUSTEZ: No hacer nada si no hay una entidad para editar.
    if (!entityToEdit) return;

    this.editingEntity = entityToEdit;
    this.form.patchValue(entityToEdit);
    this.isModalVisible = true;
    // ✅ UX: Deseleccionar todo al abrir el modal de edición para evitar confusiones.
    this.selection.clear();
  }

  onDelete(): void {
    // ✅ ROBUSTEZ: No mostrar el diálogo de confirmación si no hay nada seleccionado.
    if (this.selection.count === 0) return;
    this.isConfirmDialogVisible = true;
  }

  onSave(): void {
    if (this.form.invalid) return;

    const id = this.editingEntity?.id;
    const operation$ = id
      ? this.entityService.update(id, this.form.value)
      : this.entityService.create(this.form.value);

    operation$.subscribe(() => {
      this.closeModal();
      this.refresh$.next();
      this.selection.clear();
    });
  }

  onConfirmDelete(): void {
    const ids = this.selection.selected.map((item: T) => item.id);
    this.entityService.delete(ids).subscribe(() => {
      this.closeConfirmDialog();
      this.refresh$.next();
      this.selection.clear();
    });
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.editingEntity = null;
  }

  closeConfirmDialog(): void {
    this.isConfirmDialogVisible = false;
  }
}
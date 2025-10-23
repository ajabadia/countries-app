// File: d:\desarrollos\countries2\frontend\src\app\shared\base-classes\base-admin-page.component.ts | New File

import { Directive, Injector, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActionService } from '@app/core/services/action.service';
import { LayoutService } from '@app/core/services/layout.service';
import { ToastService } from '@app/core/services/toast.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { EMPTY, Observable, Subscription, catchError, finalize, of, tap, forkJoin } from 'rxjs';

import { AdminPageManager } from '@app/shared/utils/admin-page-manager';
import { BaseCrudService } from '@app/shared/services/base-crud.service';
import { TableColumn } from '@app/shared/components/ui-table/table.types';
import { ToolbarButtonConfig } from '@app/shared/components/ui-toolbar-buttons/ui-toolbar-buttons.component';
import { FormField } from '@app/shared/types/form.types';

/**
 * Esta es una clase base abstracta para las páginas de administración.
 * NO se usa directamente. Los componentes como `ContinentsAdminComponent` deben heredar de ella.
 *
 * Utiliza el decorador @Directive para poder usar metadatos de @Component sin ser un componente real,
 * ya que no se declarará en ningún módulo.
 */
@Directive()
export abstract class BaseAdminPageComponent<T extends { id: number | string }> implements OnInit, OnDestroy {
  // --- Propiedades Abstractas (Contrato para los componentes hijos) ---
  // Cada componente hijo DEBE implementar estas propiedades.
  abstract readonly actionId: string;
  abstract service: BaseCrudService<T>;
  abstract columns: TableColumn<T>[];
  abstract formFields: FormField[];
  form!: FormGroup; // Se inicializará en ngOnInit, usamos '!' para asegurar al compilador.
  searchableFields?: (keyof T)[];
  toolbarActions: ToolbarButtonConfig[] = [];

  // --- Implementación Concreta ---
  manager: AdminPageManager<T>;
  isFormModalVisible = signal(false);
  isConfirmModalVisible = signal(false);
  isConfirmMultiDeleteModalVisible = signal(false);
  isSaving = signal(false);
  isDeleting = signal(false);
  editingItem = signal<T | null>(null);
  itemToDelete = signal<T | null>(null);

  private injector = inject(Injector);
  protected layoutService = inject(LayoutService);
  private fb = inject(FormBuilder);
  private actionService = inject(ActionService);
  private toastService = inject(ToastService);
  private crudSubscription = new Subscription();

  // Propiedad computed para acceder al título de la página en la plantilla
  readonly currentPageTitle = computed(() => this.layoutService.pageTitle());

  get formModalTitle(): string {
    const pageTitle = this.currentPageTitle() || 'Elemento';
    const entityName = pageTitle.replace('Gestión de ', '').replace(/s$/, ''); // Intenta singularizar eliminando la 's' final
    return this.editingItem() ? `Editar ${entityName}` : `Nuevo ${entityName}`;
  }

  constructor() {
    // Creamos la instancia del manager, pero aún no la inicializamos.
    this.manager = new AdminPageManager<T>();

    // La inicialización de `toolbarActions` debe estar en el constructor
    // para que `toObservable` se ejecute en un contexto de inyección válido.
    this.toolbarActions = [
      { id: 'new', label: 'Nuevo', iconName: 'icon-add', action: () => this.openModal() },
      {
        id: 'edit',
        label: 'Editar',
        iconName: 'icon-edit',
        action: () => this.onEditSelected(),
        // El botón se deshabilita si el número de seleccionados no es exactamente 1
        disabled$: toObservable(computed(() => this.manager.selectionCount() !== 1), { injector: this.injector })
      },
      { id: 'delete-selected', label: 'Eliminar seleccionados', iconName: 'icon-delete', action: () => this.onDeleteSelected(), disabled$: toObservable(this.manager.isSelectionEmpty), color: 'danger' }
    ];
  }

  ngOnInit(): void {
    this.setPageTitleFromAction();
    this.form = this._buildForm(); // ✅ Se mueve la construcción del form a ngOnInit

    // Inicializamos el manager aquí, en ngOnInit, para asegurarnos de que las propiedades
    // abstractas (como `service`) ya han sido proporcionadas por el componente hijo.
    this.manager.init({
      service: this.service,
      injector: this.injector,
      searchableFields: this.searchableFields,
    });
  }

  private _buildForm(): FormGroup {
    const group = this.fb.group({});
    this.formFields?.forEach(field => {
      group.addControl(field.name, this.fb.control(field.defaultValue || '', field.validators || []));
    });
    return group;
  }

  private setPageTitleFromAction(): void {
    const action = this.actionService.getActionById(this.actionId);
    if (action && action.pageTitle) {
      this.layoutService.setPageTitle(action.pageTitle);
    } else {
      console.warn(`No se encontró un título para la acción con ID: ${this.actionId}`);
      this.layoutService.setPageTitle('Administración');
    }
  }

  ngOnDestroy(): void {
    this.manager.ngOnDestroy();
    this.crudSubscription.unsubscribe();
  }

  // --- Métodos para operaciones CRUD y modales ---
  openModal(item: T | null = null): void {
    this.editingItem.set(item);
    const primaryKeyField = this.formFields.find(f => f.isPrimaryKey);

    if (item) {
      this.form.patchValue(item);
      // Al editar, deshabilitamos el campo de la clave primaria para evitar su modificación.
      if (primaryKeyField) {
        this.form.get(primaryKeyField.name)?.disable();
      }
    } else {
      this.form.reset();
      // Al crear, nos aseguramos de que el campo de la clave primaria esté habilitado.
      if (primaryKeyField) {
        this.form.get(primaryKeyField.name)?.enable();
      }
    }
    this.isFormModalVisible.set(true);
  }

  closeModal(): void {
    this.isFormModalVisible.set(false);
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

  closeConfirmMultiDeleteModal(): void {
    this.isConfirmMultiDeleteModalVisible.set(false);
  }

  onSave(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.isSaving.set(true);
    const itemData = { ...this.form.value };
    const currentItem = this.editingItem();

    const saveOperation$: Observable<T> = currentItem
      ? (() => {
          // Si estamos editando y el campo de contraseña está vacío, no lo enviamos.
          if (itemData.password === '') {
            delete itemData.password;
          }
          return this.service.update(currentItem.id, itemData);
        })()
      : this.service.create(itemData);

    this.crudSubscription.add(
      saveOperation$.pipe(
        tap(() => {
          this.toastService.showSuccess('¡Guardado con éxito!');
          this.closeModal();
          this.manager.refreshData();
        }),
        catchError(err => {
          this.toastService.showError('Error al guardar: ' + (err.error?.message || err.message));
          console.error('Error saving data:', err);
          return EMPTY;
        }),
        finalize(() => this.isSaving.set(false))
      ).subscribe()
    );
  }

  onDelete(): void {
    const item = this.itemToDelete();
    if (!item) return;

    this.isDeleting.set(true);
    this.crudSubscription.add(
      this.service.delete(item.id).pipe(
        tap(() => {
          this.toastService.showSuccess('Elemento eliminado.');
          this.closeConfirmDeleteModal();
          this.manager.refreshData();
        }),
        catchError(err => {
          this.toastService.showError('Error al eliminar: ' + (err.error?.message || err.message));
          console.error('Error deleting data:', err); return of(null);
        }),
        finalize(() => this.isDeleting.set(false))
      ).subscribe()
    );
  }

  onEditSelected(): void {
    const selectedIds = this.manager.selectionService.getSelectedIds();
    if (selectedIds.length !== 1) {
      return; // No debería ocurrir si el botón está bien deshabilitado, pero es una buena guarda.
    }
    const itemToEdit = this.manager.data().find(item => item.id === selectedIds[0]);
    if (itemToEdit) {
      this.openModal(itemToEdit);
    }
  }

  onDeleteSelected(): void {
    if (this.manager.isSelectionEmpty()) return;
    this.isConfirmMultiDeleteModalVisible.set(true);
  }

  onConfirmDeleteSelected(): void {
    const selectedIds = this.manager.selectionService.getSelectedIds();
    if (selectedIds.length === 0) return;

    this.isDeleting.set(true);

    const deleteObservables$ = selectedIds.map(id =>
      this.service.delete(id).pipe(
        catchError(err => {
          this.toastService.showError(`Error al eliminar ID ${id}.`);
          console.error(`Error eliminando el elemento con ID ${id}:`, err);
          // Devolvemos un observable que emite null para que forkJoin no se cancele.
          return of(null);
        })
      )
    );

    this.crudSubscription.add(
      forkJoin(deleteObservables$).pipe(
        tap(() => {
          this.toastService.showSuccess(`${selectedIds.length} elementos eliminados.`);
          this.manager.refreshData();
          this.closeConfirmMultiDeleteModal();
        }),
        finalize(() => this.isDeleting.set(false))
      ).subscribe()
    );
  }
}
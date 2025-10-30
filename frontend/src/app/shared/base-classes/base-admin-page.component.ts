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
import { ToolbarButtonConfig } from '@app/types/action.types';
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
      { id: 'new', label: 'Nuevo', iconName: 'icon-add', action: () => this.onEdit(), color: 'primary', variant: 'solid' },
      {
        id: 'edit',
        label: 'Editar',
        iconName: 'icon-edit',
        action: () => this.onEditSelected(),
        color: 'primary',
        variant: 'solid',
        disabled$: toObservable(computed(() => this.manager.selectionCount() !== 1), { injector: this.injector })
      },
      // ✅ CORRECCIÓN: Se usa la propiedad correcta `disabled$` y se convierte el signal a observable.
      { id: 'delete-selected', label: 'Eliminar seleccionados', iconName: 'icon-delete', action: () => this.onDeleteSelected(), disabled$: toObservable(computed(() => this.manager.isSelectionEmpty()), { injector: this.injector }), color: 'danger' }
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
  onEdit(item: T | null = null): void {
    this.editingItem.set(item);
    const primaryKeyField = this.formFields.find(f => f.isPrimaryKey);
    
    // Siempre reseteamos el formulario al abrir el modal para asegurar un estado limpio.
    this.form.reset();
    
    if (item) {
      this.form.patchValue(item);
      // Al editar, deshabilitamos el campo de la clave primaria para evitar su modificación.
      if (primaryKeyField) {
        this.form.get(primaryKeyField.name)?.disable();
      }
    } else {
      // Al crear, nos aseguramos de que el campo de la clave primaria esté habilitado.
      if (primaryKeyField) {
        this.form.get(primaryKeyField.name)?.enable();
      }
    }

    this.isFormModalVisible.set(true);
  }

  onCloseFormModal(): void {
    this.isFormModalVisible.set(false);
    this.editingItem.set(null);
    // ✅ CORRECCIÓN CLAVE: Restauramos el reset() al cerrar el modal.
    // Esto es fundamental para limpiar el estado del formulario (valores, validez, pristine/dirty)
    // y asegurar que la siguiente vez que se abra, funcione correctamente.
    this.form.reset();
  }

  requestConfirmDelete(item: T): void {
    this.itemToDelete.set(item);
    this.isConfirmModalVisible.set(true);
  }

  onCloseConfirmModal(): void {
    this.itemToDelete.set(null);
    this.isConfirmModalVisible.set(false);
  }

  onCloseConfirmMultiDeleteModal(): void {
    this.isConfirmMultiDeleteModalVisible.set(false);
  }

  onSave(): void {
    // ✅ REFACTORIZACIÓN: La validación ahora se hace aquí, en el momento del clic.
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      // Si el formulario es inválido, mostramos una notificación y detenemos la ejecución.
      this.toastService.showError('Por favor, revisa los campos del formulario. Hay errores o faltan datos.');
      return;
    }

    this.isSaving.set(true);
    // ✅ CORRECCIÓN: Usamos `getRawValue()` en lugar de `value`.
    // `getRawValue()` incluye los valores de los controles deshabilitados (como el ID al editar),
    // mientras que `.value` los excluye, lo que causaba que la actualización fallara
    // al no enviar el ID del registro.
    const itemData = { ...this.form.getRawValue() };
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
          this.onCloseFormModal();
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

  onConfirmDelete(): void {
    const item = this.itemToDelete();
    if (!item) return;

    this.isDeleting.set(true);
    this.crudSubscription.add(
      this.service.delete(item.id).pipe(
        tap(() => {
          this.toastService.showSuccess('Elemento eliminado.');
          this.onCloseConfirmModal();
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
      this.onEdit(itemToEdit);
    }
  }

  onDeleteSelected(): void {
    if (this.manager.isSelectionEmpty()) return;
    this.isConfirmMultiDeleteModalVisible.set(true);
  }
  
  /**
   * ✅ REFACTORIZADO: Confirma y ejecuta la eliminación masiva de registros.
   * Ahora realiza una única llamada a `deleteMany` en lugar de múltiples llamadas `delete`.
   * Esto mejora drásticamente el rendimiento y reduce la carga en el servidor.
   */
  onConfirmDeleteSelected(): void {
    // ✅ CORRECCIÓN: Se usa `selectionService` que es la propiedad correcta del manager.
    const selectedIds = this.manager.selectionService.getSelectedIds();
    if (selectedIds.length === 0) return;

    // ✅ CORRECCIÓN: Se usa el signal `isLoading` directamente con `.set()`.
    this.manager.isLoading.set(true);

    this.crudSubscription.add(
      this.service.deleteMany(selectedIds).pipe(
        tap(() => {
          this.toastService.showSuccess(`${selectedIds.length} registro(s) eliminado(s) con éxito.`);
          this.manager.selectionService.clear();
          this.manager.refreshData();
          this.onCloseConfirmMultiDeleteModal();
        }),
        catchError(err => {
          this.toastService.showError('Error al eliminar los registros. Por favor, inténtelo de nuevo.');
          console.error('Error during bulk delete:', err); 
          return of(null); // Devolvemos un observable que completa para que finalize se ejecute.
        }),
        finalize(() => this.manager.isLoading.set(false))
      ).subscribe()
    );
  }

  handleToolbarAction(actionId: string): void {
    const action = this.toolbarActions.find(a => a.id === actionId);
    if (action && action.action) {
      action.action();
    }
  }

  handleTableAction(event: { action: string, item: T }): void {
    switch (event.action) {
      case 'edit':
        this.onEdit(event.item);
        break;
      case 'delete':
        this.requestConfirmDelete(event.item);
        break;
    }
  }
}
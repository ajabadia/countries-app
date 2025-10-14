// src/app/modules/admin/pages/base-crud.component.ts

import { Component, inject, OnInit, Type } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { switchMap, catchError, finalize, map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { BaseCrudService } from 'src/app/core/services/base-crud.service';
import { SelectionService } from 'src/app/modules/shared/components/services/selection/selection.service';
import { ApiResponse } from 'src/app/core/models/api-response.model';
import { TableColumn } from 'src/app/modules/shared/models/table-column.model';
import { ToolbarButtonConfig } from 'src/app/modules/shared/components/toolbar-buttons/toolbar-buttons.component';

@Component({ template: '' })
export abstract class BaseCrudComponent<T extends { id: any; default_name?: string }> implements OnInit {
  
  protected abstract service: BaseCrudService<T>;
  public abstract form: FormGroup;
  public abstract entityName: string;
  public abstract entityNamePlural: string;
  public abstract formComponent: Type<any>;
  public abstract tableColumns: TableColumn[];
  
  public selection = inject(SelectionService<T>);

  public isModalVisible = false;
  public isConfirmDialogVisible = false;
  public editingEntity: T | null = null;
  public isLoading = false;
  
  protected refresh$ = new BehaviorSubject<void>(undefined);
  public page$ = new BehaviorSubject<number>(1);
  public pageSize$ = new BehaviorSubject<number>(10);
  public sort$ = new BehaviorSubject<{ key: string, order: 'asc' | 'desc' }>({ key: 'default_name', order: 'asc' });
  public search$ = new BehaviorSubject<string>('');

  public response$: Observable<ApiResponse<T>>;
  public toolbarButtons: ToolbarButtonConfig[] = [];

  constructor() {
    this.response$ = combineLatest([this.page$, this.pageSize$, this.sort$, this.search$, this.refresh$]).pipe(
      switchMap(([page, pageSize, sort, search]) => {
        this.isLoading = true;
        return (this.service.getAll({ page, pageSize, sortKey: sort.key, sortOrder: sort.order, search }) as Observable<any>).pipe(
          map(response => {
            // ✅ ROBUSTEZ: Comprueba si la respuesta es un array o un objeto ApiResponse
            if (Array.isArray(response)) {
              // Si es un array simple, lo envolvemos en la estructura que espera el frontend
              return { data: response, total: response.length, totalPages: 1, currentPage: 1 };
            }
            // Si ya tiene la estructura correcta, lo devolvemos tal cual
            return response;
          }),
          finalize(() => this.isLoading = false),
          catchError(() => of({ data: [], total: 0, totalPages: 1, currentPage: 1 }))
        );
      })
    );
  }

  ngOnInit(): void {
    this.updateToolbarButtons();
    this.selection.selectionChanged.subscribe(() => this.updateToolbarButtons());
  }

  protected updateToolbarButtons(): void {
    this.toolbarButtons = [
      { label: `Añadir Nuevo`, icon: 'plus-circle', action: () => this.onAddNew(), color: 'primary' },
      { label: 'Editar', icon: 'pencil', action: () => this.onEdit(), color: 'secondary', disabled: this.selection.count !== 1 },
      { label: 'Eliminar', icon: 'trash', action: () => this.onDelete(), color: 'danger', disabled: this.selection.count === 0 }
    ];
  }

  public onSortChange(sort: { key: string, order: 'asc' | 'desc' }): void { this.sort$.next(sort); }
  public onPageChange(page: number): void { this.page$.next(page); }
  public onPageSizeChange(pageSize: number): void { this.page$.next(1); this.pageSize$.next(pageSize); }
  public onSearchChange(term: string): void { this.page$.next(1); this.search$.next(term); }

  public onAddNew(): void {
    this.editingEntity = null;
    this.form.reset();
    this.isModalVisible = true;
  }

  public onEdit(): void {
    this.editingEntity = this.selection.selectedArray[0];
    if (this.editingEntity) {
      this.form.patchValue(this.editingEntity);
    }
    this.isModalVisible = true;
  }

  public onSave(): void {
    if (!this.form.valid) return;
    const entityData = this.form.getRawValue();
    const operation$ = this.editingEntity
      ? this.service.update(this.editingEntity.id, entityData)
      : this.service.create(entityData);

    operation$.subscribe(() => {
      this.closeModal();
      this.refresh$.next();
    });
  }
  
  public closeModal(): void {
    this.isModalVisible = false;
    this.editingEntity = null;
  }

  public onDelete(): void {
    this.isConfirmDialogVisible = true;
  }

  public onConfirmDelete(): void {
    const idsToDelete = this.selection.selectedArray.map(c => c.id);
    this.service.delete(idsToDelete).subscribe(() => {
      this.closeConfirmDialog();
      this.refresh$.next();
      this.selection.clear();
    });
  }

  public closeConfirmDialog(): void {
    this.isConfirmDialogVisible = false;
  }
}
// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-table\ui-table.component.ts | Last Modified: 2025-10-19

import {
  Component,
  input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ContentChildren,
  computed,
  effect,
  TemplateRef,
  OnChanges,
  SimpleChanges,
  AfterContentInit,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionService } from '@app/shared/services/selection.service'; // Ruta corregida
import { TableColumn } from './table.types';
import { Sort, SortDirection } from '@app/shared/types/sort.type'; // Ruta corregida
import { UiTableColumnDirective } from './ui-table-column.directive';
import { UiToggleCheckboxComponent, UiToggleState } from '@app/shared/components/ui-toggle-checkbox/ui-toggle-checkbox.component';
import { UiIconComponent } from '@app/shared/components/ui-icon/ui-icon.component'; // Añadido para los iconos de ordenación

@Component({
  selector: 'app-ui-table',
  standalone: true,
  imports: [CommonModule, UiToggleCheckboxComponent, UiIconComponent], // Añadido UiIconComponent
  templateUrl: './ui-table.component.html',
  styleUrls: ['./ui-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTableComponent<T extends { id: number | string }> implements OnChanges, AfterContentInit {
  // --- Inputs ---
  data = input<T[] | null | undefined>([], { alias: 'uiTableData' });
  columns = input<TableColumn<T>[]>([], { alias: 'uiTableColumns' }); // Alias corregido
  selection = input<SelectionService<T> | null>(null, { alias: 'uiTableSelection' });
  sort = input<Sort<T> | null>(null, { alias: 'uiTableSort' });
  /**
   * Permite pasar plantillas personalizadas desde un componente padre anidado.
   * Esencial para cuando la tabla está dentro de otro componente de layout.
   * @alias uiTableCustomTemplates
   */
  customTemplatesInput = input<QueryList<UiTableColumnDirective> | undefined>(undefined, { alias: 'uiTableCustomTemplates' });
  isLoadingInput = input<boolean | undefined>(undefined, { alias: 'uiTableIsLoading' });

  // --- Outputs ---
  // --- Estado Interno y Derivado ---
  isLoading = computed(() => this.isLoadingInput() ?? this.data() === null);

  @Output('uiTableSortChange') sortChange = new EventEmitter<Sort<T>>();

  // Usamos ContentChildren para buscar todas las plantillas proyectadas.
  @ContentChildren(UiTableColumnDirective)
  private columnTemplates: QueryList<UiTableColumnDirective> | null = null;

  // ✅ CORRECCIÓN CLAVE: Propiedad para almacenar las plantillas procesadas.
  // Este mapa contendrá las plantillas personalizadas, usando el nombre de la columna como clave.
  public customTemplates: { [key: string]: TemplateRef<unknown> } = {};

  @Output() uiTableAction = new EventEmitter<{ action: string, item: T }>(); // Añadido Output faltante
  // Estado para el checkbox de la cabecera con 3 estados.
  public headerCheckboxState: UiToggleState = 'ui-toggle-unchecked';

  ngOnChanges(changes: SimpleChanges): void {
    // Si los items o la selección cambian, recalculamos el estado del checkbox de la cabecera.
    if (this.selection() && (changes['data'] || changes['selection'])) {
      this.updateHeaderCheckboxState();
    }
  }

  // ✅ CORRECCIÓN CLAVE: Se implementa AfterContentInit para procesar las plantillas.
  // Este hook del ciclo de vida se ejecuta una vez después de que el contenido proyectado (<ng-content>) ha sido inicializado.
  ngAfterContentInit(): void {
    if (this.columnTemplates) {
      // Combina las plantillas proyectadas directamente con las pasadas a través del Input.
      // Esto hace que el componente sea flexible y funcione en ambos escenarios.
      const allTemplates = new QueryList<UiTableColumnDirective>();
      const templates: UiTableColumnDirective[] = [];

      if (this.columnTemplates?.length) {
        templates.push(...this.columnTemplates.toArray());
      }
      if (this.customTemplatesInput()?.length) {
        templates.push(...this.customTemplatesInput()!.toArray());
      }
      allTemplates.reset(templates);

      // Convertimos la lista de directivas de plantilla en un mapa clave-valor para un acceso rápido.
      this.customTemplates = allTemplates.reduce((acc, t) => {
        acc[t.columnName] = t.templateRef;
        return acc;
      }, {} as { [key: string]: TemplateRef<any> });
    }
  }

  // Propiedad para acceder a la plantilla de acciones de forma más sencilla
  actionsTemplate = computed(() => {
    // Ahora busca en el mapa `customTemplates`.
    return this.customTemplates['actions'] || null;
  });

  // Helper para acceder al valor de una celda, incluso si la clave es anidada (ej: 'user.name')
  getCellValue(item: T, key: keyof T | string): unknown {
    const keys = (key as string).split('.');
    let value: unknown = item;
    for (const k of keys) {
      if (value === null || value === undefined) {
        return '';
      }
      value = (value as Record<string, unknown>)[k];
    }
    return value;
  }

  onSort(column: TableColumn<T>): void {
    if (!column.sortable) {
      return;
    }

    let orderDir: SortDirection = 'asc';
    if (
      this.sort() &&
      this.sort()!.orderBy === column.key &&
      this.sort()!.orderDir === 'asc'
    ) {
      orderDir = 'desc';
    }

    this.sortChange.emit({ orderBy: column.key as keyof T, orderDir });
  }

  isSorted(column: TableColumn<T>, dir: SortDirection): boolean {
    return (
      this.sort()?.orderBy === column.key && this.sort()?.orderDir === dir
    );
  }

  /**
   * Maneja el cambio de estado del checkbox de la cabecera (seleccionar/deseleccionar todo).
   */
  onToggleAll(): void {
    const selection = this.selection();
    if (!selection || !this.data()) return;

    selection.toggleAll(this.data()!);
    this.updateHeaderCheckboxState();
  }

  /**
   * Maneja el clic en una fila para la selección.
   * @param item El objeto de la fila.
   */
  onRowClick(item: T): void {
    const selection = this.selection();
    if (!selection) return;
    selection.toggle(item);
    this.updateHeaderCheckboxState();
  }

  /**
   * Actualiza el estado del checkbox de la cabecera (on, off, intermediate).
   */
  private updateHeaderCheckboxState(): void {
    const selection = this.selection();
    if (!selection || !this.data() || this.data()!.length === 0) {
      this.headerCheckboxState = 'ui-toggle-unchecked';
      return;
    }

    // Contamos cuántos de los items de la página actual están seleccionados
    const numSelectedOnPage = this.data()!.filter(item => selection.isSelected(item)).length;
    const totalItemsOnPage = this.data()!.length;

    if (numSelectedOnPage === 0) {
      this.headerCheckboxState = 'ui-toggle-unchecked';
    } else if (numSelectedOnPage === totalItemsOnPage) {
      this.headerCheckboxState = 'ui-toggle-checked';
    } else {
      this.headerCheckboxState = 'ui-toggle-indeterminate';
    }
  }
}

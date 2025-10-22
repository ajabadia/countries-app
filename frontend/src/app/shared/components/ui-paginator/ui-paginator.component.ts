// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-paginator\ui-paginator.component.ts | Last Modified: 2025-10-19

import {
  Component,
  ChangeDetectionStrategy,
  input,
  OnInit,
  effect,
  output,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UiIconComponent } from '@shared/components/ui-icon/ui-icon.component';
import { UiButtonComponent } from '@shared/components/ui-button/ui-button.component';
import { PAGE_SIZE_OPTIONS, PaginatorChangeEvent } from './ui-paginator.types';

@Component({
  selector: 'app-ui-paginator',
  standalone: true,
  imports: [CommonModule, FormsModule, UiIconComponent, UiButtonComponent],
  templateUrl: './ui-paginator.component.html',
  styleUrls: ['./ui-paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiPaginatorComponent implements OnInit {
  // --- Entradas (Inputs) ---
  totalRecords = input.required<number>({ alias: 'uiPaginatorTotalRecords' });
  page = input(1, { alias: 'uiPaginatorPage' });
  pageSize = input(PAGE_SIZE_OPTIONS[0], { alias: 'uiPaginatorPageSize' });
  pageSizeOptions = input(PAGE_SIZE_OPTIONS, { alias: 'uiPaginatorPageSizeOptions' });

  // --- Salidas (Outputs) ---
  pageStateChange = output<PaginatorChangeEvent>({ alias: 'uiPaginatorPageStateChange' });

  // --- Estado Derivado (Computed Signals) ---
  totalPages = computed(() => {
    const total = this.totalRecords();
    const size = this.pageSize();
    return total > 0 && size > 0 ? Math.ceil(total / size) : 0;
  });

  startRecord = computed(() => {
    return this.totalRecords() > 0 ? (this.page() - 1) * this.pageSize() + 1 : 0;
  });

  endRecord = computed(() => {
    return Math.min(this.page() * this.pageSize(), this.totalRecords());
  });

  // Signal interno para gestionar el valor del input de página de forma optimizada
  currentPageInputValue = signal(this.page());

  constructor() {
    // Efecto para re-validar la página actual si el total de registros o el tamaño de página cambian
    effect(() => {
      const currentPage = this.page();
      const total = this.totalPages();
      // Sincroniza el valor del input solo cuando el signal de página cambia
      this.currentPageInputValue.set(currentPage);

      if (currentPage > total && total > 0) {
        this.goToPage(total);
      }
    });
  }

  ngOnInit(): void {
    // Al inicializar, emitimos el estado completo de la paginación.
    // Esto es CRUCIAL para que los componentes padre que usan combineLatest
    // reciban el estado inicial y puedan realizar la primera carga de datos.
    this.pageStateChange.emit({
      page: this.page(),
      pageSize: this.pageSize(),
    });
  }
  // --- Métodos de Navegación ---

  /**
   * Navega a una página específica, asegurando que esté dentro de los límites.
   */
  goToPage(newPage: number): void {
    const newValidPage = Math.max(1, Math.min(newPage, this.totalPages()));
    if (this.page() !== newValidPage) {
      this.pageStateChange.emit({ page: newValidPage, pageSize: this.pageSize() });
    }
  }

  /**
   * Gestiona el cambio en el selector de tamaño de página.
   */
  onPageSizeChange(newSize: number): void {
    // Al cambiar el tamaño de página, es una buena práctica volver a la primera página
    // para evitar quedar en una página que ya no existe.
    this.pageStateChange.emit({
      page: 1,
      pageSize: newSize,
    });
  }

  /**
   * Gestiona el cambio en el input de "ir a página".
   */
  onGoToPageInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const page = parseInt(inputElement.value, 10);
    if (!isNaN(page)) {
      this.goToPage(page);
    }
  }
}
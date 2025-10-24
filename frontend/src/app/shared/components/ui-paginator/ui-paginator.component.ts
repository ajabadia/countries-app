import { Component, input, Output, EventEmitter, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel
import { UiButtonComponent } from '@app/shared/components/ui-button/ui-button.component'; // Asumiendo esta ruta
import { UiIconComponent } from '@app/shared/components/ui-icon/ui-icon.component'; // Asumiendo esta ruta

@Component({
  selector: 'app-ui-paginator',
  standalone: true,
  imports: [CommonModule, FormsModule, UiButtonComponent, UiIconComponent],
  templateUrl: './ui-paginator.component.html',
  styleUrls: ['./ui-paginator.component.scss'],
})
export class UiPaginatorComponent {
  // --- Inputs (como signals) ---
  uiPaginatorTotalRecords = input<number>(0);
  uiPaginatorPage = input<number>(1);
  uiPaginatorPageSize = input<number>(10);

  // --- Outputs ---
  @Output() uiPaginatorPageStateChange = new EventEmitter<{ page: number, pageSize: number }>();

  // Estado interno para las opciones de tamaño de página
  pageSizeOptions = signal<number[]>([10, 25, 50, 100]);

  // Signals computados para estados derivados
  totalPages = computed(() => Math.ceil(this.uiPaginatorTotalRecords() / this.uiPaginatorPageSize()));
  startRecord = computed(() => (this.uiPaginatorPage() - 1) * this.uiPaginatorPageSize() + 1);
  endRecord = computed(() => Math.min(this.uiPaginatorPage() * this.uiPaginatorPageSize(), this.uiPaginatorTotalRecords()));

  // Signal interno para el valor del campo de entrada para evitar la mutación directa de @Input
  currentPageInputValue = signal(this.uiPaginatorPage());

  constructor() {
    // Efecto para actualizar el valor del input interno cuando uiPaginatorPage cambia externamente
    effect(() => {
      this.currentPageInputValue.set(this.uiPaginatorPage());
    });
  }

  goToPage(page: number): void {
    const newPage = Math.max(1, Math.min(page, this.totalPages()));
    if (newPage !== this.uiPaginatorPage()) {
      this.uiPaginatorPageStateChange.emit({ page: newPage, pageSize: this.uiPaginatorPageSize() });
    }
  }

  onGoToPageInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const newPage = parseInt(inputElement.value, 10);
    if (!isNaN(newPage) && newPage >= 1 && newPage <= this.totalPages()) {
      this.goToPage(newPage);
    } else {
      // Restablecer el input a la página válida actual si la entrada es inválida
      this.currentPageInputValue.set(this.uiPaginatorPage());
    }
  }

  onPageSizeChange(newSize: number): void {
    if (newSize !== this.uiPaginatorPageSize()) {
      // Cuando cambia el tamaño de página, se reinicia a la primera página
      this.uiPaginatorPageStateChange.emit({ page: 1, pageSize: newSize });
    }
  }
}
// src/app/modules/shared/components/confirm-dialog/confirm-dialog.component.ts

import { Component, Input, Output, EventEmitter, HostListener, ChangeDetectionStrategy, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

// --- Dependencias del Componente Standalone ---
import { UiButtonComponent } from '../ui-button/ui-button.component';
import { UiIconComponent } from '../ui-icon/ui-icon.component'; // ¡NUEVO! Para los iconos del diálogo.

@Component({
  selector: 'app-confirm-dialog',
  // --- REFACTORIZACIÓN A STANDALONE ---
  standalone: true,
  imports: [
    CommonModule,
    UiButtonComponent, // Importamos el botón para el footer.
    UiIconComponent    // Importamos el componente de icono para el header.
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ------------------------------------
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnChanges {
  // === Entradas (Inputs) ===
  @Input() visible: boolean = false;
  @Input() title: string = 'Confirmar Acción';
  @Input() message: string = '¿Estás seguro de que quieres continuar?';
  @Input() confirmLabel: string = 'Aceptar';
  @Input() cancelLabel: string = 'Cancelar';
  @Input() variant: 'info' | 'success' | 'error' | 'warning' = 'info';

  // === Salidas (Outputs) ===
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  @ViewChild('dialogModal') dialogModal?: ElementRef<HTMLDivElement>;

  /**
   * MEJORA: Mapeo de variantes a nombres de iconos.
   * Centraliza la lógica para que la plantilla sea más limpia.
   */
  get iconName(): string {
    const iconMap = {
      info: 'info-circle',
      success: 'check-circle',
      error: 'alert-circle',
      warning: 'alert-triangle'
    };
    return iconMap[this.variant];
  }

  /**
   * Cuando el diálogo se hace visible, automáticamente le damos el foco
   * para mejorar la accesibilidad por teclado.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      setTimeout(() => this.dialogModal?.nativeElement.focus(), 0);
    }
  }

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }

  /**
   * Gestiona el cierre con la tecla 'Escape'.
   */
  @HostListener('keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    // Solo actúa si el modal está visible para no interferir con otros elementos.
    if (this.visible) {
      event.stopPropagation(); // Evita que el evento se propague a otros listeners.
      this.onCancel();
    }
  }
}
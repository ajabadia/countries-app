// src/app/modules/shared/components/confirm-dialog/confirm-dialog.component.ts

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

// --- Dependencias del Componente Standalone ---
import { ModalComponent } from '../modal/modal.component'; // 1. Importamos el ModalComponent genérico
import { UiIconComponent } from '../ui-icon/ui-icon.component';

@Component({
  selector: 'app-confirm-dialog',
  // --- REFACTORIZACIÓN A STANDALONE ---
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    UiIconComponent, // Añadido para poder usar <app-ui-icon>
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ------------------------------------
  // 3. La plantilla ahora es inline y mucho más simple
  template: `
    <app-modal
      [visible]="visible"
      titleAlign="center"
      [acceptLabel]="confirmLabel"
      [cancelLabel]="cancelLabel"
      (accept)="onConfirm()"
      (close)="onCancel()">
      <!-- Proyectamos el contenido personalizado en el modal -->
      <div class="confirm-dialog-content">
        <app-ui-icon [icon]="iconName" type="system" size="l"></app-ui-icon>
        <h2 class="title">{{ title }}</h2>
        <p class="message">{{ message }}</p>
      </div>
    </app-modal>
  `,
  // 4. Ya no necesitamos estilos propios, los hereda del modal genérico.
  styleUrls: [],
})
export class ConfirmDialogComponent {
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

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
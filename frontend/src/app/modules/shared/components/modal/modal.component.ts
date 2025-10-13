// src/app/modules/shared/components/modal/modal.component.ts

import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UiIconType } from 'src/app/services/icon.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    // Animación de Fade-in / Fade-out para el modal y el fondo
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate('200ms ease-in-out')
      ])
    ])
  ]
})
export class ModalComponent {
  // --- Entradas de Visibilidad y Comportamiento ---
  @Input() visible = false;
  @Input() closeOnBackdrop = true;

  // --- Entradas para la Cabecera (delegadas a app-ui-heading) ---
  @Input() title: string = '';
  @Input() subtitle?: string;
  @Input() icon?: string;
  @Input() iconType: UiIconType = 'system';
  @Input() iconSize: 'inherit' | 'xs' | 's' | 'm' | 'l' | 'xl' | number = 'l';
  @Input() titleAlign: 'left' | 'center' | 'right' = 'left';

  // --- Entradas para el Footer (delegadas a app-ui-button) ---
  @Input() showAccept = true;
  @Input() acceptLabel = 'Aceptar';
  @Input() acceptDisabled = false;
  
  // ✅ CORREGIDO: Nombres de propiedades actualizados
  @Input() showCancel = true; 
  @Input() cancelLabel = 'Cancelar';

  // --- Eventos de Salida ---
  @Output() accept = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  /**
   * Mejora UX: Permite cerrar el modal presionando la tecla Escape.
   */
  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (this.visible) {
      this.onClose();
    }
  }

  onAccept() {
    if (!this.acceptDisabled) {
      this.accept.emit();
    }
  }

  onClose() {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if (this.closeOnBackdrop && event.target && (event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.onClose();
    }
  }
}
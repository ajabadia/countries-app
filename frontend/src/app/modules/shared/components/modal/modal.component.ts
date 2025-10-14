// src/app/modules/shared/components/modal/modal.component.ts

import { Component, Input, Output, EventEmitter, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { UiHeadingComponent } from '../ui-heading/ui-heading.component';
import { UiButtonComponent } from '../ui-button/ui-button.component';
import { UiIconType } from 'src/app/services/icon.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ CommonModule, UiHeadingComponent, UiButtonComponent ],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [ animate('200ms ease-in-out') ])
    ])
  ],
})
export class ModalComponent {
  @Input() visible = false;
  @Input() closeOnBackdrop = true;
  @Input() title: string = '';
  @Input() subtitle?: string;
  @Input() icon?: string;
  @Input() iconType: UiIconType = 'system';
  @Input() iconSize: 'inherit' | 'xs' | 's' | 'm' | 'l' | 'xl' | string = 'l'; // ✅ CORREGIDO: Acepta 'string'
  @Input() titleAlign: 'left' | 'center' | 'right' = 'left';
  @Input() showAccept = true;
  @Input() acceptLabel = 'Aceptar';
  @Input() acceptDisabled = false;
  @Input() showCancel = true;
  @Input() cancelLabel = 'Cancelar';

  @Output() accept = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (this.visible) this.onClose();
  }

  onAccept(): void {
    if (!this.acceptDisabled) this.accept.emit();
  }

  onClose(): void {
    this.close.emit();
  }

  onBackdropClick(): void { // ✅ CORREGIDO: No recibe argumentos
    if (this.closeOnBackdrop) this.onClose();
  }
}
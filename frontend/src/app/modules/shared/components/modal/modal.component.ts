// src/app/modules/shared/components/modal/modal.component.ts

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

import { UiHeadingComponent } from '../ui-heading/ui-heading.component';
import { UiButtonComponent } from '../ui-button/ui-button.component';
import { ToolbarButtonConfig, ToolbarButtonsComponent } from '../toolbar-buttons/toolbar-buttons.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, UiHeadingComponent, UiButtonComponent, ToolbarButtonsComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [
      transition(':enter', [style({ opacity: 0 }), animate('150ms', style({ opacity: 1 }))]),
      transition(':leave', [animate('150ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class ModalComponent implements OnChanges {
  @Input() visible = false;
  @Input() title?: string;
  @Input() subtitle?: string;
  // ✅ ESTANDARIZACIÓN: Renombramos 'icon' a 'name' para alinear con ui-heading.
  @Input() name?: string;
  @Input() showAccept = true;
  @Input() showCancel = true;
  @Input() acceptLabel = 'Aceptar';
  @Input() cancelLabel = 'Cancelar';
  @Input() acceptDisabled = false;

  @Output() close = new EventEmitter<void>();
  @Output() accept = new EventEmitter<void>();

  public footerButtons: ToolbarButtonConfig[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    // Regeneramos la configuración de los botones si cambia alguna de sus propiedades.
    if (changes['acceptLabel'] || changes['cancelLabel'] || changes['acceptDisabled'] || changes['showAccept'] || changes['showCancel']) {
      this.updateFooterButtons();
    }
  }

  private updateFooterButtons(): void {
    const buttons: ToolbarButtonConfig[] = [];
    if (this.showCancel) {
      buttons.push({ id: 'cancel', label: this.cancelLabel, action: () => this.onClose(), color: 'surface' });
    }
    if (this.showAccept) {
      buttons.push({ id: 'accept', label: this.acceptLabel, action: () => this.onAccept(), color: 'primary', disabled$: of(this.acceptDisabled) });
    }
    this.footerButtons = buttons;
  }

  onClose(): void {
    this.close.emit();
  }

  onAccept(): void {
    this.accept.emit();
  }

  onBackdropClick(): void {
    this.onClose();
  }
}
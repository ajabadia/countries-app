import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() visible = false;
  @Input() title = '';
  @Input() showAccept = true;
  @Input() showClose = true;
  @Input() acceptLabel = 'Aceptar';
  @Input() closeLabel = 'Cerrar';
  @Input() acceptDisabled = false;
  @Input() closeOnBackdrop = true;

  @Output() accept = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  onAccept() {
    if (!this.acceptDisabled) {
      this.accept.emit();
    }
  }

  onClose() {
    this.close.emit();
  }
}

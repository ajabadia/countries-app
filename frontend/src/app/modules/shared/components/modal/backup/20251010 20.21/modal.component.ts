import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() visible = false;
  @Input() title: string = '';
  @Input() showAccept = true;
  @Input() showClose = true;
  @Input() acceptLabel = 'Aceptar';
  @Input() closeLabel = 'Cerrar';
  @Input() acceptDisabled = false;
  @Input() closeOnBackdrop = true;
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' | 'top' | 'bottom' = 'left';
  @Input() iconSize: 'xs' | 's' | 'm' | 'l' | 'xl' | number = 'm';
  @Input() titleAlign: 'left' | 'center' | 'right' = 'left';
  @Input() titleColor: 'primary' | 'secondary' | 'accent' | 'text' | 'muted' = 'text' ;
  @Input() color: 'primary' | 'secondary' | 'accent' | 'text' | 'muted' | 'transparent' = 'text';
  @Input() subtitle?: string;

  





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

import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() visible: boolean = false;
  @Input() variant: 'info' | 'success' | 'error' | 'warning' = 'info';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  // WRAPPER para click, para debug y ampliación futura
  onConfirm(): void { this.confirm.emit(); }
  onCancel(): void { this.cancel.emit(); }

  // Accesibilidad para el teclado
  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.visible) return;
    if (event.key === 'Escape') { this.onCancel(); }
    if (event.key === 'Enter') { this.onConfirm(); }
  }
}




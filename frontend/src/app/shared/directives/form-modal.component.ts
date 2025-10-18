import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormModalComponent {
  @Input() isVisible = false;
  @Input() title = 'Form';
  @Input() isSaving = false;

  @Output() save = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  onSave(): void {
    this.save.emit();
  }

  onClose(): void {
    this.close.emit();
  }
}
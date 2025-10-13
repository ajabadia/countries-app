import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'country-modal',
  templateUrl: './country-modal.component.html',
  styleUrls: ['./country-modal.component.scss']
})
export class CountryModalComponent {
  @Input() form!: FormGroup;
  @Input() visible: boolean = false;
  @Input() isEditMode: boolean = false;

  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  // Emitimos sólo si el form es válido
  onSave() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }

  onClose() {
    this.close.emit();
  }
}

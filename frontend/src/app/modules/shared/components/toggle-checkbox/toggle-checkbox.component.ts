import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

// Tipo para el estado visual del toggle-checkbox
export type ToggleState = 'checked' | 'unchecked' | 'indeterminate';

@Component({
  selector: 'app-toggle-checkbox',
  templateUrl: './toggle-checkbox.component.html',
  styleUrls: ['./toggle-checkbox.component.scss']
})
export class ToggleCheckboxComponent implements AfterViewInit, OnChanges {
  // Estado externo ("checked", "unchecked", "indeterminate")
  @Input() state: ToggleState = 'unchecked';

  // Emite el estado tras el cambio de toggle
  @Output() stateChange = new EventEmitter<ToggleState>();

  // Controla acceso al checkbox real para manejar indeterminate correctamente
  @ViewChild('checkbox', { static: false }) checkbox!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    this.updateIndeterminate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['state']) {
      this.updateIndeterminate();
    }
  }

  updateIndeterminate(): void {
    if (this.checkbox) {
      this.checkbox.nativeElement.indeterminate = this.state === 'indeterminate';
    }
  }

  // Alterna el estado
  toggle(): void {
    if (this.state === 'unchecked' || this.state === 'indeterminate') {
      this.state = 'checked';
    } else if (this.state === 'checked') {
      this.state = 'unchecked';
    }
    this.updateIndeterminate();
    this.stateChange.emit(this.state);
  }
}


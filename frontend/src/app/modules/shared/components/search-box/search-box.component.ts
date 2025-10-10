import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  onValueChange(newValue: string) {
    this.value = newValue;
    this.valueChange.emit(this.value);
  }

  clear() {
    this.value = '';
    this.valueChange.emit(this.value);
  }
}

import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appUiInput]',
  standalone: true,
})
export class UiInputDirective {
  @HostBinding('class')
  elementClass = 'ui-input';

  constructor() {}
}
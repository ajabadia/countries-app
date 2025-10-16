import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-flag-icon',
  templateUrl: './flag-icon.component.html',
  styleUrls: ['./flag-icon.component.scss']
})
export class FlagIconComponent {
  @Input() iso2: string = '';
  @Input() size: 'xs' | 's' | 'm' | 'l' | 'xl' | string = 'm';
  @Input() grayscale = false;

  get sizeClass(): string {
    const validSizes = ['xs','s','m','l','xl'];
    return validSizes.includes(this.size) ? `flag--${this.size}` : '';
  }
  get customSize(): string | null {
    const validSizes = ['xs','s','m','l','xl'];
    return validSizes.includes(this.size) ? null : this.size;
  }
}

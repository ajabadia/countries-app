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
  @Input() iconType: 'country' | 'language' | 'other' = 'country'; // NUEVO

  get sizeClass(): string {
    const validSizes = ['xs', 's', 'm', 'l', 'xl'];
    return validSizes.includes(this.size) ? `flag--${this.size}` : '';
  }

  get customSize(): string | null {
    const validSizes = ['xs', 's', 'm', 'l', 'xl'];
    return validSizes.includes(this.size) ? null : this.size;
  }

  get iconPath(): string {
    switch (this.iconType) {
      case 'language':
        // iconos de idiomas
        return `/assets/icons/flags/circle-flags/language/${this.iso2}.svg`;
      case 'country':
        // iconos de país
        return `/assets/icons/flags/circle-flags/${this.iso2}.svg`;
      default:
        // otros iconos (puedes ajustar la ruta según convenga)
        return `/assets/icons/flags/circle-flags/other/${this.iso2}.svg`;
    }
  }
onFlagError(event: Event) {
  const imgElem = event.target as HTMLImageElement;
  if (!imgElem.src.endsWith('UNK.svg')) {
    imgElem.src = '/assets/icons/flags/circle-flags/UNK.svg';
  }
}


}



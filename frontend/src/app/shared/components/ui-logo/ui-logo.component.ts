// File: d:\desarrollos\countries2\frontend\src\app\shared\components\ui-logo\ui-logo.component.ts | Last Modified: 2025-10-19

import {
  Component,
  Input,
  ChangeDetectionStrategy,
  HostBinding,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-logo.component.html',
  styleUrls: ['./ui-logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiLogoComponent {
  @Input({ alias: 'ui-logo-src' }) src = 'assets/images/Ibercaja-logo-2025.svg';
  @Input({ alias: 'ui-logo-alt' }) alt = 'Ibercaja Logo';
  @Input({ alias: 'ui-logo-width' }) width: string | number = 120;

  @HostBinding('style.width')
  get hostWidth(): string {
    return typeof this.width === 'number' ? `${this.width}px` : this.width;
  }
}

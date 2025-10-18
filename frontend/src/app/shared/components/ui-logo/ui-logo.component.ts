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
  @Input() src = 'assets/images/Ibercaja-logo-2025.svg';
  @Input() alt = 'Ibercaja Logo';
  @Input() width: string | number = 120;

  @HostBinding('style.width')
  get hostWidth(): string {
    return typeof this.width === 'number' ? `${this.width}px` : this.width;
  }
}
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiIconComponent } from '../ui-icon/ui-icon.component';
import { UiIconType } from 'src/app/services/icon.service';

@Component({
  selector: 'app-ui-heading',
  standalone: true,
  imports: [CommonModule, UiIconComponent],
  templateUrl: './ui-heading.component.html',
  styleUrls: ['./ui-heading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiHeadingComponent {
  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() icon?: string;
  @Input() iconType: UiIconType = 'system';

  /** Nivel semántico del encabezado (h1, h2, etc.) */
  @Input() level: 1 | 2 | 3 | 4 | 5 | 6 = 1;
}
// File: d:/desarrollos/countries2/frontend/src/app/shared/components/ui-toast/ui-toast.component.ts | Last Modified: 2025-10-20

import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toast } from '@app/types/toast.types';
import { UiIconComponent } from '../ui-icon/ui-icon.component';

@Component({
  selector: 'app-ui-toast',
  standalone: true,
  imports: [CommonModule, UiIconComponent],
  templateUrl: './ui-toast.component.html',
  styleUrls: ['./ui-toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiToastComponent {
  @Input({ required: true }) toast!: Toast;
  @Output() closed = new EventEmitter<void>();

  @HostBinding('class') get toastTypeClass() {
    return `ui-toast--${this.toast.type}`;
  }

  onClose(): void {
    this.closed.emit();
  }
}

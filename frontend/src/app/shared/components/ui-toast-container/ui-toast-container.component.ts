// File: d:/desarrollos/countries2/frontend/src/app/shared/components/ui-toast-container/ui-toast-container.component.ts | Last Modified: 2025-10-20

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '@core/services/toast.service';
import { UiToastComponent } from '../ui-toast/ui-toast.component';

@Component({
  selector: 'app-ui-toast-container',
  standalone: true,
  imports: [CommonModule, UiToastComponent],
  templateUrl: './ui-toast-container.component.html',
  styleUrls: ['./ui-toast-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiToastContainerComponent {
  toastService = inject(ToastService);
  toasts = this.toastService.toasts;
}

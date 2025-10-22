// File: d:/desarrollos/countries2/frontend/src/app/core/services/toast.service.ts | Last Modified: 2025-10-20

import { Injectable, signal } from '@angular/core';
import { Toast, ToastType } from '@core/types/toast.types';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts = signal<Toast[]>([]);
  private lastId = 0;

  private readonly ICONS: Record<ToastType, string> = {
    success: 'success',
    error: 'error',
    info: 'info',
    warning: 'warning',
  };

  show(type: ToastType, message: string, duration = 5000): void {
    const newToast: Toast = {
      id: ++this.lastId,
      type,
      message,
      duration,
      icon: this.ICONS[type],
    };

    this.toasts.update(toasts => [...toasts, newToast]);

    if (duration > 0) {
      setTimeout(() => this.remove(newToast.id), duration);
    }
  }

  showSuccess(message: string, duration = 5000): void {
    this.show('success', message, duration);
  }

  showError(message: string, duration = 7000): void {
    this.show('error', message, duration);
  }

  showInfo(message: string, duration = 5000): void {
    this.show('info', message, duration);
  }

  showWarning(message: string, duration = 6000): void {
    this.show('warning', message, duration);
  }

  remove(id: number): void {
    this.toasts.update(toasts => toasts.filter(toast => toast.id !== id));
  }
}

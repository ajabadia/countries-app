// File: d:/desarrollos/countries2/frontend/src/app/shared/types/toast.types.ts | Last Modified: 2025-10-20

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
  duration?: number;
  icon: string;
}

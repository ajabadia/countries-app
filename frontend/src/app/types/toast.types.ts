// File: d:\desarrollos\countries2\frontend\src\app\core\types\toast.types.ts | New File

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
  duration?: number;
  icon: string;
}
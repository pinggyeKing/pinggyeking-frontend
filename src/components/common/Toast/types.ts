export interface ToastData {
  id: string;
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number; // ms, 기본값 3000
  icon?: React.ReactNode;
}

export interface ToastProps {
  toast: ToastData;
  onRemove: (id: string) => void;
}

export interface ToastContextType {
  toasts: ToastData[];
  addToast: (toast: Omit<ToastData, "id">) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

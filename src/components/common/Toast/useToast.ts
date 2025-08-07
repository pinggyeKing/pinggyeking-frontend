import { useToastContext } from "./ToastContext";
import { ToastData } from "./types";

export const useToast = () => {
  const { addToast, removeToast, clearAllToasts } = useToastContext();

  const showToast = (
    message: string,
    options?: Omit<ToastData, "id" | "message">,
  ) => {
    addToast({
      message,
      ...options,
    });
  };

  const showSuccessToast = (
    message: string = "이미지가 저장되었어요!",
    options?: Omit<ToastData, "id" | "message" | "type">,
  ) => {
    addToast({
      message,
      type: "success",
      ...options,
    });
  };

  const showErrorToast = (
    message: string,
    options?: Omit<ToastData, "id" | "message" | "type">,
  ) => {
    addToast({
      message,
      type: "error",
      ...options,
    });
  };

  const showWarningToast = (
    message: string,
    options?: Omit<ToastData, "id" | "message" | "type">,
  ) => {
    addToast({
      message,
      type: "warning",
      ...options,
    });
  };

  const showInfoToast = (
    message: string,
    options?: Omit<ToastData, "id" | "message" | "type">,
  ) => {
    addToast({
      message,
      type: "info",
      ...options,
    });
  };

  return {
    showToast,
    showSuccessToast,
    showErrorToast,
    showWarningToast,
    showInfoToast,
    removeToast,
    clearAllToasts,
  };
};

"use client";

import React from "react";
import { useToastContext } from "./ToastContext";
import Toast from "./Toast";

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastContext();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div
      className="fixed left-1/2 transform -translate-x-1/2 z-50 space-y-2"
      style={{ top: "30vh" }}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;

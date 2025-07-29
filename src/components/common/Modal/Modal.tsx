"use client";

import React, { useEffect } from "react";
import clsx from "clsx";
import { ModalProps } from "./types";
import CustomButton from "../../Custombutton";

const MODAL_SIZES = {
  large: { width: 440, minHeight: 490 },
  medium: { width: 400, minHeight: 552 },
  small: { width: 360, minHeight: 400 },
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = "medium",
  applyText = "적용",
  onApply,
  onCancel,
  children,
  showFooter = true,
  closeOnOverlayClick = true,
}) => {
  const modalSize = MODAL_SIZES[size];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const handleApply = () => {
    onApply?.();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
      onClick={handleOverlayClick}
    >
      <div
        className={clsx(
          "bg-white rounded-3xl shadow-lg flex flex-col",
          "animate-in fade-in-0 zoom-in-95 duration-200",
        )}
        style={{
          width: `${modalSize.width}px`,
          minHeight: `${modalSize.minHeight}px`,
          maxHeight: "90vh",
        }}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="닫기"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">{children}</div>

        {/* Footer */}
        {showFooter && (
          <div className="flex gap-3 p-6 pt-4 border-t border-gray-100">
            <CustomButton
              onClick={handleCancel}
              typeStyle="outline1"
              className="flex-1"
            >
              취소
            </CustomButton>
            <CustomButton
              onClick={handleApply}
              typeStyle="primary"
              className="flex-1"
            >
              {applyText}
            </CustomButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

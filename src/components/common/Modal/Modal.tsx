"use client";

import React from "react";
import CustomButton from "../../Custombutton";

// 1. props, size, 스타일 상수 정리
interface ModalProps {
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string; // 적용 버튼 텍스트 (기본값: "적용")
  size?: "large" | "medium";
  children: React.ReactNode;
  showCloseButton?: boolean;
  showBottomButton?: boolean;
}

const MODAL_SIZES = {
  large: { width: 440, minHeight: 490 },
  medium: { width: 400, minHeight: 552 },
};

export default function Modal({
  open,
  onClose,
  onCancel,
  onConfirm,
  confirmText = "적용",
  size = "large",
  children,
  showCloseButton = true,
  showBottomButton = true,
}: ModalProps) {
  if (!open) return null;
  const { width, minHeight } = MODAL_SIZES[size];
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          width,
          minHeight,
          borderRadius: 24,
          boxShadow: "1px 4px 16px 0px rgba(0,0,0,0.08)",
          background: "#fff",
          padding: "32px 32px 36px 32px", // 피그마 기준 여백
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {/* <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            minHeight: 32,
            marginBottom: 16,
          }}
        > */}
        {showCloseButton && (
          <CustomButton
            typeStyle="ghost"
            size="xsmall"
            round="square"
            leftIcon={
              <img src="/icons/close.svg" alt="close" width={20} height={20} />
            }
            aria-label="닫기"
            onClick={onClose}
            children={""}
          />
        )}
        {/* </div> */}
        {/* Contents */}
        <div style={{ flex: 1 }}>{children}</div>
        {/* Footer */}
        {showBottomButton && (
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 32,
            }}
          >
            <CustomButton typeStyle="outline1" size="medium" onClick={onCancel}>
              취소
            </CustomButton>
            <CustomButton typeStyle="primary" size="medium" onClick={onConfirm}>
              {confirmText}
            </CustomButton>
          </div>
        )}
      </div>
    </div>
  );
}

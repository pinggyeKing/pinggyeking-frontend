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
  size?: "large" | "medium" | "small";
  children: React.ReactNode;
  showCloseButton?: boolean;
  showBottomButton?: boolean;
}

const MODAL_SIZES = {
  large: { width: 440, minHeight: 490 },
  medium: { width: 400, minHeight: 552 },
  small: { width: 327, minHeight: 332 },
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
          padding: "24px 20px 24px 20px", // 피그마 기준 여백
          display: "flex",
          flexDirection: "column",
          position: "relative",
          gap: 36,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {showCloseButton && (
          <div className="w-full h-[36px] flex justify-end items-center">
            <div className="w-[44px] flex justify-end">
              <CustomButton
                size="medium"
                round="pills"
                aria-label="닫기"
                onClick={onClose}
                children={"X"}
              />
            </div>
          </div>
        )}

        {/* Contents */}
        <div style={{ flex: 1 }}>{children}</div>

        {/* Footer */}
        {showBottomButton && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 6,
            }}
          >
            {/* 확인 버튼 - filled 스타일 (파란색 계열) */}
            <div className="w-full h-[48px]">
              <CustomButton
                children={confirmText}
                round="pills"
                onClick={onConfirm}
                style={{ whiteSpace: "nowrap" }}
              />
            </div>
            {/* 취소 버튼 - outlined 스타일 (회색 계열) */}
            <div className="w-full h-[48px]">
              <CustomButton
                children="취소"
                round="pills"
                typeStyle="outline2"
                onClick={onCancel}
                style={{ whiteSpace: "nowrap" }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

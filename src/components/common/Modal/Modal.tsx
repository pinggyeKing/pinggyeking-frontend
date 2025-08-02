"use client";

import React from "react";
import CustomButton from "../../Custombutton";
import ButtonFilledIcon from "@/components/icons/ButtonFilledIcon";
import ButtonOutlinedIcon from "@/components/icons/ButtonOutlinedIcon";

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

        {/* Contents */}
        <div style={{ flex: 1 }}>{children}</div>

        {/* Footer */}
        {showBottomButton && (
          <div
            style={{
              display: "flex",
              gap: 12,
            }}
          >
            {/* 확인 버튼 - filled 스타일 (파란색 계열) */}
            <ButtonFilledIcon
              width={174}
              text={confirmText}
              fill="#3B82F6"
              onClick={onConfirm}
              className="transition-opacity hover:opacity-80"
            />
            {/* 취소 버튼 - outlined 스타일 (회색 계열) */}
            <ButtonOutlinedIcon
              width={174}
              text="취소"
              onClick={onCancel}
              className="transition-opacity hover:opacity-80"
            />
          </div>
        )}
      </div>
    </div>
  );
}

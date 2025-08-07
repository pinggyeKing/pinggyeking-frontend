"use client";

import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
import clsx from "clsx";
import { ToastProps } from "./types";

const Toast: React.FC<ToastProps> = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // 마운트 시 애니메이션 시작
    setIsVisible(true);

    // 자동 제거 타이머
    const timer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(() => {
        onRemove(toast.id);
      }, 300); // 애니메이션 시간
    }, toast.duration || 3000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  return (
    <div
      className={clsx(
        "flex items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ease-in-out",
        "backdrop-blur-sm",
        "transform",
        {
          "translate-y-0 opacity-100": isVisible && !isLeaving,
          "translate-y-2 opacity-0": !isVisible || isLeaving,
        },
      )}
      style={{
        width: "308px",
        padding: "8px 12px",
        backgroundColor: "rgba(31, 31, 31, 0.5)", // UIColor(red: 0.12, green: 0.12, blue: 0.12, alpha: 0.5)
      }}
    >
      {/* Message Container */}
      <div className="flex items-center flex-1 gap-1">
        {/* Icon */}
        <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
          {toast.icon || <Check size={20} className="text-white" />}
        </div>

        {/* Message Text */}
        <span
          className="text-white font-semibold leading-5"
          style={{
            fontSize: "16px",
            fontFamily: "Pretendard, sans-serif",
            fontWeight: 600,
            width: "182px",
          }}
        >
          {toast.message}
        </span>
      </div>
    </div>
  );
};

export default Toast;

"use client";

import React, { useState } from "react";
import {
  copyCustomLink,
  copyCurrentUrl,
  copyResultLink,
} from "@/app/result/create-image/utils";

interface CopyLinkButtonProps {
  // 복사할 링크 (파라미터로 받음)
  link?: string;
  // 복사 타입
  type?: "custom" | "current" | "result";
  // 결과 ID (type이 'result'일 때 사용)
  resultId?: string;
  // 베이스 URL (type이 'result'일 때 사용)
  baseUrl?: string;
  // 메시지 커스터마이징
  successMessage?: string;
  errorMessage?: string;
  // 버튼 스타일
  className?: string;
  children?: React.ReactNode;
  // 복사 후 콜백
  onCopySuccess?: () => void;
  onCopyError?: () => void;
}

const CopyLinkButton: React.FC<CopyLinkButtonProps> = ({
  link,
  type = "custom",
  resultId,
  baseUrl,
  successMessage,
  errorMessage,
  className = "",
  children,
  onCopySuccess,
  onCopyError,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [justCopied, setJustCopied] = useState(false);

  const handleCopyLink = async () => {
    setIsLoading(true);

    try {
      let success = false;

      switch (type) {
        case "custom":
          if (!link) {
            console.error("custom 타입일 때는 link prop이 필요합니다.");
            setIsLoading(false);
            return;
          }
          success = await copyCustomLink(link, successMessage, errorMessage);
          break;

        case "current":
          success = await copyCurrentUrl(successMessage, errorMessage);
          break;

        case "result":
          success = await copyResultLink(
            resultId,
            baseUrl,
            successMessage,
            errorMessage,
          );
          break;

        default:
          console.error("지원하지 않는 복사 타입입니다.");
          setIsLoading(false);
          return;
      }

      if (success) {
        setJustCopied(true);
        onCopySuccess?.();

        // 2초 후 상태 초기화
        setTimeout(() => {
          setJustCopied(false);
        }, 2000);
      } else {
        onCopyError?.();
      }
    } catch (error) {
      console.error("링크 복사 중 오류:", error);
      onCopyError?.();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCopyLink}
      disabled={isLoading}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
        justCopied
          ? "bg-green-500 text-white"
          : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900"
      } ${isLoading ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {/* 아이콘 */}
      <svg
        className={`w-4 h-4 transition-transform ${
          justCopied ? "scale-110" : ""
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {justCopied ? (
          // 체크 아이콘
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        ) : (
          // 복사 아이콘
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        )}
      </svg>

      {/* 버튼 텍스트 */}
      {isLoading
        ? "복사 중..."
        : justCopied
        ? "복사됨!"
        : children || "링크 복사"}
    </button>
  );
};

export default CopyLinkButton;

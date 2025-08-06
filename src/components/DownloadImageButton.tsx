"use client";

import React, { useState } from "react";
import {
  downloadImage,
  downloadCanvasAsJPG,
  downloadElementAsJPG,
} from "@/app/result/create-image/utils";

interface DownloadImageButtonProps {
  // 다운로드 타입
  type: "url" | "canvas" | "element";
  // URL 다운로드일 때 필요한 props
  imageUrl?: string;
  // Canvas 다운로드일 때 필요한 props
  canvasRef?: React.RefObject<HTMLCanvasElement | null>;
  // Element 다운로드일 때 필요한 props
  elementRef?: React.RefObject<HTMLElement | null>;
  // 파일명
  fileName?: string;
  // 메시지 커스터마이징
  successMessage?: string;
  errorMessage?: string;
  // 버튼 스타일
  className?: string;
  children?: React.ReactNode;
  // 다운로드 후 콜백
  onDownloadSuccess?: () => void;
  onDownloadError?: () => void;
}

const DownloadImageButton: React.FC<DownloadImageButtonProps> = ({
  type,
  imageUrl,
  canvasRef,
  elementRef,
  fileName = "image.jpg",
  successMessage = "이미지가 저장되었어요!",
  errorMessage = "이미지 저장에 실패했습니다.",
  className = "",
  children,
  onDownloadSuccess,
  onDownloadError,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);

    try {
      let success = false;

      switch (type) {
        case "url":
          if (!imageUrl) {
            console.error("url 타입일 때는 imageUrl prop이 필요합니다.");
            setIsLoading(false);
            return;
          }
          success = await downloadImage(
            imageUrl,
            fileName,
            successMessage,
            errorMessage,
          );
          break;

        case "canvas":
          if (!canvasRef?.current) {
            console.error("canvas 타입일 때는 canvasRef prop이 필요합니다.");
            setIsLoading(false);
            return;
          }
          success = await downloadCanvasAsJPG(
            canvasRef.current,
            fileName,
            successMessage,
            errorMessage,
          );
          break;

        case "element":
          if (!elementRef?.current) {
            console.error("element 타입일 때는 elementRef prop이 필요합니다.");
            setIsLoading(false);
            return;
          }
          success = await downloadElementAsJPG(
            elementRef.current,
            fileName,
            successMessage,
            errorMessage,
          );
          break;

        default:
          console.error("지원하지 않는 다운로드 타입입니다.");
          setIsLoading(false);
          return;
      }

      if (success) {
        onDownloadSuccess?.();
      } else {
        onDownloadError?.();
      }
    } catch (error) {
      console.error("이미지 다운로드 중 오류:", error);
      onDownloadError?.();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
        isLoading
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600 text-white"
      } ${className}`}
    >
      {/* 아이콘 */}
      <svg
        className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isLoading ? (
          // 로딩 아이콘
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        ) : (
          // 다운로드 아이콘
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        )}
      </svg>

      {/* 버튼 텍스트 */}
      {isLoading ? "저장 중..." : children || "이미지 저장"}
    </button>
  );
};

export default DownloadImageButton;

"use client";

import React from "react";
import {
  shareImageResult,
  shareTextResult,
} from "@/app/result/create-image/utils";

interface ShareKakaoButtonProps {
  // 공유할 컨텐츠 타입
  type: "image" | "text";
  // 이미지 공유일 때 필요한 props
  imageUrl?: string;
  resultTitle?: string;
  resultDescription?: string;
  // 텍스트 공유일 때 필요한 props
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  // 버튼 스타일
  className?: string;
  children?: React.ReactNode;
}

const ShareKakaoButton: React.FC<ShareKakaoButtonProps> = ({
  type,
  imageUrl,
  resultTitle,
  resultDescription,
  title,
  description,
  thumbnailUrl,
  className = "",
  children,
}) => {
  const handleKakaoShare = async () => {
    try {
      let success = false;

      if (type === "image" && imageUrl) {
        success = await shareImageResult(
          imageUrl,
          resultTitle,
          resultDescription,
        );
      } else if (type === "text" && title && description) {
        success = await shareTextResult(title, description, thumbnailUrl);
      } else {
        console.error("공유에 필요한 정보가 부족합니다.");
        return;
      }

      if (success) {
        console.log("카카오톡 공유가 성공적으로 실행되었습니다.");
      } else {
        alert(
          "카카오톡 공유 중 오류가 발생했습니다.\n카카오톡이 설치되어 있는지 확인해주세요.",
        );
      }
    } catch (error) {
      console.error("카카오톡 공유 중 오류:", error);
      alert("카카오톡 공유 중 오류가 발생했습니다.");
    }
  };

  return (
    <button
      onClick={handleKakaoShare}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-medium transition-colors ${className}`}
    >
      {/* 카카오톡 아이콘 */}
      <img src="/icons/kakaotalk.svg" alt="카카오톡" className="w-5 h-5" />
      {children || "카카오톡 공유"}
    </button>
  );
};

export default ShareKakaoButton;

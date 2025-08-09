"use client";

import React from "react";
import { copyCurrentUrl, shareToKakao } from "@/app/result/utils";
import { downloadCanvasCardAsJPG } from "@/app/result/utils/canvasUtils";
import { useToast } from "@/components/common/Toast";

interface CanvasCardRef {
  getCanvasAsBlob: (type?: string, quality?: number) => Promise<Blob | null>;
  getCanvasAsDataURL: (type?: string, quality?: number) => string;
}

interface ActionButtonsProps {
  cardRef: React.RefObject<HTMLDivElement | null>;
  excuseData?: {
    excuse: {
      situation: string;
      target: string;
      tone: string;
      excuse: string;
    };
  };
}

export default function ActionButtons({
  cardRef,
  excuseData,
}: ActionButtonsProps) {
  const { showSuccessToast } = useToast();

  const handleKakaoShare = () => {
    const title = excuseData
      ? `${excuseData.excuse.target}에게 핑계 카드`
      : "탬플릿을 선택해주세요";
    const description = excuseData
      ? excuseData.excuse.excuse.substring(0, 100) + "..."
      : "아래 생성된 핑계를 확인해주세요";

    shareToKakao({
      title,
      description,
      imageUrl: "/cards/kakao-share-image.png",
      linkUrl: window.location.href,
    });
  };

  const handleCopyLink = async () => {
    const success = await copyCurrentUrl("", ""); // 빈 메시지로 alert 방지
    if (success) {
      showSuccessToast("링크가 복사되었어요!");
    }
  };

  const handleDownload = () => {
    if (cardRef.current) {
      downloadCanvasCardAsJPG(cardRef.current as any as CanvasCardRef);
      showSuccessToast("이미지가 저장되었어요!");
    }
  };

  return (
    <div className="flex gap-3 px-1 w-full">
      {/* KakaoTalk Share Button */}
      <button
        className="flex-1 border-2 border-grey-10 rounded-[24px] py-3 flex justify-center items-center bg-white hover:bg-grey-1 transition-colors"
        onClick={handleKakaoShare}
      >
        <img
          src="/icons/kakao-talk-share.svg"
          alt="KakaoTalk"
          className="w-6 h-6"
        />
      </button>

      {/* Copy Link Button */}
      <button
        className="flex-1 border-2 border-grey-10 rounded-[24px] py-3 flex justify-center items-center bg-white hover:bg-grey-1 transition-colors"
        onClick={handleCopyLink}
      >
        <img src="/icons/li-link.svg" alt="Link" className="w-6 h-6" />
      </button>

      {/* Download Button */}
      <button
        className="flex-1 bg-grey-10 border-[1.5px] border-grey-10 text-white rounded-[24px] py-3 flex justify-center items-center hover:bg-grey-9 transition-colors"
        onClick={handleDownload}
      >
        <img src="/icons/li-download.svg" alt="Download" className="w-6 h-6" />
      </button>
    </div>
  );
}

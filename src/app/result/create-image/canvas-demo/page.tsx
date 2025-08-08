"use client";

import React, { useRef, useState } from "react";
import CanvasCard from "../../card-image/components/CanvasCard";
import { Carousel } from "../components";
import FigmaButton from "@/components/FigmaButton";
import { downloadCanvasCardAsJPG } from "../utils/canvasUtils";
import { copyCurrentUrl, shareToKakao } from "../utils";
import { ToastContainer, useToast } from "@/components/common/Toast";

export default function CanvasDemoPage() {
  const [selectedCardType, setSelectedCardType] = useState<
    "default" | "formal" | "cute" | "humorous" | "pop"
  >("default");
  const [cardScale, setCardScale] = useState<number>(0.65);
  const canvasCardRef = useRef<any>(null);
  const { showSuccessToast } = useToast();

  const handleSelectionChange = (selectedId: string) => {
    console.log("Selected character style:", selectedId);
    setSelectedCardType(
      selectedId as "default" | "formal" | "cute" | "humorous" | "pop",
    );
  };

  const handleBackClick = () => {
    console.log("Back button clicked");
  };

  const handleDownload = async () => {
    if (canvasCardRef.current) {
      const success = await downloadCanvasCardAsJPG(
        canvasCardRef.current,
        "부장님",
        selectedCardType,
      );
      if (success) {
        showSuccessToast("Canvas 이미지가 저장되었어요!");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center min-h-full w-full">
        {/* Header Section */}
        <div className="flex flex-col gap-4 mb-5 w-full">
          {/* Back Button */}
          <div className="flex justify-end">
            <FigmaButton
              variant="primary"
              round="pills"
              size={1.0}
              active={false}
              disabled={false}
              onClick={handleBackClick}
            >
              이전으로
            </FigmaButton>
          </div>
          {/* Title Area */}
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-section-title text-grey-10 uppercase">
              Canvas 카드 데모
            </h1>
            <p className="text-sm text-grey-7">
              Canvas 기반으로 구현된 카드를 확인해보세요
            </p>
          </div>
        </div>

        {/* Card Style Selection */}
        <Carousel
          onSelectionChange={handleSelectionChange}
          initialSelected={selectedCardType}
        />

        {/* Canvas Card Preview */}
        <div className="mb-5 flex justify-center w-full">
          <div className="transform origin-center max-w-full overflow-hidden">
            <CanvasCard
              ref={canvasCardRef}
              recipient="부장님"
              message={`부장님, 정말 죄송합니다만....내일 회식에 참석하지 못할 것 같습니다... 


이유,,,, 

,,,,`}
              cardType={selectedCardType}
              scale={cardScale}
            />
          </div>
        </div>

        {/* Scale Control */}
        <div className="mb-5 w-full max-w-md">
          <label className="block text-sm font-medium text-grey-10 mb-2">
            카드 크기: {(cardScale * 100).toFixed(0)}%
          </label>
          <input
            type="range"
            min="0.3"
            max="1.5"
            step="0.05"
            value={cardScale}
            onChange={(e) => setCardScale(parseFloat(e.target.value))}
            className="w-full h-2 bg-grey-3 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 px-1 w-full">
          <button
            className="flex-1 border-2 border-grey-10 rounded-[24px] py-3 flex justify-center items-center bg-white hover:bg-grey-1 transition-colors"
            onClick={() => {
              shareToKakao({
                title: "Canvas 카드 데모",
                description: "Canvas로 생성된 핑계 카드를 확인해주세요",
                imageUrl: "/cards/kakao-share-image.png",
                linkUrl: window.location.href,
              });
            }}
          >
            <img
              src="/icons/kakao-talk-share.svg"
              alt="KakaoTalk"
              className="w-6 h-6"
            />
          </button>
          <button
            className="flex-1 border-2 border-grey-10 rounded-[24px] py-3 flex justify-center items-center bg-white hover:bg-grey-1 transition-colors"
            onClick={async () => {
              const success = await copyCurrentUrl("", "");
              if (success) {
                showSuccessToast("링크가 복사되었어요!");
              }
            }}
          >
            <img src="/icons/li-link.svg" alt="Link" className="w-6 h-6" />
          </button>
          <button
            className="flex-1 bg-grey-10 border-[1.5px] border-grey-10 text-white rounded-[24px] py-3 flex justify-center items-center hover:bg-grey-9 transition-colors"
            onClick={handleDownload}
          >
            <img
              src="/icons/li-download.svg"
              alt="Download"
              className="w-6 h-6"
            />
          </button>
        </div>

        {/* Comparison Notes */}
        <div className="mt-8 p-4 bg-grey-1 rounded-lg w-full max-w-md">
          <h3 className="font-medium text-grey-10 mb-2">Canvas 방식의 장점:</h3>
          <ul className="text-sm text-grey-8 space-y-1">
            <li>• 정확한 비율 기반 레이아웃</li>
            <li>• 고품질 이미지 렌더링</li>
            <li>• 단순한 스케일링 로직</li>
            <li>• html2canvas 없이 직접 다운로드</li>
            <li>• 모든 디바이스에서 일관된 결과</li>
          </ul>
        </div>
      </div>
    </>
  );
}

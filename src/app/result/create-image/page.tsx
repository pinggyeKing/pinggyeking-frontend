"use client";

import React, { useRef, useState, useEffect } from "react";
import Card from "../card-image/components/Card";
import { Carousel } from "./components";
import FigmaButton from "@/components/FigmaButton";
import { copyCurrentUrl, downloadCardByRef, shareToKakao } from "./utils";
import { Toast, ToastContainer, useToast } from "@/components/common/Toast";

export default function Page() {
  const [selectedCardType, setSelectedCardType] = useState<
    "default" | "formal" | "cute" | "humorous" | "pop"
  >("default");
  const [cardScale, setCardScale] = useState<number>(0.65);
  const cardRef = useRef<HTMLDivElement>(null);
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

  // 화면 너비에 따른 카드 스케일 조정 (데스크탑: 0.65, 모바일: 0.82)
  useEffect(() => {
    const updateCardScale = () => {
      const windowWidth = window.innerWidth;
      // Tailwind의 md 브레이크포인트는 768px
      setCardScale(windowWidth >= 768 ? 0.65 : 0.82);
    };

    // 초기 스케일 설정
    updateCardScale();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener("resize", updateCardScale);

    // 클린업
    return () => {
      window.removeEventListener("resize", updateCardScale);
    };
  }, []);

  const getCharacterImage = (type: string) => {
    switch (type) {
      case "default":
        return "/characters/card-style-default.svg";
      case "formal":
        return "/characters/card-style-formal.svg";
      case "cute":
        return "/characters/card-style-cute.svg";
      case "humorous":
        return "/characters/card-style-humorous.svg";
      case "pop":
        return "/characters/card-style-pop.svg";
      default:
        return "/characters/card-style-default.svg";
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center min-h-full w-[375px]">
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
              탬플릿을 선택해주세요
            </h1>
          </div>
        </div>

        {/* Card Style Selection */}
        {/* Original Carousel */}
        <Carousel
          onSelectionChange={handleSelectionChange}
          initialSelected={selectedCardType}
        />

        {/* Card Preview */}
        <div className="mb-5 flex justify-center">
          <div className="transform origin-center">
            <Card
              ref={cardRef}
              recipient="부장님"
              message={`부장님, 정말 죄송합니다만....내일 회식에 참석하지 못할 것 같습니다... 


이유,,,, 

,,,,`}
              cardType={selectedCardType}
              scale={cardScale}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 px-1 w-full">
          <button
            className="flex-1 border-2 border-grey-10 rounded-[24px] py-3 flex justify-center items-center bg-white hover:bg-grey-1 transition-colors"
            onClick={() => {
              shareToKakao({
                title: "탬플릿을 선택해주세요",
                description: "아래 생성된 핑계를 확인해주세요",
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
            onClick={() => {
              copyCurrentUrl();
            }}
          >
            <img src="/icons/li-link.svg" alt="Link" className="w-6 h-6" />
          </button>
          <button
            className="flex-1 bg-grey-10 border-[1.5px] border-grey-10 text-white rounded-[24px] py-3 flex justify-center items-center hover:bg-grey-9 transition-colors"
            onClick={() => {
              downloadCardByRef(cardRef);
              showSuccessToast("이미지가 저장되었어요!");
            }}
          >
            <img
              src="/icons/li-download.svg"
              alt="Download"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </>
  );
}

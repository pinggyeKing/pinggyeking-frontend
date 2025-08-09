"use client";

import React, { useRef, useState, useEffect } from "react";
import { Carousel, ActionButtons } from "./components";
import FigmaButton from "@/components/FigmaButton";
import { ToastContainer } from "@/components/common/Toast";
import CanvasCard from "../card-image/components/CanvasCard";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [selectedCardType, setSelectedCardType] = useState<
    "default" | "formal" | "cute" | "humorous" | "pop"
  >("default");
  const [cardScale, setCardScale] = useState<number>(0.65);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSelectionChange = (selectedId: string) => {
    console.log("Selected character style:", selectedId);
    setSelectedCardType(
      selectedId as "default" | "formal" | "cute" | "humorous" | "pop",
    );
  };

  const handleBackClick = () => {
    console.log("Back button clicked");
    router.back();
  };

  // 화면 너비에 따른 카드 스케일 조정 - 부모 영역을 넘치지 않도록 계산
  useEffect(() => {
    const updateCardScale = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // 카드의 실제 크기 (444 x 494)
      const cardWidth = 444;
      const cardHeight = 494;

      // 패딩과 여백을 고려한 사용 가능한 공간 계산
      const availableWidth = windowWidth - 32; // px-4 (16px * 2)
      const availableHeight = windowHeight * 0.6; // 화면 높이의 60% 정도 사용

      // 너비와 높이 기준으로 스케일 계산
      const scaleByWidth = availableWidth / cardWidth;
      const scaleByHeight = availableHeight / cardHeight;

      // 더 작은 스케일을 선택하여 넘치지 않도록 함
      const calculatedScale = Math.min(scaleByWidth, scaleByHeight, 1); // 최대 1배

      // 최소 스케일 제한 (너무 작아지지 않도록)
      const finalScale = Math.max(calculatedScale, 0.3);

      setCardScale(finalScale);
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
        <div className="mb-5 flex justify-center w-full">
          <div className="transform origin-center max-w-full overflow-hidden">
            <CanvasCard
              ref={cardRef}
              recipient="부장님"
              message={`부장님, 정말 죄송합니다만....내일 회식에 참석하지 못할 것 같습니다... 


이유,,,, 

,,,,`}
              cardType={selectedCardType}
              scale={0.65}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <ActionButtons cardRef={cardRef} />
      </div>
    </>
  );
}

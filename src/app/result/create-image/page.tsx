"use client";

import { useState } from "react";
import { Carousel } from "./components";
import Card from "../card-image/components/Card";

export default function Page() {
  const [selectedCardType, setSelectedCardType] = useState<
    "default" | "formal" | "cute" | "humorous" | "pop"
  >("default");

  const handleSelectionChange = (selectedId: string) => {
    console.log("Selected character style:", selectedId);
    setSelectedCardType(
      selectedId as "default" | "formal" | "cute" | "humorous" | "pop",
    );
  };

  return (
    <div className="min-h-screen bg-grey-1 p-5">
      <div className="max-w-[400px] mx-auto bg-white rounded-24 border-2 border-grey-6 p-5 pb-10">
        {/* Header Section */}
        <div className="flex flex-col gap-2 mb-2">
          {/* Back Button */}
          <div className="flex justify-center">
            <button className="bg-grey-10 text-white px-3 py-2 rounded-20 text-body1-medium shadow-main">
              이전으로
            </button>
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-section-title text-grey-10">
              탬플릿을 선택해주세요
            </h1>
            <p className="text-body2 text-grey-8 mt-1">
              아래 생성된 핑계를 확인해주세요
            </p>
          </div>
        </div>

        {/* Card Style Selection */}
        <div className="mb-9">
          <Carousel
            onSelectionChange={handleSelectionChange}
            initialSelected="default"
          />
        </div>

        {/* Card Preview */}
        <div className="mb-9 flex justify-center">
          <Card
            recipient="부장님"
            message={`부장님, 정말 죄송합니다만....내일 회식에 참석하지 못할 것 같습니다... 


이유,,,, 

,,,,`}
            cardType={selectedCardType}
            size="small"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-8 px-5">
          {/* KakaoTalk Button */}
          <button className="flex-1 border-2 border-grey-10 rounded-24 py-3 flex justify-center items-center">
            <img
              src="/icons/kakaotalk.svg"
              alt="KakaoTalk"
              className="w-6 h-6"
            />
          </button>

          {/* Link Button */}
          <button className="flex-1 border-2 border-grey-10 rounded-24 py-3 flex justify-center items-center">
            <img src="/icons/link.svg" alt="Link" className="w-6 h-6" />
          </button>

          {/* Download Button */}
          <button className="flex-1 bg-grey-10 text-white rounded-24 py-3 flex justify-center items-center">
            <img src="/icons/download.svg" alt="Download" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

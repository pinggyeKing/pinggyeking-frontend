"use client";

import React, { useState } from "react";
import Card from "../card-image/components/Card";
import ButtonFilledIcon from "@/components/icons/ButtonFilledIcon";
import { Carousel } from "./components";

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

  const handleBackClick = () => {
    console.log("Back button clicked");
  };

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
    <div className="min-h-screen bg-grey-1 p-4">
      <div className="max-w-[400px] mx-auto bg-white rounded-6 border-2 border-grey-7 p-4 pb-6 shadow-[1px_4px_16px_0px_rgba(0,0,0,0.08)]">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 mb-5">
          {/* Back Button */}
          <div className="flex justify-center gap-[6px]">
            {/* <ButtonFilledIcon
              width={84}
              text="이전으로"
              fill="#1E1E1E"
              onClick={handleBackClick}
              className="shadow-[1px_4px_16px_0px_rgba(0,0,0,0.08)]"
            /> */}
          </div>

          {/* Title Area */}
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-section-title text-grey-10 uppercase">
              탬플릿을 선택해주세요
            </h1>
            <p className="text-body3-medium text-grey-7">
              아래 생성된 핑계를 확인해주세요
            </p>
          </div>
        </div>

        {/* Card Style Selection */}
        {/* Original Carousel */}
        <Carousel />

        {/* Card Preview */}
        <div className="mb-5 flex justify-center">
          <div className="transform scale-[0.82] origin-center">
            <Card
              recipient="부장님"
              message={`부장님, 정말 죄송합니다만....내일 회식에 참석하지 못할 것 같습니다... 


이유,,,, 

,,,,`}
              cardType={selectedCardType}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 px-1">
          <button className="flex-1 border-2 border-grey-10 rounded-[24px] py-3 flex justify-center items-center bg-white hover:bg-grey-1 transition-colors">
            <img
              src="/icons/kakao-talk.svg"
              alt="KakaoTalk"
              className="w-6 h-6"
            />
          </button>
          <button className="flex-1 border-2 border-grey-10 rounded-[24px] py-3 flex justify-center items-center bg-white hover:bg-grey-1 transition-colors">
            <img src="/icons/link.svg" alt="Link" className="w-6 h-6" />
          </button>
          <button className="flex-1 bg-grey-10 border-[1.5px] border-grey-10 text-white rounded-[24px] py-3 flex justify-center items-center hover:bg-grey-9 transition-colors">
            <img src="/icons/download.svg" alt="Download" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

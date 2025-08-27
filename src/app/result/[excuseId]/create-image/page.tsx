"use client";

import React, { useRef, useState, useEffect, use } from "react";
import { Carousel, ActionButtons } from "../../components";
import FigmaButton from "@/components/FigmaButton";
import { ToastContainer } from "@/components/common/Toast";
import CanvasCard from "../../card-image/components/CanvasCard";
import { useRouter } from "next/navigation";
import { useExcuseDetail } from "@/app/share/api";
import LottieLoading from "@/components/LottieLoading";
import Link from "next/link";
import Image from "next/image";

interface CreateImagePageProps {
  params: Promise<{
    excuseId: string;
  }>;
}

export default function CreateImagePage({ params }: CreateImagePageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [selectedCardType, setSelectedCardType] = useState<
    "default" | "formal" | "cute" | "humorous" | "pop"
  >("default");
  const cardScale = 286 / 444; // CanvasCard base width is 444px → fixed rendered width 286px
  const cardRef = useRef<HTMLDivElement>(null);

  // API 호출
  const {
    data: excuseData,
    isLoading,
    error,
  } = useExcuseDetail(resolvedParams.excuseId);

  const handleSelectionChange = (selectedId: string) => {
    console.log("Selected character style:", selectedId);
    setSelectedCardType(
      selectedId as "default" | "formal" | "cute" | "humorous" | "pop"
    );
  };

  const handleBackClick = () => {
    console.log("Back button clicked");
    // Dynamic route로 이동
    router.push(`/result/${resolvedParams.excuseId}`);
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LottieLoading text="핑계를 불러오는 중이에요!" />
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-lg text-gray-600">
          핑계를 불러오는 중 오류가 발생했습니다.
        </p>
        <FigmaButton
          variant="primary"
          round="pills"
          size={1.0}
          onClick={() => router.push("/create")}
          className="px-6"
        >
          새로운 핑계 만들기
        </FigmaButton>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (!excuseData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-lg text-gray-600">핑계 정보를 찾을 수 없습니다.</p>
        <FigmaButton
          variant="primary"
          round="pills"
          size={1.0}
          onClick={() => router.push("/create")}
          className="px-6"
        >
          새로운 핑계 만들기
        </FigmaButton>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center min-h-full w-full">
        {/* Header Section */}
        <div className="flex flex-col w-full">
          {/* Back Button */}
          <div className="flex justify-end gap-1.5">
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
            <Link href="/gallery" className="cursor-pointer content-center">
              <Image
                src="/icons/gallery-button.svg"
                width={44}
                height={36}
                alt="gallery"
              />
            </Link>
          </div>
          {/* Title Area */}
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-section-title text-grey-10 uppercase">
              탬플릿을 선택해주세요
            </h1>
          </div>
        </div>

        {/* Card Style Selection */}
        <div className="w-full bg-gray-50 rounded-lg py-1 relative z-0">
          <Carousel
            onSelectionChange={handleSelectionChange}
            initialSelected={selectedCardType}
          />
        </div>

        {/* Card Preview */}
        <div
          className="flex justify-center relative z-0"
          style={{
            width: "calc(100% + 2rem)",
            marginLeft: "-1rem",
            marginRight: "-1rem",
          }}
        >
          <div className="transform origin-center max-w-full overflow-hidden">
            <CanvasCard
              ref={cardRef}
              recipient={excuseData.target}
              message={excuseData.excuse}
              cardType={selectedCardType}
              scale={cardScale}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <ActionButtons
          cardRef={cardRef}
          excuseData={excuseData}
          excuseId={resolvedParams.excuseId}
          selectedCardType={selectedCardType}
        />
      </div>
    </>
  );
}

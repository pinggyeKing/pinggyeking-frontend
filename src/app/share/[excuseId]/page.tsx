"use client";

import FigmaButton from "@/components/FigmaButton";
import LottieLoading from "@/components/LottieLoading";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, use } from "react";
import { useExcuseDetail } from "@/app/share/api";
import CanvasCard from "@/app/result/[excuseId]/components/CanvasCard";
import Header from "./components/Header";
import CustomButton from "@/components/Custombutton";

interface SharePageProps {
  params: Promise<{
    excuseId: string;
  }>;
}

export default function SharePage({ params }: SharePageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const rawCardType = searchParams?.get("cardType");
  const cardType =
    rawCardType === "default" ||
    rawCardType === "formal" ||
    rawCardType === "cute" ||
    rawCardType === "humorous" ||
    rawCardType === "pop"
      ? rawCardType
      : "default";

  const {
    data: excuseData,
    isLoading,
    error,
  } = useExcuseDetail(resolvedParams.excuseId);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleGenerateClick = () => {
    router.push("/");
  };

  const handleGalleryClick = () => {
    router.push("/gallery");
  };

  // 로딩 상태
  if (!isMounted || isLoading) {
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
          onClick={handleGenerateClick}
          className="px-6"
        >
          새로운 핑계 만들기
        </FigmaButton>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (!excuseData?.excuse) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-lg text-gray-600">핑계를 찾을 수 없습니다.</p>
        <FigmaButton
          variant="primary"
          round="pills"
          size={1.0}
          onClick={handleGenerateClick}
          className="px-6"
        >
          새로운 핑계 만들기
        </FigmaButton>
      </div>
    );
  }

  const { situation, target, tone, excuse, headTitle } = excuseData;

  const CARD_SCALE = 286 / 444; // CanvasCard base width is 444px → fixed width 286px

  return (
    <div className="flex flex-col items-center justify-between gap-6 mt-[-20px]">
      {/* Header 추가  */}
      <Header headTitle={headTitle} />
      {/* Card Preview */}
      <div className="flex justify-center">
        <div className="transform origin-center">
          <CanvasCard
            recipient={target}
            message={excuse}
            cardType={
              cardType as "default" | "formal" | "cute" | "humorous" | "pop"
            }
            scale={CARD_SCALE}
          />
        </div>
      </div>

      {/* FigmaButton Component */}
      <div className="flex flex-col gap-4 w-full">
        <div
          style={{
            backgroundColor: "#1E1E1E",
            borderRadius: "24px",
            overflow: "hidden",
          }}
        >
          <FigmaButton
            variant="primary"
            round="pills"
            size={1.0}
            onClick={handleGenerateClick}
            className="w-full min-h-[48px]"
          >
            나도 핑계 생성 해볼까?
          </FigmaButton>
        </div>
        <CustomButton
          typeStyle="outline2"
          round="pills"
          onClick={handleGalleryClick}
        >
          핑계 갤러리 구경가기
        </CustomButton>
      </div>
    </div>
  );
}

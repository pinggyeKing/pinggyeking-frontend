"use client";

import Card from "@/app/result/card-image/components/Card";
import FigmaButton from "@/components/FigmaButton";
import LottieLoading from "@/components/LottieLoading";
import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import { useExcuseDetail } from "@/app/share/api";
import CanvasCard from "@/app/result/card-image/components/CanvasCard";

interface SharePageProps {
  params: Promise<{
    excuseId: string;
  }>;
}

export default function SharePage({ params }: SharePageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const {
    data: excuseData,
    isLoading,
    error,
  } = useExcuseDetail(resolvedParams.excuseId);

  useEffect(() => {
    setIsMounted(true);

    // 데스크탑 여부 체크 함수
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768); // md breakpoint (768px)
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);

    return () => {
      window.removeEventListener("resize", checkIsDesktop);
    };
  }, []);

  const handleGenerateClick = () => {
    router.push("/create");
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

  const { situation, target, tone, excuse } = excuseData;

  // 카드에 표시할 메시지 포맷팅
  const message = `${target}, 정말 죄송합니다만....${situation}

이유,,,, 

${excuse}`;

  return (
    <div className="flex flex-col items-center justify-between gap-6">
      {/* Card Preview */}
      <div className="flex justify-center">
        <div className="transform origin-center">
          <CanvasCard
            recipient={target}
            message={message}
            cardType="default"
            scale={isDesktop ? 0.65 : 0.82}
          />
        </div>
      </div>

      {/* FigmaButton Component */}
      <div style={{ width: "100%" }}>
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
      </div>
    </div>
  );
}

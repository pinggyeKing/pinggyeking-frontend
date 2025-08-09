"use client";

import StatsGrid from "./components/StatsGrid";
import SatisfactionChart from "./components/SatisfactionChart";
import TrendChart from "./components/TrendChart";
import LottieLoading from "@/components/LottieLoading";
import FigmaButton from "@/components/FigmaButton";
import { useGallery } from "@/app/gallery/api";
import { useRouter } from "next/navigation";

export default function GalleryPage() {
  const { data: galleryData, isLoading, error } = useGallery();
  const router = useRouter();

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LottieLoading text="갤러리를 불러오는 중이에요!" />
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-lg text-gray-600">
          갤러리를 불러오는 중 오류가 발생했습니다.
        </p>
        <FigmaButton
          variant="primary"
          round="pills"
          size={1.0}
          onClick={() => window.location.reload()}
          className="px-6"
        >
          다시 시도
        </FigmaButton>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (!galleryData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-lg text-gray-600">데이터를 찾을 수 없습니다.</p>
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
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 통계 카드 그리드 */}
        <div className="w-full">
          <StatsGrid data={galleryData} />
        </div>

        {/* 차트 섹션 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-9 lg:gap-12">
          {/* 관계별 만족도 분석 */}
          <div className="space-y-6">
            <h2 className="text-section-title xl:text-left">
              관계별 만족도 분석
            </h2>
            <div className="w-full">
              <SatisfactionChart />
            </div>
          </div>

          {/* 요일별 핑계 트렌드 */}
          <div className="space-y-6">
            <h2 className="text-section-title xl:text-left">
              요일별 핑계 트렌드
            </h2>
            <div className="w-full">
              <TrendChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

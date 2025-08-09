import StatsGrid from "./components/StatsGrid";
import SatisfactionChart from "./components/SatisfactionChart";
import TrendChart from "./components/TrendChart";

export default function GalleryPage() {
  // 더미 데이터
  const statsData = {
    totalExcuses: 11,
    averageSatisfaction: 7.09,
    regenerationRate: 45.45,
    peakTime: {
      hour: 14,
      count: 7,
    },
  };

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {/* 페이지 제목 */}
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-[#1E1E1E] mb-2">
            핑계 갤러리
          </h1>
          <p className="text-sm sm:text-base text-[#4E4E4E]">
            핑계 생성 통계와 트렌드를 확인해보세요
          </p>
        </div>

        {/* 통계 카드 그리드 */}
        <div className="flex justify-center px-4">
          <StatsGrid data={statsData} />
        </div>

        {/* 차트 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* 관계별 만족도 분석 */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-base sm:text-lg font-semibold text-[#1E1E1E] text-center lg:text-left">
              관계별 만족도 분석
            </h2>
            <SatisfactionChart />
          </div>

          {/* 요일별 핑계 트렌드 */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-base sm:text-lg font-semibold text-[#1E1E1E] text-center lg:text-left">
              요일별 핑계 트렌드
            </h2>
            <TrendChart />
          </div>
        </div>
      </div>
    </div>
  );
}

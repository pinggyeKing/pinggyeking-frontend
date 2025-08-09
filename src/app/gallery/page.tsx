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
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 통계 카드 그리드 */}
        <div className="w-full">
          <StatsGrid data={statsData} />
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

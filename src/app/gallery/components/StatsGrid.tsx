import StatCard from "./StatCard";

interface StatsData {
  totalExcuses: number;
  averageSatisfaction: number;
  regenerationRate: number;
  peakTime: {
    hour: number;
    count: number;
  };
}

interface StatsGridProps {
  data: StatsData;
}

export default function StatsGrid({ data }: StatsGridProps) {
  const formatPeakTime = (hour: number) => {
    if (hour === 0) return "오전 12시";
    if (hour < 12) return `오전 ${hour}시`;
    if (hour === 12) return "오후 12시";
    return `오후 ${hour - 12}시`;
  };

  const stats = [
    {
      title: "생성된 핑계",
      value: data.totalExcuses.toLocaleString(),
    },
    {
      title: "평균만족도",
      value: `${Math.round(data.averageSatisfaction * 10)}%`,
    },
    {
      title: "재생성률",
      value: `${Math.round(data.regenerationRate)}%`,
    },
    {
      title: "피크 타임",
      value: formatPeakTime(data.peakTime.hour),
    },
  ];

  return (
    <div className="grid grid-cols-4 md:grid-cols-2 gap-2 md:gap-4 w-full mx-auto">
      {stats.map((stat, index) => (
        <StatCard key={index} title={stat.title} value={stat.value} />
      ))}
    </div>
  );
}

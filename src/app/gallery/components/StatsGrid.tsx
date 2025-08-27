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
      title: "생성된\n핑계",
      value: data.totalExcuses?.toLocaleString() ?? "0",
    },
    {
      title: "평균\n만족도",
      value: `${data.averageSatisfaction ?? "0"}%`,
    },
    {
      title: "재생성률",
      value: `${data.regenerationRate ?? "0"}%`,
    },
    {
      title: "피크\n타임",
      value: formatPeakTime(data.peakTime?.hour ?? 0),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 w-full mx-auto">
      {stats.map((stat, index) => (
        <StatCard key={index} title={stat.title} value={stat.value} />
      ))}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  className?: string;
}

export default function StatCard({
  title,
  value,
  className = "",
}: StatCardProps) {
  return (
    <div
      className={`bg-white border-2 border-[#4E4E4E] rounded-2xl p-3 sm:p-4 flex flex-col gap-2 w-20 sm:w-24 flex-1 min-w-0 ${className}`}
    >
      <div className="text-[#4E4E4E] text-xs sm:text-sm font-medium text-center leading-tight">
        {title}
      </div>
      <div className="text-[#1E1E1E] text-base sm:text-lg font-semibold text-center">
        {value}
      </div>
    </div>
  );
}

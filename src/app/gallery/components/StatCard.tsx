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
      className={`bg-white border-2 border-[#4E4E4E] rounded-2xl p-2 flex flex-col gap-1 md:gap-3 aspect-square items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      <div className="text-body3-medium">{title}</div>
      <div className="text-body1-semibold">{value}</div>
    </div>
  );
}

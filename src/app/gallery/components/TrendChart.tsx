"use client";

import { useState } from "react";

interface TrendData {
  label: string;
  value: number;
  isTop?: boolean;
}

const trendData: TrendData[] = [
  { label: "월", value: 98, isTop: true },
  { label: "화", value: 76 },
  { label: "수", value: 45 },
  { label: "목", value: 67 },
  { label: "금", value: 89 },
  { label: "토", value: 23 },
  { label: "일", value: 12 },
];

export default function TrendChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="bg-white border border-[#4E4E4E] rounded-3xl p-4 sm:p-6 w-full h-[200px] sm:h-[241px]">
      {/* Legend */}
      <div className="flex items-center gap-1 mb-4">
        <div className="w-6 h-2.5 bg-[#8E8E8E] rounded"></div>
        <span className="text-xs font-semibold text-[#1E1E1E]">%</span>
      </div>

      <div className="relative h-[160px]">
        {/* Grid lines */}
        <div className="absolute top-0 left-16 right-4 h-full">
          {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((value) => (
            <div
              key={value}
              className="absolute flex flex-col items-center"
              style={{ left: `${((value - 10) / 90) * 100}%` }}
            >
              <div className="w-px h-full bg-[#F0F0F0]"></div>
              <span className="text-xs text-[#8E8E8E] mt-1">{value}</span>
            </div>
          ))}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-[#F0F0F0]"></div>
        </div>

        {/* Chart bars */}
        <div className="relative h-full flex flex-col justify-between py-2">
          {trendData.map((data, index) => {
            const barWidth = (data.value / 100) * 100;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                className="relative flex items-center gap-3 h-5"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Label */}
                <div className="text-xs font-semibold text-[#1E1E1E] w-4 text-center">
                  {data.label}
                </div>

                {/* Bar container */}
                <div className="relative flex-1 h-3.5">
                  {/* Tooltip */}
                  {isHovered && (
                    <div
                      className="absolute -top-8 bg-white border border-[#333333] rounded-lg px-3 py-1 shadow-lg z-10"
                      style={{
                        left: `${barWidth}%`,
                        transform: "translateX(-50%)",
                      }}
                    >
                      <div className="text-xs font-medium text-[#1E1E1E]">
                        {data.value}%
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-[#333333]"></div>
                    </div>
                  )}

                  {/* Bar */}
                  <div
                    className={`h-full rounded transition-colors duration-200 ${
                      data.isTop ? "bg-[#4E4E4E]" : "bg-[#8E8E8E]"
                    }`}
                    style={{ width: `${barWidth}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

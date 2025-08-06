"use client";

import { useState } from "react";

interface SatisfactionData {
  label: string;
  value: number;
  isTop?: boolean;
}

const satisfactionData: SatisfactionData[] = [
  { label: "상사/선배", value: 5 },
  { label: "교수/선생님", value: 8 },
  { label: "동료/친구", value: 52, isTop: true },
  { label: "연인", value: 6 },
  { label: "가족", value: 4 },
];

export default function SatisfactionChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="bg-white border-[1.5px] border-[#4E4E4E] rounded-3xl p-4 sm:p-6 w-full h-[180px] sm:h-[210px]">
      <div className="relative h-full w-full">
        {/* Y-axis labels and horizontal grid lines */}
        <div className="absolute left-0 top-0 h-full w-full">
          {[60, 45, 30, 15, 0].map((value, index) => (
            <div
              key={value}
              className="absolute flex items-center w-full"
              style={{ top: `${(index / 4) * 100}%` }}
            >
              <span className="text-xs text-[#8E8E8E] w-6 text-right mr-2">
                {value}
              </span>
              {/* Short connecting line from Y-axis label */}
              <div className="w-2 h-px bg-[#8E8E8E]"></div>
              {/* Horizontal grid line */}
              <div className="flex-1 h-px bg-[#F0F0F0]"></div>
            </div>
          ))}
        </div>

        {/* Chart area with grid system */}
        <div className="absolute left-8 right-0 top-4 bottom-8">
          <div className="relative h-full w-full">
            {/* Vertical grid lines */}
            <div className="absolute inset-0 flex justify-between">
              {satisfactionData.map((_, index) => (
                <div
                  key={`vertical-${index}`}
                  className="w-px bg-[#F0F0F0] h-full"
                  style={{
                    left: `${(index / (satisfactionData.length - 1)) * 100}%`,
                  }}
                ></div>
              ))}
            </div>

            {/* Y-axis (thick line) */}
            <div className="absolute left-0 top-0 w-[2px] h-full bg-[#8E8E8E]"></div>

            {/* X-axis (thick line) */}
            <div className="absolute left-0 bottom-0 w-full h-[2px] bg-[#8E8E8E]"></div>

            {/* Bars container */}
            <div className="relative h-full flex items-end justify-between gap-2 sm:gap-4">
              {satisfactionData.map((data, index) => {
                const barHeight = (data.value / 60) * 100; // 60을 최대값으로 설정
                const isHovered = hoveredIndex === index;

                return (
                  <div
                    key={index}
                    className="relative flex flex-col items-center gap-2 flex-1"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Tooltip */}
                    {isHovered && (
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white border border-[#333333] rounded-lg px-3 py-1 shadow-lg z-10">
                        <div className="text-xs font-medium text-[#1E1E1E]">
                          {data.value}%
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-transparent border-t-[#333333]"></div>
                      </div>
                    )}

                    {/* Bar */}
                    <div className="relative w-full max-w-12 flex justify-center">
                      <div
                        className={`w-8 sm:w-12 rounded-t-[4px] transition-all duration-200 ${
                          data.isTop ? "bg-[#4E4E4E]" : "bg-[#8E8E8E]"
                        }`}
                        style={{
                          height: `${Math.max(barHeight, 2)}px`,
                          maxHeight: "120px",
                        }}
                      ></div>
                    </div>

                    {/* Label */}
                    <div className="text-xs font-semibold text-[#1E1E1E] text-center whitespace-nowrap">
                      {data.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

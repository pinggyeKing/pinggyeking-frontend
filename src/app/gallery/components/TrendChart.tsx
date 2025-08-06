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

  // Chart dimensions - adjusted for proper container fit
  const chartWidth = 360;
  const chartHeight = 180;
  const marginLeft = 24;
  const marginRight = 16;
  const marginTop = 35;
  const marginBottom = 20;

  const plotWidth = chartWidth - marginLeft - marginRight;
  const plotHeight = chartHeight - marginTop - marginBottom;

  // Grid values from 10 to 100 (0 baseline exists but not labeled)
  const gridValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const maxValue = 100;

  // Bar dimensions
  const barHeight = 14;
  const barSpacing = plotHeight / trendData.length;

  return (
    <div className="bg-white border border-[#4E4E4E] rounded-3xl p-4 sm:p-6 w-full h-[200px] sm:h-[241px] flex items-center justify-center">
      <svg width={chartWidth} height={chartHeight} className="overflow-visible">
        {/* Legend at top */}
        <g>
          <rect x="16" y="10" width="20" height="8" fill="#8E8E8E" rx="2" />
          <text
            x="40"
            y="18"
            className="text-xs fill-[#1E1E1E]"
            style={{ fontFamily: "inherit", fontWeight: "600" }}
          >
            %
          </text>
        </g>

        {/* Grid lines and labels */}
        {gridValues.map((value) => {
          const x = marginLeft + (value / maxValue) * plotWidth;

          return (
            <g key={value}>
              {/* Vertical grid line */}
              <line
                x1={x}
                y1={marginTop}
                x2={x}
                y2={marginTop + plotHeight}
                stroke="#F0F0F0"
                strokeWidth="1"
              />

              {/* Grid label at bottom */}
              <text
                x={x}
                y={marginTop + plotHeight + 12}
                textAnchor="middle"
                className="text-[10px] fill-[#8E8E8E]"
                style={{ fontFamily: "inherit" }}
              >
                {value}
              </text>
            </g>
          );
        })}

        {/* Horizontal baseline */}
        <line
          x1={marginLeft}
          y1={marginTop + plotHeight}
          x2={marginLeft + plotWidth}
          y2={marginTop + plotHeight}
          stroke="#F0F0F0"
          strokeWidth="1"
        />

        {/* Bars and labels */}
        {trendData.map((data, index) => {
          const barWidth = (data.value / maxValue) * plotWidth; // Now starts from 0
          const x = marginLeft;
          const y =
            marginTop + barSpacing * index + (barSpacing - barHeight) / 2;
          const isHovered = hoveredIndex === index;

          return (
            <g key={index}>
              {/* Day label with 11px gap */}
              <text
                x={marginLeft - 11}
                y={y + barHeight / 2 + 3}
                textAnchor="middle"
                className="text-xs fill-[#1E1E1E]"
                style={{ fontFamily: "inherit", fontWeight: "600" }}
              >
                {data.label}
              </text>

              {/* Bar */}
              <rect
                x={x}
                y={y}
                width={Math.max(barWidth, 4)}
                height={barHeight}
                fill={data.isTop ? "#4E4E4E" : "#8E8E8E"}
                rx="4"
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />

              {/* Tooltip */}
              {isHovered && (
                <g>
                  {/* Tooltip background with arrow */}
                  <g>
                    {/* Main tooltip rectangle */}
                    <rect
                      x={x + barWidth - 22}
                      y={y - 28}
                      width="44"
                      height="22"
                      fill="white"
                      stroke="#333333"
                      strokeWidth="0.65"
                      rx="6"
                      filter="drop-shadow(0px 2px 6px rgba(30, 30, 30, 0.3))"
                    />
                    {/* Arrow pointing down */}
                    <polygon
                      points={`${x + barWidth - 2},${y - 6} ${
                        x + barWidth + 2
                      },${y - 6} ${x + barWidth},${y - 2}`}
                      fill="white"
                      stroke="#333333"
                      strokeWidth="0.65"
                    />
                  </g>

                  {/* Tooltip text */}
                  <text
                    x={x + barWidth}
                    y={y - 12}
                    textAnchor="middle"
                    className="text-xs fill-[#1E1E1E]"
                    style={{ fontFamily: "inherit", fontWeight: "500" }}
                  >
                    {data.value}%
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

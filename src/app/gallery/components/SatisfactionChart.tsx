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

  // Chart dimensions
  const chartWidth = 400;
  const chartHeight = 200;
  const marginLeft = 40;
  const marginRight = 20;
  const marginTop = 20;
  const marginBottom = 40;

  const plotWidth = chartWidth - marginLeft - marginRight;
  const plotHeight = chartHeight - marginTop - marginBottom;

  // Y-axis values
  const yValues = [60, 45, 30, 15, 0];
  const maxValue = 60;

  // Bar dimensions
  const barWidth = 30;
  const barSpacing = plotWidth / satisfactionData.length;

  return (
    <div className="bg-white border-2 border-[#4E4E4E] rounded-3xl p-6 sm:p-8 w-full shadow-sm hover:shadow-md transition-shadow duration-200">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="max-w-full max-h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Horizontal grid lines and Y-axis labels */}
        {yValues.map((value, index) => {
          const y = marginTop + (index / (yValues.length - 1)) * plotHeight;
          const isXAxis = value === 0;

          return (
            <g key={value}>
              {/* Y-axis label */}
              <text
                x={marginLeft - 10}
                y={y + 4}
                textAnchor="end"
                className="text-xs fill-[#8E8E8E]"
                style={{ fontFamily: "inherit" }}
              >
                {value}
              </text>

              {/* Short connecting line */}
              <line
                x1={marginLeft - 8}
                y1={y}
                x2={marginLeft}
                y2={y}
                stroke="#8E8E8E"
                strokeWidth="1"
              />

              {/* Grid line */}
              <line
                x1={marginLeft}
                y1={y}
                x2={marginLeft + plotWidth}
                y2={y}
                stroke={isXAxis ? "#8E8E8E" : "#F0F0F0"}
                strokeWidth={isXAxis ? "2" : "1"}
              />
            </g>
          );
        })}

        {/* Vertical grid lines */}
        {satisfactionData.map((_, index) => {
          const x = marginLeft + barSpacing * index + barSpacing / 2;

          return (
            <line
              key={`vertical-${index}`}
              x1={x}
              y1={marginTop}
              x2={x}
              y2={marginTop + plotHeight}
              stroke="#F0F0F0"
              strokeWidth="1"
            />
          );
        })}

        {/* Y-axis (thick vertical line) */}
        <line
          x1={marginLeft}
          y1={marginTop}
          x2={marginLeft}
          y2={marginTop + plotHeight}
          stroke="#8E8E8E"
          strokeWidth="2"
        />

        {/* Bars */}
        {satisfactionData.map((data, index) => {
          const barHeight = (data.value / maxValue) * plotHeight;
          const x =
            marginLeft + barSpacing * index + barSpacing / 2 - barWidth / 2;
          const y = marginTop + plotHeight - barHeight;
          const isHovered = hoveredIndex === index;

          return (
            <g key={index}>
              {/* Bar */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={data.isTop ? "#4E4E4E" : "#8E8E8E"}
                rx="4"
                ry="4"
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />

              {/* Tooltip */}
              {isHovered && (
                <g>
                  <rect
                    x={x + barWidth / 2 - 20}
                    y={y - 30}
                    width="40"
                    height="20"
                    fill="white"
                    stroke="#333333"
                    strokeWidth="1"
                    rx="4"
                    ry="4"
                    className="drop-shadow-sm"
                  />
                  <text
                    x={x + barWidth / 2}
                    y={y - 16}
                    textAnchor="middle"
                    className="text-xs fill-[#1E1E1E]"
                    style={{ fontFamily: "inherit", fontWeight: "500" }}
                  >
                    {data.value}%
                  </text>
                </g>
              )}

              {/* Label */}
              <text
                x={x + barWidth / 2}
                y={marginTop + plotHeight + 20}
                textAnchor="middle"
                className="text-xs fill-[#1E1E1E]"
                style={{ fontFamily: "inherit", fontWeight: "600" }}
              >
                {data.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

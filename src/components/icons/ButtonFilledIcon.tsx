import React from "react";

type ButtonFilledIconProps = {
  width?: number;
  className?: string;
  fill?: string;
  decorativeFill?: string;
  text?: string;
  textClassName?: string;
  textStyle?: React.CSSProperties;
  onClick?: () => void;
};

export default function ButtonFilledIcon({
  width = 178,
  className = "",
  fill = "#1E1E1E",
  decorativeFill = "#1E1E1E",
  text,
  textClassName = "",
  textStyle = {},
  onClick,
}: ButtonFilledIconProps) {
  // 원본 비율: 178x52
  // 수정: 136x48
  const originalWidth = 136;
  const originalHeight = 48;
  const height = (width * originalHeight) / originalWidth;

  // 기본 텍스트 스타일
  const defaultTextStyle: React.CSSProperties = {
    fontFamily: '"Ownglyph PDH", "Pretendard", sans-serif',
    fontSize: `${width * 0.11}px`, // width에 비례한 폰트 크기
    fontWeight: 400,
    color: "#FFFFFF",
    textAlign: "center",
    ...textStyle,
  };

  const buttonContent = (
    <>
      {/* Use original SVG file with custom fill colors applied via CSS filter */}
      <div
        className="relative"
        style={{
          width,
          height,
          // CSS filter to change SVG color - approximation for #1E1E1E
          filter:
            fill !== "#1E1E1E"
              ? `hue-rotate(${getHueRotation(
                  fill
                )}deg) saturate(${getSaturation(
                  fill
                )}) brightness(${getBrightness(fill)})`
              : "none",
        }}
      >
        <img
          src="/icons/button-filled.svg"
          alt="button"
          width={width}
          height={height}
          className="block"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      {text && (
        <span
          className={`absolute inset-0 flex items-center justify-center px-4 ${textClassName}`}
          style={defaultTextStyle}
        >
          {text}
        </span>
      )}
    </>
  );

  if (onClick) {
    return (
      <button
        className={`relative inline-flex items-center justify-center transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
        onClick={onClick}
        style={{ width, height }}
      >
        {buttonContent}
      </button>
    );
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      {buttonContent}
    </div>
  );
}

// Helper functions to convert hex colors to CSS filter values (approximate)
function getHueRotation(color: string): number {
  const colorMap: Record<string, number> = {
    "#3B82F6": 210, // blue
    "#EF4444": 0, // red
    "#10B981": 140, // green
    "#8B5CF6": 270, // purple
    "#F59E0B": 45, // yellow/orange
    "#6B7280": 0, // gray
    "#DC2626": 0, // red-600
    "#7C3AED": 270, // violet
    "#0891B2": 190, // cyan
    "#84CC16": 80, // lime
    "#06B6D4": 180, // sky
  };
  return colorMap[color] || 0;
}

function getSaturation(color: string): number {
  const saturationMap: Record<string, number> = {
    "#3B82F6": 1.2,
    "#EF4444": 1.2,
    "#10B981": 1.2,
    "#8B5CF6": 1.2,
    "#F59E0B": 1.2,
    "#6B7280": 0.2,
    "#DC2626": 1.2,
    "#7C3AED": 1.2,
    "#0891B2": 1.2,
    "#84CC16": 1.2,
    "#06B6D4": 1.2,
  };
  return saturationMap[color] || 1;
}

function getBrightness(color: string): number {
  const brightnessMap: Record<string, number> = {
    "#3B82F6": 1.0,
    "#EF4444": 1.0,
    "#10B981": 1.0,
    "#8B5CF6": 1.0,
    "#F59E0B": 1.2,
    "#6B7280": 0.8,
    "#DC2626": 0.9,
    "#7C3AED": 1.0,
    "#0891B2": 1.0,
    "#84CC16": 1.1,
    "#06B6D4": 1.0,
  };
  return brightnessMap[color] || 1;
}

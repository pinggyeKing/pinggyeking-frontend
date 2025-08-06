import React from "react";

type ButtonOutlinedIconProps = {
  width?: number;
  className?: string;
  backgroundFill?: string; // 배경색 (기본: 흰색)
  borderFill?: string; // 테두리색 (기본: 검은색)
  text?: string;
  textClassName?: string;
  textStyle?: React.CSSProperties;
  onClick?: () => void;
};

export default function ButtonOutlinedIcon({
  width = 178,
  className = "",
  backgroundFill = "#FFFFFF",
  borderFill = "#1E1E1E",
  text,
  textClassName = "",
  textStyle = {},
  onClick,
}: ButtonOutlinedIconProps) {
  // 원본 비율: 178x52
  const originalWidth = 178;
  const originalHeight = 52;
  const height = (width * originalHeight) / originalWidth;

  // 기본 텍스트 스타일
  const defaultTextStyle: React.CSSProperties = {
    fontFamily: '"Ownglyph PDH", "Pretendard", sans-serif',
    fontSize: `${width * 0.11}px`, // 원본 크기 대비 비율 조정
    fontWeight: 500,
    color: borderFill, // 테두리색과 동일하게
    textAlign: "center",
    whiteSpace: "pre-line",
    ...textStyle,
  };

  // 미리 정의된 색상 필터 맵 (테두리색 변경용)
  const colorFilters: { [key: string]: string } = {
    "#3B82F6":
      "invert(40%) sepia(95%) saturate(1500%) hue-rotate(200deg) brightness(100%) contrast(100%)",
    "#EF4444":
      "invert(25%) sepia(100%) saturate(2000%) hue-rotate(0deg) brightness(110%) contrast(100%)",
    "#10B981":
      "invert(50%) sepia(100%) saturate(1000%) hue-rotate(120deg) brightness(100%) contrast(100%)",
    "#8B5CF6":
      "invert(45%) sepia(100%) saturate(1200%) hue-rotate(260deg) brightness(100%) contrast(100%)",
    "#F59E0B":
      "invert(65%) sepia(100%) saturate(1500%) hue-rotate(30deg) brightness(100%) contrast(100%)",
    "#6B7280":
      "invert(50%) sepia(10%) saturate(500%) hue-rotate(200deg) brightness(90%) contrast(100%)",
    "#1E1E1E": "none",
  };

  // 배경색 필터 맵
  const backgroundFilters: { [key: string]: string } = {
    "#FFFFFF": "none",
    "#F8FAFC": "brightness(0.98) contrast(1.02)",
    "#F1F5F9": "brightness(0.96) contrast(1.05)",
    "#E2E8F0": "brightness(0.90) contrast(1.1)",
  };

  const appliedFilter = colorFilters[borderFill] || "none";
  const appliedBackgroundFilter = backgroundFilters[backgroundFill] || "none";

  const WrapperTag = onClick ? "button" : "div";

  return (
    <WrapperTag
      onClick={onClick}
      className={`relative inline-flex items-center justify-center ${
        onClick ? "cursor-pointer hover:opacity-80 focus:outline-none" : ""
      } ${className}`}
      style={{ width, height }}
    >
      <img
        src="/icons/button-outlined.svg"
        alt="button outlined"
        width={width}
        height={height}
        style={{
          filter: appliedFilter !== "none" ? appliedFilter : undefined,
        }}
        className="absolute inset-0"
      />

      {/* 배경색 오버레이 (필요한 경우) */}
      {backgroundFill !== "#FFFFFF" && (
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: backgroundFill,
            filter: appliedBackgroundFilter,
            mixBlendMode: "multiply",
          }}
        />
      )}

      {text && (
        <span
          className={`relative z-10 ${textClassName}`}
          style={defaultTextStyle}
        >
          {text}
        </span>
      )}
    </WrapperTag>
  );
}

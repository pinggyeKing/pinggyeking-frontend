import React, { useState } from "react";

type IconSize = "XL" | "L" | "M" | "S" | "XS" | "XXS";

// 아이콘 크기 매핑 (Figma 디자인 시스템에 맞춤)
const iconSizeMap: Record<
  IconSize,
  { size: number; className: string; strokeWidth: number }
> = {
  XL: { size: 72, className: "p-4 radius-24", strokeWidth: 2.25 },
  L: { size: 56, className: "p-3 radius-20", strokeWidth: 2.0 },
  M: { size: 40, className: "p-2 radius-16", strokeWidth: 1.75 },
  S: { size: 32, className: "p-1.5 radius-12", strokeWidth: 1.5 },
  XS: { size: 24, className: "p-1 radius-8", strokeWidth: 1.25 },
  XXS: { size: 16, className: "p-0.5 radius-4", strokeWidth: 1.0 },
};

export type CustomIconProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  size?: IconSize;
  className?: string;
  onClick?: () => void;
  active?: boolean;
};

export default function CustomIcon({
  icon: Icon,
  size = "M",
  className = "",
  onClick,
  active = false,
}: CustomIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const {
    size: iconSize,
    className: sizeClassName,
    strokeWidth,
  } = iconSizeMap[size];

  // 상태별 스타일 결정
  const getIconStyles = () => {
    if (active) {
      return {
        fill: "none",
        stroke: "var(--grey-6)",
        strokeWidth: strokeWidth,
      };
    } else if (isHovered) {
      return {
        fill: "var(--grey-2)",
        stroke: "var(--grey-2)",
        strokeWidth: strokeWidth,
      };
    } else {
      return {
        fill: "none",
        stroke: "none",
        strokeWidth: strokeWidth,
      };
    }
  };

  const dynamicStyles = getIconStyles();

  const iconStyle: React.CSSProperties = {
    width: iconSize,
    height: iconSize,
    cursor: onClick ? "pointer" : "default",
    ...dynamicStyles,
    transition: "all 0.2s ease-in-out",
  };

  return (
    <div
      className={`inline-flex items-center justify-center ${sizeClassName} ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon
        width={iconSize}
        height={iconSize}
        style={iconStyle}
        className="flex-shrink-0"
      />
    </div>
  );
}

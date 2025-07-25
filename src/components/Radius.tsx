import React from "react";
import clsx from "clsx";

interface RadiusProps {
  progress: number; // 0-100
  size?: number; // 컴포넌트 크기 (px)
  strokeWidth?: number; // 선 두께
  showPercentage?: boolean; // 퍼센트 텍스트 표시 여부
  className?: string;
}

const Radius: React.FC<RadiusProps> = ({
  progress,
  size = 100,
  strokeWidth = 10,
  showPercentage = true,
  className,
}) => {
  // progress를 0-100 범위로 제한
  const clampedProgress = Math.max(0, Math.min(100, progress));

  // 원의 반지름 계산
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // 진행률에 따른 stroke-dashoffset 계산
  const offset = circumference - (clampedProgress / 100) * circumference;

  // 중심점 계산
  const center = size / 2;

  return (
    <div
      className={clsx("relative", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* 배경 원 */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#CBCBCB"
          strokeWidth={strokeWidth}
        />
        {/* 진행률 원 */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#4E4E4E"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
        />
      </svg>
      {showPercentage && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ fontSize: `${size * 0.26}px` }}
        >
          <span className="font-bold text-gray-900">
            {Math.round(clampedProgress)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default Radius;

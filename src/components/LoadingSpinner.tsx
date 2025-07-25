import React from "react";
import clsx from "clsx";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  className?: string;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  className,
  text,
}) => {
  // 크기별 설정 (Figma 디자인 기반)
  const sizeConfig = {
    small: {
      container: "w-10 h-10",
      circle: "w-8 h-8",
      textSize: "text-sm",
    },
    medium: {
      container: "w-12 h-12",
      circle: "w-11 h-11", // 45px에 맞춤
      textSize: "text-base",
    },
    large: {
      container: "w-16 h-16",
      circle: "w-14 h-14",
      textSize: "text-lg",
    },
  };

  const config = sizeConfig[size];

  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center gap-3",
        className
      )}
    >
      {/* 스피너 - 스핀 애니메이션만 사용 */}
      <div
        className={clsx(
          "relative flex items-center justify-center",
          config.container
        )}
      >
        <div
          className={clsx("rounded-full animate-spin", config.circle)}
          style={{
            background: `conic-gradient(from 0deg, transparent, transparent, transparent, #CBCBCB)`,
            animationDuration: "1s",
          }}
        />
        {/* 중앙의 빈 공간을 위한 내부 원 */}
        <div
          className="absolute rounded-full bg-white"
          style={{
            width: `calc(${
              config.circle.includes("w-8")
                ? "2rem"
                : config.circle.includes("w-11")
                ? "2.75rem"
                : "3.5rem"
            } - 8px)`,
            height: `calc(${
              config.circle.includes("w-8")
                ? "2rem"
                : config.circle.includes("w-11")
                ? "2.75rem"
                : "3.5rem"
            } - 8px)`,
          }}
        />
      </div>

      {/* 텍스트 (선택적) */}
      {text && (
        <p className={clsx("text-gray-600 font-medium", config.textSize)}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;

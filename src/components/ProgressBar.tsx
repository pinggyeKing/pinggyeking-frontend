import React from "react";
import clsx from "clsx";
import Image from "next/image";

export type ProgressBarStyle = "straight" | "curved";
export type ProgressStage = 20 | 40 | 60 | 80 | 100;

interface ProgressBarProps {
  stage: ProgressStage; // 20, 40, 60, 80, 100만 허용
  style?: ProgressBarStyle;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  stage,
  style = "straight",
  className,
}) => {
  // Figma 디자인 기반 이미지 파일명 생성
  const getImagePath = () => {
    const stylePrefix = style === "straight" ? "straight" : "curved";
    return `/progress-bars/progress-bar-${stylePrefix}-${stage}.svg`;
  };

  return (
    <div className={clsx("w-full relative", className)}>
      <Image
        src={getImagePath()}
        alt={`Progress ${stage}% - ${style} style`}
        width={280}
        height={35}
        className="w-full h-auto"
        priority
      />
    </div>
  );
};

export default ProgressBar;

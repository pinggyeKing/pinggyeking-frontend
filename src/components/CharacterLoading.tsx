import React, { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";

interface CharacterLoadingProps {
  size?: "small" | "medium" | "large";
  text?: string;
  className?: string;
}

const CharacterLoading: React.FC<CharacterLoadingProps> = ({
  size = "medium",
  text,
  className,
}) => {
  const [isExcited, setIsExcited] = useState(false);

  // 크기별 설정
  const sizeConfig = {
    small: {
      container: "w-24 h-20", // 96x80px
      image: { width: 93, height: 75 }, // 50% 크기
      textSize: "text-sm",
    },
    medium: {
      container: "w-48 h-40", // 186x150px (원본 크기)
      image: { width: 186, height: 150 },
      textSize: "text-base",
    },
    large: {
      container: "w-60 h-48", // 240x192px (130% 크기)
      image: { width: 240, height: 192 },
      textSize: "text-lg",
    },
  };

  // 애니메이션 설정 (고정값)
  const animationConfig = {
    delay: 100, // 100ms
    duration: 300, // 300ms
  };

  const config = sizeConfig[size];

  // 캐릭터 상태를 주기적으로 변경
  useEffect(() => {
    const interval = setInterval(() => {
      setIsExcited((prev) => !prev);
    }, animationConfig.delay + animationConfig.duration);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center gap-4",
        className
      )}
    >
      {/* 캐릭터 이미지 */}
      <div
        className={clsx(
          "relative flex items-center justify-center transition-all duration-300",
          config.container
        )}
      >
        <Image
          src={
            isExcited
              ? "/characters/character-excited.svg"
              : "/characters/character-normal.svg"
          }
          alt="Loading character"
          width={config.image.width}
          height={config.image.height}
          className="transition-all duration-300 ease-in-out"
          priority
        />
      </div>

      {/* 로딩 텍스트 (선택적) */}
      {text && (
        <p
          className={clsx(
            "text-gray-700 font-medium text-center",
            config.textSize
          )}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default CharacterLoading;

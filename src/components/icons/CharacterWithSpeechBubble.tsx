import React from "react";
import SpeechBubbleIcon from "./SpeechBubbleIcon";

// 캐릭터 타입 정의
type CharacterType =
  | "default"
  | "excited"
  | "kidding"
  | "sad"
  | "cute"
  | "cool"
  | "crown"
  | "suit";

// 말풍선 위치 타입
type BubblePosition = "top" | "bottom" | "left" | "right";

// 캐릭터 SVG 매핑 - 경로 사용
const characterMap = {
  default: "/icons/characters/default.svg",
  excited: "/icons/characters/excited.svg",
  kidding: "/icons/characters/kidding.svg",
  sad: "/icons/characters/sad.svg",
  cute: "/icons/characters/cute.svg",
  cool: "/icons/characters/cool.svg",
  crown: "/icons/characters/crown.svg",
  suit: "/icons/characters/suit.svg",
} as const;

// 말풍선 크기 설정 (제거됨 - 하드코딩)

export type CharacterWithSpeechBubbleProps = {
  character?: CharacterType;
  speechText?: string;
  bubblePosition?: BubblePosition;
  className?: string;
  speechBubbleClassName?: string;
  characterClassName?: string;
  textClassName?: string;
};

export default function CharacterWithSpeechBubble({
  character = "default",
  speechText = "에에... 그게...",
  bubblePosition = "top",
  className = "",
  speechBubbleClassName = "",
  characterClassName = "",
  textClassName = "",
}: CharacterWithSpeechBubbleProps) {
  const characterSvgPath = characterMap[character];

  // 레이아웃 설정
  const getLayoutClasses = () => {
    switch (bubblePosition) {
      case "top":
        return "flex-col items-center";
      case "bottom":
        return "flex-col-reverse items-center";
      case "left":
        return "flex-row items-center";
      case "right":
        return "flex-row-reverse items-center";
      default:
        return "flex-col items-center";
    }
  };

  // 말풍선과 캐릭터 간격
  const getSpacing = () => {
    return bubblePosition === "left" || bubblePosition === "right"
      ? "gap-4"
      : "gap-2";
  };

  return (
    <div
      className={`relative inline-flex ${getLayoutClasses()} ${getSpacing()} ${className}`}
    >
      {/* 말풍선 - SpeechBubbleIcon 사용 */}
      <SpeechBubbleIcon
        text={speechText}
        className={speechBubbleClassName}
        textClassName={textClassName}
      />

      {/* 캐릭터 */}
      <div className={`${characterClassName}`}>
        <img
          src={characterSvgPath}
          alt={`${character} character`}
          className="w-[72px] h-[72px]"
        />
      </div>
    </div>
  );
}

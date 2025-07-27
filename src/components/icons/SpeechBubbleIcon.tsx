import React from "react";

type SpeechBubbleIconProps = {
  text?: string;
  className?: string;
  textClassName?: string;
};

export default function SpeechBubbleIcon({
  text = "에에... 그게...",
  className = "",
  textClassName = "",
}: SpeechBubbleIconProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      <img
        src="/icons/speech-bubble.svg"
        alt="speech bubble"
        className="w-[168px] h-[110px]"
        style={{
          stroke: "#474b4e",
          strokeWidth: "3.785px",
        }}
      />

      <span
        className={`absolute inset-0 flex items-center justify-center text-center text-black px-4 ${textClassName}`}
        style={{
          fontFamily: '"Ownglyph PDH", "Pretendard", sans-serif',
          fontSize: "30px",
          fontWeight: 400,
          lineHeight: "normal",
        }}
      >
        {text}
      </span>
    </div>
  );
}

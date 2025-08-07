"use client";

import React, { useState, useEffect, forwardRef } from "react";

interface CardProps {
  recipient: string;
  message: string;
  cardType?: "default" | "formal" | "cute" | "humorous" | "pop";
  scale?: number;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ recipient, message, cardType = "default", scale = 1 }, ref) => {
    const [isMounted, setIsMounted] = useState(false);
    const height = 490;
    const width = 440;

    useEffect(() => {
      setIsMounted(true);
    }, []);

    const getCardBackground = () => {
      switch (cardType) {
        case "formal":
          return "/cards/formal-card.svg";
        case "cute":
          return "/cards/cute-card.svg";
        case "humorous":
          return "/cards/humorous-card.svg";
        case "pop":
          return "/cards/pop-card.svg";
        default:
          return "/cards/default-card.svg";
      }
    };

    // Scale에 따른 폰트 크기 계산
    const getScaledFontSize = (baseFontSize: number) => {
      return `${baseFontSize * scale}px`;
    };

    // Scale에 따른 간격 계산
    const getScaledSpacing = (baseSpacing: number) => {
      return `${baseSpacing * scale}px`;
    };

    // 서버와 클라이언트 렌더링을 동일하게 만들기 위한 로딩 상태
    if (!isMounted) {
      return (
        <div
          ref={ref}
          className="relative shadow-lg overflow-hidden bg-gray-100"
          style={{
            width: `${width * scale}px`,
            height: `${height * scale}px`,
            borderRadius: `${30 * scale}px`,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-400">Loading...</div>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className="relative shadow-lg overflow-hidden"
        style={{
          width: `${width * scale}px`,
          height: `${height * scale}px`,
          borderRadius: `${30 * scale}px`,
        }}
      >
        {/* Card background SVG */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${getCardBackground()})`,
            backgroundSize: "100% 100%", // SVG를 컨테이너에 정확히 맞춤
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />

        {/* Content overlay */}
        <div
          className="relative z-10 flex flex-col h-full"
          style={{
            gap: getScaledSpacing(16), // 4 * 4px = 16px
            paddingTop: getScaledSpacing(32), // py-8 = 32px
            paddingBottom: getScaledSpacing(32),
            paddingLeft: getScaledSpacing(40), // px-10 = 40px
            paddingRight: getScaledSpacing(40),
          }}
        >
          {/* Element 1: Recipient */}
          <div
            style={{
              fontFamily: '"Ownglyph RDO ballpen", "Pretendard", sans-serif',
              fontSize: getScaledFontSize(30),
              fontWeight: 400,
              lineHeight: getScaledFontSize(28),
            }}
          >
            To. {recipient}
          </div>

          {/* Element 2: Message */}
          <div
            className="flex-1 whitespace-pre-line break-all"
            style={{
              fontFamily: "var(--font-pretendard)",
              fontSize: getScaledFontSize(18),
              fontWeight: 500,
              lineHeight: getScaledFontSize(24),
            }}
          >
            {message}
          </div>
        </div>
      </div>
    );
  },
);

Card.displayName = "Card";

export default Card;

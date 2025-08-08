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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    // SVG viewBox와 동일한 크기로 설정 (viewBox="0 0 444 494")
    const height = 494;
    const width = 444;

    useEffect(() => {
      setIsMounted(true);

      // 데스크탑 여부 체크 함수
      const checkIsDesktop = () => {
        setIsDesktop(window.innerWidth >= 768); // md breakpoint (768px) - layout.tsx와 동일한 기준
      };

      checkIsDesktop();
      window.addEventListener("resize", checkIsDesktop);

      return () => {
        window.removeEventListener("resize", checkIsDesktop);
      };
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

    // Scale에 따른 폰트 크기 계산 - 최소값 보장
    const getScaledFontSize = (baseFontSize: number, minSize: number = 12) => {
      return Math.max(baseFontSize * scale, minSize);
    };

    // Scale에 따른 간격 계산 - 최소값 보장
    const getScaledSpacing = (baseSpacing: number, minSpacing: number = 8) => {
      return Math.max(baseSpacing * scale, minSpacing);
    };

    // Scale에 따른 라인 높이 계산 - 가독성 보장
    const getScaledLineHeight = (
      baseFontSize: number,
      minSize: number = 14,
    ) => {
      const fontSize = getScaledFontSize(baseFontSize, minSize);
      return fontSize * 1.2; // 폰트 크기의 1.2배로 라인 높이 설정
    };

    // 모달 핸들러 함수들
    const handleCardClick = () => {
      setIsModalOpen(true);
    };

    const handleModalClose = () => {
      setIsModalOpen(false);
    };

    // Card 컴포넌트 렌더링 함수
    const renderCard = (isInModal = false) => {
      // 모달에서는 데스크탑일 때 0.74배, 모바일일 때 1배 사용
      // 일반 표시에서는 props의 scale 사용
      let currentScale = scale;
      if (isInModal) {
        currentScale = isDesktop ? 0.74 : 1;
      }

      return (
        <div
          className={`relative shadow-lg overflow-hidden ${
            !isInModal ? "cursor-pointer hover:shadow-xl transition-shadow" : ""
          }`}
          style={{
            // width: `${width * currentScale}px`,
            // height: `${height * currentScale}px`,
            borderRadius: `${30 * currentScale}px`,
          }}
          onClick={!isInModal ? handleCardClick : undefined}
        >
          {/* Card background SVG */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${getCardBackground()})`,
              backgroundSize: "100% 100%", // SVG를 컨테이너에 정확히 맞춤
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />

          {/* Content overlay */}
          <div
            className="relative z-10 flex flex-col"
            style={{
              gap: `${getScaledSpacing(16, 8)}px`,
              paddingTop: `${getScaledSpacing(32, 16)}px`,
              paddingBottom: `${getScaledSpacing(32, 16)}px`,
              paddingLeft: `${getScaledSpacing(40, 20)}px`,
              paddingRight: `${getScaledSpacing(40, 20)}px`,
            }}
          >
            {/* Element 1: Recipient */}
            <div
              style={{
                fontFamily: '"Ownglyph RDO ballpen", "Pretendard", sans-serif',
                fontSize: `${getScaledFontSize(28, 16)}px`,
                fontWeight: 400,
                lineHeight: `${getScaledLineHeight(28, 16)}px`,
                marginBottom: `${getScaledSpacing(8, 4)}px`,
              }}
            >
              To. {recipient}
            </div>

            {/* Element 2: Message */}
            <div
              className="flex-1 whitespace-pre-line break-words"
              style={{
                fontFamily: "var(--font-pretendard)",
                fontSize: `${getScaledFontSize(16, 12)}px`,
                fontWeight: 500,
                lineHeight: `${getScaledLineHeight(16, 12)}px`,
                wordBreak: "keep-all",
                overflowWrap: "break-word",
              }}
            >
              {message}
            </div>
          </div>
        </div>
      );
    };

    // 서버와 클라이언트 렌더링을 동일하게 만들기 위한 로딩 상태
    if (!isMounted) {
      return (
        <div
          ref={ref}
          className="relative shadow-lg overflow-hidden bg-gray-100"
          style={{
            // width: `${width * scale}px`,
            // height: `${height * scale}px`,
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
      <>
        <div ref={ref}>{renderCard(false)}</div>

        {/* Simple Modal with overlay - only card preview */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
              background: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            onClick={handleModalClose}
          >
            <div onClick={(e) => e.stopPropagation()} className="relative">
              {renderCard(true)}
            </div>
          </div>
        )}
      </>
    );
  },
);

Card.displayName = "Card";

export default Card;

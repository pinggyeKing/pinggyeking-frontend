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
    const height = 490;
    const width = 440;

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

    // Scale에 따른 폰트 크기 계산
    const getScaledFontSize = (baseFontSize: number) => {
      return `${baseFontSize * scale}px`;
    };

    // Scale에 따른 간격 계산
    const getScaledSpacing = (baseSpacing: number) => {
      return `${baseSpacing * scale}px`;
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
            width: `${width * currentScale}px`,
            height: `${height * currentScale}px`,
            borderRadius: `${30 * currentScale}px`,
          }}
          onClick={!isInModal ? handleCardClick : undefined}
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
              gap: `${16 * currentScale}px`,
              paddingTop: `${32 * currentScale}px`,
              paddingBottom: `${32 * currentScale}px`,
              paddingLeft: `${40 * currentScale}px`,
              paddingRight: `${40 * currentScale}px`,
            }}
          >
            {/* Element 1: Recipient */}
            <div
              style={{
                fontFamily: '"Ownglyph RDO ballpen", "Pretendard", sans-serif',
                fontSize: `${30 * currentScale}px`,
                fontWeight: 400,
                lineHeight: `${28 * currentScale}px`,
              }}
            >
              To. {recipient}
            </div>

            {/* Element 2: Message */}
            <div
              className="flex-1 whitespace-pre-line break-all"
              style={{
                fontFamily: "var(--font-pretendard)",
                fontSize: `${18 * currentScale}px`,
                fontWeight: 500,
                lineHeight: `${24 * currentScale}px`,
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

"use client";

import React, { useRef, useEffect, useState, forwardRef } from "react";

interface TextPosition {
  x: number;
  y: number;
  maxWidth?: number;
  maxHeight?: number;
}

interface TextPositions {
  recipient: TextPosition;
  message: TextPosition;
}

interface FontSizes {
  recipient: number;
  message: number;
}

interface CanvasCardProps {
  recipient: string;
  message: string;
  cardType?: "default" | "formal" | "cute" | "humorous" | "pop";
  scale?: number;
  // 텍스트 위치 커스터마이징 옵션
  textPositions?: Partial<TextPositions>;
  fontSizes?: Partial<FontSizes>;
}

interface CanvasCardRef extends HTMLCanvasElement {
  getCanvasAsBlob: (type?: string, quality?: number) => Promise<Blob | null>;
  getCanvasAsDataURL: (type?: string, quality?: number) => string;
}

const CanvasCard = forwardRef<HTMLDivElement, CanvasCardProps>(
  (
    {
      recipient,
      message,
      cardType = "default",
      scale = 1,
      textPositions = {},
      fontSizes = {},
    },
    ref,
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const modalCanvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [svgImage, setSvgImage] = useState<HTMLImageElement | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    // Canvas 기본 크기 (SVG viewBox와 동일)
    const CANVAS_WIDTH = 444;
    const CANVAS_HEIGHT = 494;

    // 실제 렌더링 크기 (scale 적용)
    const actualWidth = CANVAS_WIDTH * scale;
    const actualHeight = CANVAS_HEIGHT * scale;

    // 기본 텍스트 위치 비율 정의 (props로 오버라이드 가능)
    const defaultTextPositions: TextPositions = {
      recipient: {
        x: 0.09, // 카드 너비의 9%
        y: 0.15, // 카드 높이의 15%
      },
      message: {
        x: 0.09,
        y: 0.25,
        maxWidth: 0.82, // 카드 너비의 82%
        maxHeight: 0.6, // 카드 높이의 60%
      },
    };

    // 기본 폰트 크기 비율 정의 (props로 오버라이드 가능)
    const defaultFontSizes: FontSizes = {
      recipient: 0.063, // 카드 높이의 6.3% (약 31px at 494px height)
      message: 0.032, // 카드 높이의 3.2% (약 16px at 494px height)
    };

    // 최종 텍스트 위치와 폰트 크기 (기본값 + 커스텀 값 병합)
    const finalTextPositions: TextPositions = {
      recipient: {
        ...defaultTextPositions.recipient,
        ...textPositions.recipient,
      },
      message: { ...defaultTextPositions.message, ...textPositions.message },
    };

    const finalFontSizes: FontSizes = {
      recipient: fontSizes.recipient ?? defaultFontSizes.recipient,
      message: fontSizes.message ?? defaultFontSizes.message,
    };

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

    // 모달 핸들러 함수들
    const handleCardClick = () => {
      setIsModalOpen(true);
    };

    const handleModalClose = () => {
      setIsModalOpen(false);
    };

    // SVG 이미지 로드
    useEffect(() => {
      const loadSvgImage = async () => {
        try {
          const img = new Image();
          img.crossOrigin = "anonymous";

          img.onload = () => {
            setSvgImage(img);
            setIsLoaded(true);
          };

          img.onerror = (error) => {
            console.error("SVG 로드 실패:", error);
            setIsLoaded(true); // 에러가 있어도 렌더링 시도
          };

          img.src = getCardBackground();
        } catch (error) {
          console.error("SVG 로드 중 오류:", error);
          setIsLoaded(true);
        }
      };

      loadSvgImage();
    }, [cardType]);

    // Canvas 렌더링 함수
    const renderCanvasContent = (
      canvas: HTMLCanvasElement,
      renderScale: number,
    ) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const canvasWidth = CANVAS_WIDTH * renderScale;
      const canvasHeight = CANVAS_HEIGHT * renderScale;

      // Canvas 실제 크기 설정 (scale 적용)
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // CSS 크기도 실제 크기로 설정 (레이아웃 문제 해결)
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;

      // 고해상도 렌더링을 위한 추가 스케일링
      const devicePixelRatio = window.devicePixelRatio || 1;
      if (devicePixelRatio > 1) {
        canvas.width = canvasWidth * devicePixelRatio;
        canvas.height = canvasHeight * devicePixelRatio;
        canvas.style.width = `${canvasWidth}px`;
        canvas.style.height = `${canvasHeight}px`;
        ctx.scale(devicePixelRatio, devicePixelRatio);
      }

      // Canvas 좌표계를 scale에 맞게 조정
      ctx.scale(renderScale, renderScale);

      // 배경 클리어
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // 배경 SVG 그리기
      if (svgImage) {
        ctx.drawImage(svgImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      } else {
        // SVG 로드 실패 시 기본 배경
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.strokeStyle = "#e5e7eb";
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      }

      // 텍스트 렌더링 설정
      ctx.textBaseline = "top";
      ctx.fillStyle = "#000000";

      // 수신자 텍스트 렌더링
      const recipientFontSize = CANVAS_HEIGHT * finalFontSizes.recipient;
      ctx.font = `400 ${recipientFontSize}px "Ownglyph RDO ballpen", "Pretendard", sans-serif`;

      const recipientX = CANVAS_WIDTH * finalTextPositions.recipient.x;
      const recipientY = CANVAS_HEIGHT * finalTextPositions.recipient.y;
      ctx.fillText(`To. ${recipient}`, recipientX, recipientY);

      // 메시지 텍스트 렌더링
      const messageFontSize = CANVAS_HEIGHT * finalFontSizes.message;
      ctx.font = `500 ${messageFontSize}px "Pretendard", sans-serif`;

      const messageX = CANVAS_WIDTH * finalTextPositions.message.x;
      const messageY = CANVAS_HEIGHT * finalTextPositions.message.y;
      const maxWidth =
        CANVAS_WIDTH * (finalTextPositions.message.maxWidth || 0.82);
      const maxHeight =
        CANVAS_HEIGHT * (finalTextPositions.message.maxHeight || 0.6);
      const lineHeight = messageFontSize * 1.2;

      // 메시지를 줄바꿈하여 렌더링
      renderMultilineText(
        ctx,
        message,
        messageX,
        messageY,
        maxWidth,
        maxHeight,
        lineHeight,
      );
    };

    // 메인 Canvas 렌더링
    useEffect(() => {
      if (!isLoaded || !canvasRef.current || !isMounted) return;
      renderCanvasContent(canvasRef.current, scale);
    }, [
      isLoaded,
      svgImage,
      recipient,
      message,
      cardType,
      scale,
      finalTextPositions,
      finalFontSizes,
      isMounted,
    ]);

    // 모달 Canvas 렌더링
    useEffect(() => {
      if (!isModalOpen || !isLoaded || !modalCanvasRef.current || !isMounted)
        return;

      const modalScale = isDesktop ? 0.74 : 1;
      renderCanvasContent(modalCanvasRef.current, modalScale);
    }, [
      isModalOpen,
      isLoaded,
      svgImage,
      recipient,
      message,
      cardType,
      finalTextPositions,
      finalFontSizes,
      isMounted,
      isDesktop,
    ]);

    // 여러 줄 텍스트 렌더링 함수
    const renderMultilineText = (
      ctx: CanvasRenderingContext2D,
      text: string,
      x: number,
      y: number,
      maxWidth: number,
      maxHeight: number,
      lineHeight: number,
    ) => {
      const lines = text.split("\n");
      let currentY = y;

      for (const line of lines) {
        if (currentY + lineHeight > y + maxHeight) break;

        if (line.trim() === "") {
          currentY += lineHeight;
          continue;
        }

        // 긴 줄을 자동으로 래핑
        const wrappedLines = wrapText(ctx, line, maxWidth);

        for (const wrappedLine of wrappedLines) {
          if (currentY + lineHeight > y + maxHeight) break;
          ctx.fillText(wrappedLine, x, currentY);
          currentY += lineHeight;
        }
      }
    };

    // 텍스트 래핑 함수
    const wrapText = (
      ctx: CanvasRenderingContext2D,
      text: string,
      maxWidth: number,
    ): string[] => {
      const words = text.split(" ");
      const lines: string[] = [];
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + " " + word).width;

        if (width < maxWidth) {
          currentLine += " " + word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      }
      lines.push(currentLine);
      return lines;
    };

    // Canvas에서 이미지 추출하는 메서드 제공
    const getCanvasAsBlob = (
      type: string = "image/png",
      quality?: number,
    ): Promise<Blob | null> => {
      return new Promise((resolve) => {
        if (canvasRef.current) {
          canvasRef.current.toBlob(resolve, type, quality);
        } else {
          resolve(null);
        }
      });
    };

    // Canvas에서 DataURL 추출하는 메서드 제공
    const getCanvasAsDataURL = (
      type: string = "image/png",
      quality?: number,
    ): string => {
      if (canvasRef.current) {
        return canvasRef.current.toDataURL(type, quality);
      }
      return "";
    };

    // ref에 메서드들 노출
    React.useImperativeHandle(ref, () => {
      const div = document.createElement("div");
      return Object.assign(div, {
        getCanvasAsBlob,
        getCanvasAsDataURL,
      });
    });

    // 서버와 클라이언트 렌더링을 동일하게 만들기 위한 로딩 상태
    if (!isMounted) {
      return (
        <div ref={ref} className="relative inline-block">
          <div
            className="shadow-lg bg-gray-100 flex items-center justify-center"
            style={{
              width: `${actualWidth}px`,
              height: `${actualHeight}px`,
              borderRadius: `${30 * scale}px`,
            }}
          >
            <div className="text-gray-400">Loading...</div>
          </div>
        </div>
      );
    }

    return (
      <>
        <div ref={ref} className="relative inline-block">
          <canvas
            ref={canvasRef}
            className="shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
            style={{
              borderRadius: `${30 * scale}px`,
            }}
            onClick={handleCardClick}
          />
          {!isLoaded && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-gray-100"
              style={{
                width: `${actualWidth}px`,
                height: `${actualHeight}px`,
                borderRadius: `${30 * scale}px`,
              }}
            >
              <div className="text-gray-400">Loading...</div>
            </div>
          )}
        </div>

        {/* Simple Modal with overlay - only canvas preview */}
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
              <canvas
                ref={modalCanvasRef}
                className="shadow-lg"
                style={{
                  borderRadius: `${30 * (isDesktop ? 0.74 : 1)}px`,
                }}
              />
            </div>
          </div>
        )}
      </>
    );
  },
);

CanvasCard.displayName = "CanvasCard";

export default CanvasCard;

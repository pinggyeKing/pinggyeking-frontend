"use client";

import React, { useRef, useEffect, useState, forwardRef } from "react";

interface CanvasCardProps {
  recipient: string;
  message: string;
  cardType?: "default" | "formal" | "cute" | "humorous" | "pop";
  scale?: number;
}

interface CanvasCardRef extends HTMLCanvasElement {
  getCanvasAsBlob: (type?: string, quality?: number) => Promise<Blob | null>;
  getCanvasAsDataURL: (type?: string, quality?: number) => string;
}

const CanvasCard = forwardRef<CanvasCardRef, CanvasCardProps>(
  ({ recipient, message, cardType = "default", scale = 1 }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [svgImage, setSvgImage] = useState<HTMLImageElement | null>(null);

    // Canvas 기본 크기 (SVG viewBox와 동일)
    const CANVAS_WIDTH = 444;
    const CANVAS_HEIGHT = 494;

    // 텍스트 위치 비율 정의
    const TEXT_POSITIONS = {
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

    // 폰트 크기 비율 정의
    const FONT_SIZES = {
      recipient: 0.063, // 카드 높이의 6.3% (약 31px at 494px height)
      message: 0.032, // 카드 높이의 3.2% (약 16px at 494px height)
    };

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

    // Canvas 렌더링
    useEffect(() => {
      if (!isLoaded || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Canvas 크기 설정
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;

      // 고해상도 렌더링을 위한 스케일링
      const devicePixelRatio = window.devicePixelRatio || 1;
      canvas.width = CANVAS_WIDTH * devicePixelRatio;
      canvas.height = CANVAS_HEIGHT * devicePixelRatio;
      canvas.style.width = `${CANVAS_WIDTH}px`;
      canvas.style.height = `${CANVAS_HEIGHT}px`;
      ctx.scale(devicePixelRatio, devicePixelRatio);

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
      const recipientFontSize = CANVAS_HEIGHT * FONT_SIZES.recipient;
      ctx.font = `400 ${recipientFontSize}px "Ownglyph RDO ballpen", "Pretendard", sans-serif`;

      const recipientX = CANVAS_WIDTH * TEXT_POSITIONS.recipient.x;
      const recipientY = CANVAS_HEIGHT * TEXT_POSITIONS.recipient.y;
      ctx.fillText(`To. ${recipient}`, recipientX, recipientY);

      // 메시지 텍스트 렌더링
      const messageFontSize = CANVAS_HEIGHT * FONT_SIZES.message;
      ctx.font = `500 ${messageFontSize}px "Pretendard", sans-serif`;

      const messageX = CANVAS_WIDTH * TEXT_POSITIONS.message.x;
      const messageY = CANVAS_HEIGHT * TEXT_POSITIONS.message.y;
      const maxWidth = CANVAS_WIDTH * TEXT_POSITIONS.message.maxWidth;
      const maxHeight = CANVAS_HEIGHT * TEXT_POSITIONS.message.maxHeight;
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
    }, [isLoaded, svgImage, recipient, message, cardType]);

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
      const canvas = canvasRef.current;
      if (!canvas) {
        // fallback 객체 반환
        return {
          getCanvasAsBlob,
          getCanvasAsDataURL,
        } as CanvasCardRef;
      }

      return Object.assign(canvas, {
        getCanvasAsBlob,
        getCanvasAsDataURL,
      }) as CanvasCardRef;
    });

    return (
      <div className="relative inline-block">
        <canvas
          ref={canvasRef}
          className="shadow-lg overflow-hidden"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            borderRadius: `${30 * scale}px`,
          }}
        />
        {!isLoaded && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-gray-100"
            style={{
              borderRadius: `${30 * scale}px`,
            }}
          >
            <div className="text-gray-400">Loading...</div>
          </div>
        )}
      </div>
    );
  },
);

CanvasCard.displayName = "CanvasCard";

export default CanvasCard;

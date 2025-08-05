import React, { useState, useEffect, forwardRef } from "react";

interface CardProps {
  recipient: string;
  message: string;
  cardType?: "default" | "formal" | "cute" | "humorous" | "pop";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ recipient, message, cardType = "default" }, ref) => {
    const [isMounted, setIsMounted] = useState(false);

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

    // 서버와 클라이언트 렌더링을 동일하게 만들기 위한 로딩 상태
    if (!isMounted) {
      return (
        <div
          ref={ref}
          className="relative w-[440px] h-[490px] shadow-lg overflow-hidden bg-gray-100"
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
        className="relative w-[440px] h-[490px] shadow-lg overflow-hidden rounded-[30px]"
      >
        {/* Card background SVG */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${getCardBackground()})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col gap-4 h-full py-8 px-10">
          {/* Element 1: Recipient */}
          <div className="text-section-title">To. {recipient}</div>

          {/* Element 2: Message */}
          <div className="flex-1 text-body1-medium whitespace-pre-line break-all">
            {message}
          </div>
        </div>
      </div>
    );
  },
);

Card.displayName = "Card";

export default Card;

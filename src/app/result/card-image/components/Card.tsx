import React from "react";

interface CardProps {
  recipient: string;
  message: string;
  cardType?: "default" | "formal" | "cute" | "humorous" | "pop";
}

const Card: React.FC<CardProps> = ({
  recipient,
  message,
  cardType = "default",
}) => {
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

  return (
    <div className="relative w-[440px] h-[490px] shadow-lg overflow-hidden">
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
};

export default Card;

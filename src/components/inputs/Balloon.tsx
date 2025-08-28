import React from "react";

export type BalloonStatus =
  | "default"
  | "clicked"
  | "inputed"
  | "error"
  | "disabled";

interface BalloonProps {
  text: string;
  label?: string;
  status?: BalloonStatus;
  error?: string;
  className?: string;
}

const balloonStyles: Record<BalloonStatus, string> = {
  default: "border-2 border-grey-8 bg-grey-0 text-grey-10",
  clicked: "border-2 border-grey-8 ring-2 ring-grey-8 bg-grey-0 text-grey-10",
  inputed: "border-2 border-grey-8 bg-grey-0 text-grey-10 font-semibold",
  error: "border-2 border-[#FF1919] bg-grey-0 text-[#AB070D]",
  disabled:
    "border-2 border-grey-5 bg-[#F0F0F0] text-grey-5 opacity-60 cursor-not-allowed",
};

const Balloon: React.FC<BalloonProps> = ({
  text,
  label = "핑계킹",
  status = "default",
  error,
  className = "",
}) => {
  return (
    <div
      className={`relative flex items-start w-full h-full max-w-full rounded-3xl px-6 py-3 gap-2 min-h-[60px] ${balloonStyles[status]} ${className}`}
      aria-label="말풍선"
      aria-disabled={status === "disabled"}
      tabIndex={status === "disabled" ? -1 : 0}
    >
      {/* 라벨 */}
      <div className="absolute flex items-center gap-1 left-[23px] -top-2 px-1">
        <div className="absolute left-0 top-[6px] w-[47px] h-[6px] bg-grey-0 rounded z-0" />
        <span
          className={`text-lg font-normal leading-none tracking-tight relative z-10 ${
            status === "disabled" ? "text-grey-5" : "text-grey-10"
          }`}
          style={{
            fontFamily: "Ownglyph RDO ballpen, Pretendard, sans-serif",
          }}
        >
          {label}
        </span>
      </div>
      <div
        className={`h-full break-words font-medium text-base leading-5 text-left ${
          status === "disabled"
            ? "text-grey-5"
            : status === "error"
            ? "text-[#AB070D]"
            : "text-grey-10"
        } flex overflow-y-auto`}
        style={{
          fontFamily: "Pretendard, sans-serif",
        }}
      >
        {text}
      </div>
      {status === "error" && error && (
        <span
          className="absolute left-6 -bottom-6 text-xs text-red-500"
          aria-live="polite"
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default Balloon;

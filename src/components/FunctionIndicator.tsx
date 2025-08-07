import React from "react";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";

export type FunctionIndicatorType = "default" | "selected";
export type FunctionIndicatorState = "default" | "selected" | "disabled";

interface FunctionIndicatorProps {
  type?: FunctionIndicatorType;
  state?: FunctionIndicatorState;
  icon?: React.ReactNode;
  label: string;
  hasChild?: boolean;
  childLabel?: string;
  onClick?: () => void;
  className?: string;
}

const FunctionIndicator: React.FC<FunctionIndicatorProps> = ({
  type = "default",
  state = "default",
  icon,
  label,
  hasChild = false,
  childLabel = "자세히 보기",
  onClick,
  className,
}) => {
  const isDisabled = state === "disabled";
  const isSelected = state === "selected";

  return (
    <button
      type="button"
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      className={clsx(
        "flex items-center gap-2 px-2 py-3 min-w-[287px] transition-all duration-200",
        isSelected
          ? "bg-white text-grey-10 shadow-sm border border-grey-3"
          : "bg-transparent text-grey-10 hover:bg-grey-1",
        isDisabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {/* 왼쪽 아이콘 */}
      {icon && (
        <div className="flex items-center justify-center w-6 h-6 rounded-lg">
          <div className="w-4 h-4 text-grey-10">{icon}</div>
        </div>
      )}

      {/* 중앙 라벨 */}
      <span className="flex-1 text-left text-body2-semibold whitespace-normal">
        {label}
      </span>

      {/* 오른쪽 "자세히 보기" 섹션 */}
      {hasChild && (
        <div className="flex items-center gap-1">
          <span className="text-body4-semibold text-grey-7">{childLabel}</span>
          <ChevronRight
            size={16}
            className="text-grey-7 transition-transform"
          />
        </div>
      )}
    </button>
  );
};

export default FunctionIndicator;

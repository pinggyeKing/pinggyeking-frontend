import React from "react";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";

export type FunctionIndicatorType = "select" | "toggle" | "tag";
export type FunctionIndicatorState =
  | "default"
  | "selected"
  | "active"
  | "disabled";

interface FunctionIndicatorProps {
  type?: FunctionIndicatorType;
  state?: FunctionIndicatorState;
  icon?: React.ReactNode;
  label: string;
  hasChild?: boolean;
  onClick?: () => void;
  className?: string;
}

const FunctionIndicator: React.FC<FunctionIndicatorProps> = ({
  type = "select",
  state = "default",
  icon,
  label,
  hasChild = false,
  onClick,
  className,
}) => {
  const isDisabled = state === "disabled";
  const isSelected = state === "selected" || state === "active";

  return (
    <button
      type="button"
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      className={clsx(
        "flex items-center gap-8 px-12 py-8 transition-all",
        type === "select" && [
          "radius-8",
          isSelected
            ? "bg-primary-0 text-primary-1 shadow-main"
            : "bg-grey-0 text-grey-1 hover:bg-grey-1 hover:text-grey-2",
        ],
        type === "toggle" && [
          "radius-8",
          isSelected
            ? "bg-primary-0 text-primary-1 shadow-main"
            : "bg-grey-0 text-grey-1 hover:bg-grey-1 hover:text-grey-2",
        ],
        type === "tag" && [
          "radius-16",
          isSelected
            ? "bg-primary-0 text-primary-1"
            : "bg-grey-1 text-grey-2 hover:bg-grey-2 hover:text-grey-3",
        ],
        isDisabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {icon && <div className="flex-shrink-0">{icon}</div>}
      <span className="text-section-subtitle whitespace-nowrap flex-1 text-left">
        {label}
      </span>
      {hasChild && (
        <ChevronRight
          size={16}
          className={clsx(
            "flex-shrink-0 transition-transform",
            isSelected ? "text-primary-1" : "text-grey-2"
          )}
        />
      )}
    </button>
  );
};

export default FunctionIndicator;

import React from "react";
import clsx from "clsx";

export type SectionItemType = "card" | "list";

interface SectionItemProps {
  type?: SectionItemType;
  selected?: boolean;
  icon?: React.ReactNode;
  label: string;
  subLabel?: string;
  dropdown?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const SectionItem: React.FC<SectionItemProps> = ({
  type = "card",
  selected = false,
  icon,
  label,
  subLabel,
  dropdown,
  onClick,
  className,
}) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-8 cursor-pointer transition-all",
        type === "card"
          ? [
              "card-radius-16 p-8 min-w-[128px] min-h-[64px]",
              selected
                ? "bg-grey-1 border-2 border-grey-10 shadow-main"
                : "bg-grey-1 border border-grey-3",
            ]
          : [
              "radius-12 p-6 min-w-[320px] min-h-[48px] border",
              selected
                ? "bg-grey-2 border-2 border-grey-10 shadow-main"
                : "bg-grey-0 border-grey-3",
            ],
        className
      )}
      onClick={onClick}
    >
      {icon && <div className="mr-4 flex-shrink-0">{icon}</div>}
      <div className="flex-1 min-w-0">
        <div className="text-group-title truncate">{label}</div>
        {subLabel && (
          <div className="text-body3-regular text-grey-6 truncate">
            {subLabel}
          </div>
        )}
      </div>
      {dropdown && <div className="ml-4">{dropdown}</div>}
      {selected && type === "card" && (
        <div className="absolute top-2 right-2 w-4 h-4 bg-grey-10 rounded-full flex items-center justify-center">
          <span className="block w-2 h-2 bg-grey-0 rounded-full" />
        </div>
      )}
    </div>
  );
};

export default SectionItem;

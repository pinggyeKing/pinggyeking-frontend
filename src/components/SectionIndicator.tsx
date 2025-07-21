import React from "react";
import clsx from "clsx";

export type SectionIndicatorType = "underline" | "pill" | "dot";

interface SectionIndicatorProps {
  type?: SectionIndicatorType;
  sections: string[];
  activeIndex: number;
  onChange: (index: number) => void;
  className?: string;
}

const SectionIndicator: React.FC<SectionIndicatorProps> = ({
  type = "underline",
  sections,
  activeIndex,
  onChange,
  className,
}) => {
  return (
    <div className={clsx("flex gap-16", className)}>
      {sections.map((label, idx) => (
        <button
          key={label}
          type="button"
          className={clsx(
            "relative px-4 py-2 text-section-title transition-all",
            type === "underline" &&
              (idx === activeIndex
                ? "text-grey-10 font-bold border-b-4 border-grey-10"
                : "text-grey-5 border-b-4 border-transparent"),
            type === "pill" &&
              (idx === activeIndex
                ? "bg-grey-0 text-grey-10 radius-24 shadow-main font-bold"
                : "bg-grey-2 text-grey-6 radius-24"),
            type === "dot" &&
              (idx === activeIndex
                ? "text-grey-10 font-bold after:content-[''] after:block after:mx-auto after:mt-1 after:w-2 after:h-2 after:bg-grey-10 after:rounded-full"
                : "text-grey-5")
          )}
          onClick={() => onChange(idx)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default SectionIndicator;

import React from "react";
import clsx from "clsx";

interface SectionItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  subtitle?: string;
}

interface SectionIndicatorProps {
  sections: SectionItem[];
  activeIndex: number;
  onChange: (index: number) => void;
  className?: string;
  showDropdownIcon?: boolean;
}

const SectionIndicator: React.FC<SectionIndicatorProps> = ({
  sections,
  activeIndex,
  onChange,
  className,
  showDropdownIcon = true,
}) => {
  return (
    <div className={clsx("flex flex-col gap-6", className)}>
      {sections.map((section, idx) => (
        <button
          key={section.id}
          type="button"
          className={clsx(
            "flex items-center gap-2 p-3 w-80 rounded-xl border-[1.5px] transition-all duration-200 font-semibold text-base",
            idx === activeIndex
              ? "bg-white border-grey-10 shadow-[1px_4px_16px_0px_rgba(0,0,0,0.08)] text-grey-10"
              : "bg-white border-grey-4 text-grey-6 hover:border-grey-6"
          )}
          onClick={() => onChange(idx)}
        >
          {/* Icon Space */}
          {section.icon && (
            <div className="flex items-center justify-center p-1">
              <div className="w-5 h-5 text-grey-10">{section.icon}</div>
            </div>
          )}

          {/* Label */}
          <span className="flex-1 text-left">{section.label}</span>

          {/* Dropdown Icon */}
          {showDropdownIcon && (
            <div className="w-5 h-5 text-grey-10 flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.833344 0.833374C0.833344 0.833374 7.50001 7.50004 10 10C12.5 7.50004 19.1667 0.833374 19.1667 0.833374"
                  stroke="currentColor"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}

          {/* Subtitle */}
          {section.subtitle && (
            <span
              className={clsx(
                "text-sm ml-auto",
                idx === activeIndex ? "text-grey-7" : "text-grey-5"
              )}
            >
              {section.subtitle}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default SectionIndicator;

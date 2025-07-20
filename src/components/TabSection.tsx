import React from "react";
import SectionIndicator, { SectionIndicatorType } from "./SectionIndicator";

interface TabSectionProps {
  type?: SectionIndicatorType;
  sections: string[];
  activeIndex: number;
  onChange: (index: number) => void;
  className?: string;
  children?: React.ReactNode[];
}

const TabSection: React.FC<TabSectionProps> = ({
  type = "underline",
  sections,
  activeIndex,
  onChange,
  className,
  children,
}) => {
  return (
    <div className={className}>
      <SectionIndicator
        type={type}
        sections={sections}
        activeIndex={activeIndex}
        onChange={onChange}
      />
      <div className="mt-8">
        {Array.isArray(children) ? children[activeIndex] : children}
      </div>
    </div>
  );
};

export default TabSection;

import React from "react";
import SectionIndicator from "./SectionIndicator";

interface SectionItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  subtitle?: string;
}

interface TabSectionProps {
  sections: SectionItem[];
  activeIndex: number;
  onChange: (index: number) => void;
  className?: string;
  children?: React.ReactNode[];
  showDropdownIcon?: boolean;
}

const TabSection: React.FC<TabSectionProps> = ({
  sections,
  activeIndex,
  onChange,
  className,
  children,
  showDropdownIcon = true,
}) => {
  return (
    <div className={className}>
      <SectionIndicator
        sections={sections}
        activeIndex={activeIndex}
        onChange={onChange}
        showDropdownIcon={showDropdownIcon}
      />
      <div className="mt-8">
        {Array.isArray(children) ? children[activeIndex] : children}
      </div>
    </div>
  );
};

export default TabSection;

import React from "react";
import SelectedItemBorder from "./SelectedItemBorder";

export interface PickerOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface PickerProps {
  options: PickerOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const Picker: React.FC<PickerProps> = ({
  options,
  value,
  onChange,
  className = "",
}) => {
  return (
    <div
      className={`w-[400px] bg-white rounded-[24px] shadow-md p-[5px] flex flex-col gap-[5px] ${className}`}
      role="listbox"
    >
      {options.map((option) => {
        const selected = value === option.value;

        return (
          <div
            key={option.value}
            role="option"
            aria-selected={selected}
            aria-disabled={option.disabled}
            tabIndex={option.disabled ? -1 : 0}
            className="outline-none"
            onClick={() => !option.disabled && onChange(option.value)}
          >
            {selected ? (
              <SelectedItemBorder>{option.label}</SelectedItemBorder>
            ) : (
              <div
                className={`w-full h-12 flex items-center justify-center rounded-[12px] text-[16px] font-semibold transition-all duration-150 cursor-pointer border-[1.5px] border-[#E4E4E4] bg-[#FFFFFF] text-[#8E8E8E]
                  ${
                    option.disabled
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:border-[#1E1E1E] hover:text-[#1E1E1E] focus:border-[#1E1E1E] focus:text-[#1E1E1E]"
                  }
                  `}
                style={{
                  fontFamily: "Pretendard, sans-serif",
                }}
              >
                {option.label}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Picker;

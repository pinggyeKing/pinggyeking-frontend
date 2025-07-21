import React from 'react';

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
  className = '',
}) => {
  return (
    <ul
      className={`w-[400px] bg-white rounded-[24px] shadow-md p-0 m-0 flex flex-col gap-[5px] ${className}`}
      role="listbox"
    >
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <li
            key={option.value}
            role="option"
            aria-selected={selected}
            aria-disabled={option.disabled}
            tabIndex={option.disabled ? -1 : 0}
            className={`flex items-center justify-center px-0 py-0 outline-none`}
          >
            <button
              type="button"
              disabled={option.disabled}
              onClick={() => !option.disabled && onChange(option.value)}
              className={`w-full flex items-center justify-center gap-2 px-0 py-0 rounded-[12px] border font-semibold text-[16px] transition-all duration-150
                ${
                  selected
                    ? 'border-[2px] border-[#1E1E1E] bg-[#FFF] text-[#1E1E1E] shadow-[1px_4px_16px_0_rgba(0,0,0,0.08)]'
                    : 'border-[1.5px] border-[#E4E4E4] bg-[#FFF] text-[#8E8E8E]'
                }
                ${
                  option.disabled
                    ? 'opacity-60 cursor-not-allowed'
                    : 'hover:border-[#1E1E1E] hover:text-[#1E1E1E] focus:border-[#1E1E1E] focus:text-[#1E1E1E]'
                }
                `}
              style={{
                width: '100%',
                padding: '12px',
                fontFamily: 'Pretendard, sans-serif',
                borderRadius: 12,
                minHeight: 48,
              }}
            >
              {option.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Picker;

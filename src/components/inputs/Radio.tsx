import React from 'react';

interface RadioProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

const Radio: React.FC<RadioProps> = ({
  checked,
  onChange,
  label = '',
  disabled = false,
  className = '',
}) => {
  return (
    <label
      className={`inline-flex items-center gap-2 cursor-pointer select-none ${
        disabled ? 'opacity-60 cursor-not-allowed' : ''
      } ${className}`}
      aria-disabled={disabled}
    >
      <span className="relative flex items-center justify-center w-6 h-6 min-w-[24px] min-h-[24px]">
        <input
          type="radio"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="absolute w-full h-full opacity-0 cursor-pointer m-0"
          tabIndex={disabled ? -1 : 0}
          aria-checked={checked}
        />
        <span
          className={`block w-6 h-6 rounded-full border-[2.25px] transition-colors duration-150 ${
            disabled
              ? 'border-[var(--grey-4,#CBCBCB)] bg-[var(--grey-0,#FFF)]'
              : checked
              ? 'border-[var(--grey-8,#1E1E1E)] bg-[var(--grey-0,#FFF)]'
              : 'border-[var(--grey-4,#CBCBCB)] bg-[var(--grey-0,#FFF)]'
          }`}
        >
          {checked && (
            <span className="block absolute left-1/2 top-1/2 w-3 h-3 rounded-full bg-[var(--grey-8,#1E1E1E)] -translate-x-1/2 -translate-y-1/2" />
          )}
        </span>
      </span>
      {label && (
        <span
          className="text-[16px] font-medium"
          style={{
            fontFamily: 'Pretendard, sans-serif',
            color: disabled ? 'var(--grey-4,#CBCBCB)' : 'var(--grey-8,#1E1E1E)',
          }}
        >
          {label}
        </span>
      )}
    </label>
  );
};

export default Radio;

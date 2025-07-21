import React from 'react';

export type CheckboxSize = 'small' | 'medium';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: CheckboxSize;
  className?: string;
}

const sizeStyle = {
  small: 'w-4 h-4 text-[12px]',
  medium: 'w-5 h-5 text-[16px]',
};

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label = '',
  disabled = false,
  size = 'medium',
  className = '',
}) => {
  return (
    <label
      className={`inline-flex items-center gap-2 cursor-pointer select-none ${
        disabled ? 'opacity-60 cursor-not-allowed' : ''
      } ${className}`}
      aria-disabled={disabled}
    >
      <span
        className={`relative flex items-center justify-center ${sizeStyle[size]} rounded-[5px] border-[2px] border-[var(--grey-8,#4E4E4E)] bg-[var(--grey-0,#FFF)] transition-colors duration-150`}
        style={{
          minWidth: size === 'small' ? 16 : 20,
          minHeight: size === 'small' ? 16 : 20,
        }}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="absolute w-full h-full opacity-0 cursor-pointer m-0"
          tabIndex={disabled ? -1 : 0}
          aria-checked={checked}
        />
        {checked && (
          <svg
            width={size === 'small' ? 12 : 16}
            height={size === 'small' ? 12 : 16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none"
          >
            <rect
              x="0"
              y="0"
              width="16"
              height="16"
              rx="4"
              fill="var(--grey-8,#4E4E4E)"
            />
            <path
              d="M4 8.5L7 11.5L12 5.5"
              stroke="var(--grey-0,#FFF)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      {label && (
        <span
          className={
            size === 'small'
              ? 'text-[12px] font-medium'
              : 'text-[16px] font-medium'
          }
          style={{
            fontFamily: 'Pretendard, sans-serif',
            color: 'var(--grey-8,#4E4E4E)',
          }}
        >
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;

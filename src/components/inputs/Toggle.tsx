import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

const Toggle: React.FC<ToggleProps> = ({
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
      <span
        className="relative flex items-center"
        style={{ minWidth: 44, minHeight: 24 }}
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
        <span
          className={`block w-11 h-6 rounded-[12px] transition-colors duration-200 flex items-center ${
            checked
              ? 'bg-[var(--grey-4,#CBCBCB)] justify-end pr-6 pl-0'
              : 'bg-[#1E1E1E] justify-end pr-6 pl-0'
          }`}
          style={{
            padding: checked ? '2px 2px 2px 24px' : '2px 24px 2px 2px',
            boxShadow: checked
              ? '0px 4px 12px 0px rgba(0,0,0,0.04)'
              : '1px 4px 16px 0px rgba(0,0,0,0.08)',
          }}
        >
          <span
            className={`block w-5 h-5 rounded-full transition-all duration-200 bg-[#FFF] shadow-md`}
            style={{
              boxShadow: '1px 4px 16px 0px rgba(0,0,0,0.08)',
              borderRadius: 12,
            }}
          />
        </span>
      </span>
      {label && (
        <span
          className="text-[16px] font-medium"
          style={{
            fontFamily: 'Pretendard, sans-serif',
            color: 'var(--grey-8,#1E1E1E)',
          }}
        >
          {label}
        </span>
      )}
    </label>
  );
};

export default Toggle;

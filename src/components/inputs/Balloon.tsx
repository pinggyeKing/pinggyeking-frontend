import React from 'react';

export type BalloonStatus =
  | 'default'
  | 'clicked'
  | 'inputed'
  | 'error'
  | 'disabled';

interface BalloonProps {
  text: string;
  label?: string;
  status?: BalloonStatus;
  error?: string;
  className?: string;
}

const borderStyle: Record<BalloonStatus, string> = {
  default: 'border-[2px] border-[var(--grey-8,#4E4E4E)]',
  clicked:
    'border-[2px] border-[var(--grey-8,#4E4E4E)] ring-2 ring-[var(--grey-8,#4E4E4E)]',
  inputed: 'border-[2px] border-[var(--grey-8,#4E4E4E)] font-semibold',
  error: 'border-[2px] border-[#FF1919]',
  disabled:
    'border-[2px] border-[var(--grey-5,#B5B5B5)] opacity-60 cursor-not-allowed',
};

const bgStyle: Record<BalloonStatus, string> = {
  default: 'bg-[var(--grey-0,#FFF)] text-[#1E1E1E]',
  clicked: 'bg-[var(--grey-0,#FFF)] text-[#1E1E1E]',
  inputed: 'bg-[var(--grey-0,#FFF)] text-[#1E1E1E]',
  error: 'bg-[var(--grey-0,#FFF)] text-[#AB070D]',
  disabled: 'bg-[#F0F0F0] text-[#B5B5B5]',
};

const Balloon: React.FC<BalloonProps> = ({
  text,
  label = '핑계킹',
  status = 'default',
  error,
  className = '',
}) => {
  return (
    <div
      className={`relative flex items-center w-[335px] max-w-full rounded-[24px] px-6 py-5 gap-2 ${borderStyle[status]} ${bgStyle[status]} ${className}`}
      style={{ minHeight: 60, padding: '20px 24px', borderRadius: 24 }}
      aria-label="말풍선"
      aria-disabled={status === 'disabled'}
      tabIndex={status === 'disabled' ? -1 : 0}
    >
      {/* 라벨 */}
      <div
        className="absolute flex items-center gap-1"
        style={{
          left: 23,
          top: -8,
          padding: '0px 4px',
        }}
      >
        <div
          className="bg-[var(--grey-0,#FFF)] rounded"
          style={{
            position: 'absolute',
            left: 0,
            top: 6,
            width: 47,
            height: 6,
            zIndex: 0,
          }}
        />
        <span
          className="text-[18px] font-normal leading-[1em] tracking-tight"
          style={{
            fontFamily: 'Ownglyph RDO ballpen, Pretendard, sans-serif',
            fontWeight: 400,
            color: status === 'disabled' ? '#B5B5B5' : '#1E1E1E',
            fontSize: 18,
            lineHeight: '1em',
            letterSpacing: '-0.5px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {label}
        </span>
      </div>
      <span
        className="break-words"
        style={{
          fontFamily: 'Pretendard, sans-serif',
          fontWeight: 500,
          fontSize: 16,
          lineHeight: '1.25em',
          textAlign: 'left',
          color:
            status === 'disabled'
              ? '#B5B5B5'
              : status === 'error'
              ? '#AB070D'
              : '#1E1E1E',
        }}
      >
        {text}
      </span>
      {status === 'error' && error && (
        <span
          className="absolute left-6 -bottom-6 text-xs text-red-500"
          aria-live="polite"
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default Balloon;

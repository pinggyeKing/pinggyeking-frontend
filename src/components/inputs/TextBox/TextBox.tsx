import React, { useState } from 'react';
import { TextBoxStatusProps } from './types';

interface EditableTextBoxProps extends TextBoxStatusProps {
  editable?: boolean;
  onChange?: (value: string) => void;
}

const statusStyle = {
  default: 'text-gray-900',
  clicked: 'text-gray-900',
  inputed: 'text-gray-900',
  error: 'text-red-600',
  success: 'text-green-600',
};

const borderStyle =
  "bg-[url('/icons/wavy-border-input.svg')] bg-no-repeat bg-contain bg-center overflow-hidden min-h-[40px] min-w-[120px] max-w-full max-h-[220px]";

const TextBox: React.FC<EditableTextBoxProps> = ({
  value,
  author = 'you',
  multiline = false,
  time,
  status = 'default',
  error,
  success,
  className = '',
  editable = false,
  onChange,
}) => {
  const isMe = author === 'me';
  const [isFocused, setIsFocused] = useState(false);
  const effectiveStatus = editable && isFocused ? 'clicked' : status;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!editable) return;
    if (e.key === 'Enter' || e.key === ' ') {
      setIsFocused(true);
    }
  };

  return (
    <div
      className={`flex ${
        isMe ? 'justify-end' : 'justify-start'
      } w-full mb-2 ${className}`}
      aria-label={isMe ? '내 메시지' : '상대 메시지'}
    >
      <div className={`max-w-[80%] ${isMe ? 'items-end' : 'items-start'}`}>
        {time && (
          <span className="text-xs text-gray-400 mb-1" aria-label="메시지 시간">
            {time}
          </span>
        )}
        <div
          className={`relative ${borderStyle} w-[339px] h-[64px] pt-[20px] pb-[20px] pl-[24px] pr-[24px]`}
          style={{ boxSizing: 'border-box' }}
        >
          {editable ? (
            multiline ? (
              <textarea
                className={`w-[291px] h-[24px] bg-transparent border-none outline-none resize-none text-base font-medium transition-colors duration-150 ${statusStyle[effectiveStatus]} text-left self-start`}
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                aria-label="메시지 입력"
                rows={1}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="메시지를 입력하세요"
                tabIndex={0}
                style={{ boxSizing: 'border-box' }}
              />
            ) : (
              <input
                className={`w-[291px] h-[24px] bg-transparent border-none outline-none text-base font-medium transition-colors duration-150 ${statusStyle[effectiveStatus]} text-left self-start`}
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                aria-label="메시지 입력"
                type="text"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="메시지를 입력하세요"
                tabIndex={0}
                style={{ boxSizing: 'border-box' }}
              />
            )
          ) : (
            <div
              className={`w-[291px] h-[24px] bg-transparent border-none outline-none text-base font-medium whitespace-pre-line transition-colors duration-150 ${statusStyle[status]} text-left self-start`}
              tabIndex={0}
              aria-label={value}
              role="textbox"
              onKeyDown={handleKeyDown}
              style={{ boxSizing: 'border-box' }}
            >
              {value}
            </div>
          )}
        </div>
        {error && status === 'error' && (
          <span className="text-xs text-red-500 mt-1" aria-live="polite">
            {error}
          </span>
        )}
        {success && status === 'success' && (
          <span className="text-xs text-green-500 mt-1" aria-live="polite">
            {success}
          </span>
        )}
      </div>
    </div>
  );
};

export default TextBox;

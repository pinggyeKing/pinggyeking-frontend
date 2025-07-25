import React, { useState, useRef, useEffect } from 'react';
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
  const [isEditing, setIsEditing] = useState(false);
  const [internalValue, setInternalValue] = useState(value || '');
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setInternalValue(value || '');
  }, [value]);

  // 읽기 모드에서 클릭/엔터/스페이스로 입력 모드 전환
  const handleReadClick = () => {
    if (!editable) return;
    setIsEditing(true);
    setIsFocused(true);
  };
  const handleReadKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!editable) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsEditing(true);
      setIsFocused(true);
    }
  };

  // 입력 모드에서 blur 또는 Enter(한줄) 시 읽기 모드로 복귀
  const handleInputBlur = () => {
    setIsEditing(false);
    setIsFocused(false);
    if (onChange) onChange(internalValue);
  };
  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      setIsEditing(false);
      setIsFocused(false);
      if (onChange) onChange(internalValue);
    }
  };

  // 입력 모드일 때 보더 빨간색
  const dynamicBorder = isEditing ? 'ring-2 ring-red-500' : '';

  return (
    <div className={`max-w-[80%] ${isMe ? 'items-end' : 'items-start'}`}>
      {time && (
        <span className="text-xs text-gray-400 mb-1" aria-label="메시지 시간">
          {time}
        </span>
      )}
      <div
        className={`relative ${borderStyle} w-[339px] h-[64px] pt-[20px] pb-[20px] pl-[24px] pr-[24px] ${dynamicBorder}`}
        style={{ boxSizing: 'border-box' }}
      >
        {isEditing ? (
          multiline ? (
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              className={`w-[291px] h-[24px] bg-transparent border-none outline-none resize-none text-base font-medium transition-colors duration-150 ${statusStyle[status]} text-left self-start`}
              value={internalValue}
              onChange={(e) => setInternalValue(e.target.value)}
              aria-label="메시지 입력"
              rows={1}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              placeholder="메시지를 입력하세요"
              tabIndex={0}
              style={{ boxSizing: 'border-box' }}
            />
          ) : (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              className={`w-[291px] h-[24px] bg-transparent border-none outline-none text-base font-medium transition-colors duration-150 ${statusStyle[status]} text-left self-start`}
              value={internalValue}
              onChange={(e) => setInternalValue(e.target.value)}
              aria-label="메시지 입력"
              type="text"
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              placeholder="메시지를 입력하세요"
              tabIndex={0}
              style={{ boxSizing: 'border-box' }}
            />
          )
        ) : (
          <div
            className={`w-[291px] h-[24px] bg-transparent border-none outline-none text-base font-medium whitespace-pre-line transition-colors duration-150 ${statusStyle[status]} text-left self-start cursor-pointer`}
            tabIndex={0}
            aria-label={internalValue}
            role="textbox"
            onClick={handleReadClick}
            onKeyDown={handleReadKeyDown}
            style={{ boxSizing: 'border-box' }}
          >
            {internalValue}
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
  );
};

export default TextBox;

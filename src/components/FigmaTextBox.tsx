"use client";

import React, { useState, useRef, useEffect } from "react";

export type TextInputStatus = "default" | "clicked" | "inputed" | "error";

interface TextInputProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  status?: TextInputStatus;
  error?: string;
  multiline?: boolean;
  maxLength?: number;
  className?: string;
  editable?: boolean;
}

const statusStyles = {
  default: {
    border: "border-grey-4",
    background: "bg-white",
    text: "text-grey-5",
  },
  clicked: {
    border: "border-grey-8",
    background: "bg-white",
    text: "text-grey-10",
  },
  inputed: {
    border: "border-grey-8",
    background: "bg-white",
    text: "text-grey-10",
  },
  error: {
    border: "border-red-4",
    background: "bg-white",
    text: "text-grey-4",
  },
};

const FigmaTextBox: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder = "상황 입력",
  status = "default",
  error,
  multiline = false,
  maxLength = 500,
  className = "",
  editable = true,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(value || "");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setInternalValue(value || "");
  }, [value]);

  const currentStatus = isFocused
    ? "clicked"
    : internalValue
    ? "inputed"
    : status;
  const styles = statusStyles[currentStatus];

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onChange) onChange(internalValue);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    if (maxLength && newValue.length > maxLength) return;
    setInternalValue(newValue);
    if (onChange) onChange(newValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (!multiline && e.key === "Enter" && onChange) {
      onChange(internalValue);
    }
  };

  return (
    <div className={`w-full h-full ${className}`}>
      <div
        className={`
        relative rounded-[24px] border-2 transition-all duration-200 h-full
        ${styles.border} ${styles.background}
        ${editable ? "cursor-text" : "cursor-default"}
      `}
      >
        {/* 입력 영역 */}
        <div className="px-6 py-5 h-full">
          {multiline ? (
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={internalValue}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              disabled={!editable}
              maxLength={maxLength}
              className={`
                w-full min-h-[24px] max-h-[160px] resize-none 
                bg-transparent border-none outline-none
                text-base ${internalValue ? "text-grey-10" : styles.text}
                placeholder:text-grey-4 placeholder:text-body2-medium
                ${!editable ? "cursor-default" : ""}
              `}
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontSize: "16px",
                lineHeight: "1.25",
              }}
            />
          ) : (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type="text"
              value={internalValue}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              disabled={!editable}
              maxLength={maxLength}
              className={`
                w-full h-[24px] bg-transparent border-none outline-none
                text-base ${
                  internalValue ? "text-grey-10 font-semibold" : styles.text
                }
                placeholder:text-grey-4 placeholder:text-body2-medium
                ${!editable ? "cursor-default" : ""}
              `}
            />
          )}
        </div>
      </div>

      {/* 에러 메시지 */}
      {error && status === "error" && (
        <div className="flex items-center gap-1 mt-1">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1.75C4.1 1.75 1.75 4.1 1.75 7C1.75 9.9 4.1 12.25 7 12.25C9.9 12.25 12.25 9.9 12.25 7C12.25 4.1 9.9 1.75 7 1.75ZM7.7 9.8H6.3V8.4H7.7V9.8ZM7.7 7H6.3V4.2H7.7V7Z"
              fill="#ab070d"
            />
          </svg>
          <span className="text-red-4 text-xs font-semibold">{error}</span>
        </div>
      )}
    </div>
  );
};

export default FigmaTextBox;

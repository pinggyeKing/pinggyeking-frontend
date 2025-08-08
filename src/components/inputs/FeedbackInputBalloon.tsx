"use client";

import React, { useState, useRef, useEffect } from "react";

interface EvalInputBalloonProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const FeedbackInputBalloon: React.FC<EvalInputBalloonProps> = ({
  value,
  onChange,
  placeholder = "어떤 점이 만족스럽나요?",
  className = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(value || "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setInternalValue(value || "");
  }, [value]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    onChange(internalValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInternalValue(e.target.value);
  };

  // 텍스트에 따라 높이 자동 조절
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [internalValue]);

  return (
    <div
      className={`relative flex items-stretch w-full rounded-[24px] px-6 py-5 gap-2 border-2 transition-colors duration-150 ${
        isFocused ? "border-grey-5 bg-grey-2" : "border-grey-5 bg-grey-2"
      } ${className}`}
      style={{
        minHeight: 60,
        padding: "20px 24px",
        borderRadius: 24,
        background: "var(--grey-2)",
        borderColor: "var(--grey-5)",
      }}
    >
      <textarea
        ref={textareaRef}
        className="w-full bg-transparent border-none outline-none resize-none text-base font-medium transition-colors duration-150 text-grey-10 placeholder-grey-5"
        value={internalValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        rows={1}
        style={{
          fontFamily: "Pretendard, sans-serif",
          fontWeight: 500,
          fontSize: 16,
          lineHeight: "1.25em",
          textAlign: "left",
          color: "var(--grey-10)",
          minHeight: "20px",
          maxHeight: "120px",
          overflow: "hidden",
        }}
        aria-label="평가 피드백 입력"
        tabIndex={0}
      />
    </div>
  );
};

export default FeedbackInputBalloon;

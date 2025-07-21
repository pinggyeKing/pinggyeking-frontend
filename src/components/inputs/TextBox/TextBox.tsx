import React from 'react';
import { TextBoxStatusProps } from './types';

const statusStyle = {
  default: 'bg-white border-gray-300 text-gray-900',
  clicked: 'bg-gray-50 border-gray-800 text-gray-900',
  inputed: 'bg-white border-gray-800 text-gray-900',
  error: 'bg-white border-red-500 text-red-600',
  success: 'bg-white border-green-500 text-green-600',
};

const TextBox: React.FC<TextBoxStatusProps> = ({
  value,
  author = 'you',
  multiline = false,
  time,
  status = 'default',
  error,
  success,
  className = '',
}) => {
  const isMe = author === 'me';
  return (
    <div
      className={`flex ${
        isMe ? 'justify-end' : 'justify-start'
      } w-full mb-2 ${className}`}
      aria-label={isMe ? '내 메시지' : '상대 메시지'}
    >
      <div
        className={`flex flex-col max-w-[80%] ${
          isMe ? 'items-end' : 'items-start'
        }`}
      >
        {time && (
          <span className="text-xs text-gray-400 mb-1" aria-label="메시지 시간">
            {time}
          </span>
        )}
        <div
          className={`rounded-2xl px-4 py-2 shadow text-base font-medium whitespace-pre-line border-2 min-h-[40px] transition-colors duration-150
            ${statusStyle[status]}
            ${multiline ? 'min-h-[60px]' : ''}
            ${isMe ? 'bg-gray-100' : ''}
          `}
          tabIndex={0}
          aria-label={value}
        >
          {value}
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

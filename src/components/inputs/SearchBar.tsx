import React, { useState, KeyboardEvent } from 'react';
import { Search } from 'lucide-react';

export type SearchBarProps = {
  value: string;
  onChange: (v: string) => void;
  onSearch?: (v: string) => void;
  placeholder?: string;
  error?: string;
  className?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search...',
  error,
  className = '',
}) => {
  const [focused, setFocused] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div
      className={`w-full max-w-[400px] flex items-center gap-2 px-4 py-3 rounded-2xl border transition-colors bg-white shadow-sm ${
        error
          ? 'border-red-500'
          : focused
          ? 'border-gray-800 bg-gray-50'
          : 'border-gray-300'
      } ${className}`}
    >
      <Search className="w-5 h-5 text-gray-500" aria-hidden />
      <input
        type="text"
        className="flex-1 bg-transparent outline-none text-base font-medium placeholder-gray-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label={placeholder}
        aria-invalid={!!error}
      />
    </div>
  );
};

export default SearchBar;

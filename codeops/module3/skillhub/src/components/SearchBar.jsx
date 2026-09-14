import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = "Search courses, topics, tech (e.g. React, Python, AWS)...",
  className = "",
  autoFocus = false
}) => {
  return (
    <div className={`search-input-wrapper ${className}`}>
      <Search className="search-icon-left" size={20} />
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus={autoFocus}
      />
      {value && (
        <button
          type="button"
          className="search-clear-btn"
          onClick={() => (onClear ? onClear() : onChange(''))}
          aria-label="Clear search text"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;

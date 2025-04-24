import React, { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Search = ({ onSearch }) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Command/Control + F to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      // Escape to clear search
      if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        setValue('');
        onSearch('');
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSearch]);

  const handleChange = (e) => {
    setValue(e.target.value);
    onSearch(e.target.value);
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
    inputRef.current?.focus();
  };

/*   return (
    <div className="relative w-full max-w-md">
      <div
        className={`
          relative flex items-center w-full h-9 px-3
          bg-white/90 dark:bg-gray-800/90
          border border-gray-200 dark:border-gray-700
          rounded-md shadow-sm
          transition-all duration-200
          ${isFocused ? 'ring-2 ring-blue-500 border-transparent' : ''}
        `}
      >
        <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
        
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search files and folders..."
          className="
            w-full ml-2 bg-transparent
            text-sm text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none
          "
        />

        {value && (
          <button
            onClick={handleClear}
            className="
              p-0.5 rounded-full
              hover:bg-gray-100 dark:hover:bg-gray-700
              transition-colors duration-200
            "
          >
            <XMarkIcon className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      <div className="absolute mt-1 text-xs text-gray-400 dark:text-gray-500 left-0">
        Press ⌘F to search
      </div>
    </div>
  ); */
};

export default Search; 
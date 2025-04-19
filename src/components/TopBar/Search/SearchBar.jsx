import React, { useState } from 'react';
import { MagnifyingGlassIcon as SearchIcon } from '@heroicons/react/24/outline';

const SearchBar = ({ onSearch, placeholder }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center bg-black rounded-lg px-3 py-1">
        <SearchIcon className="w-5 h-5 text-white" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="bg-transparent border-none outline-none text-white ml-2 w-64 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
      </div>
    </form>
  );
};

export default SearchBar; 
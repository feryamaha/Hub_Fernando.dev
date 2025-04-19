import React from 'react';
import SearchBar from './SearchBar';
import { MagnifyingGlassIcon as SearchIcon } from '@heroicons/react/24/outline';

const GoogleSearch = () => {
  const handleSearch = (query) => {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(searchUrl, '_blank');
  };

  return (
    <div className="flex items-center space-x-2">
      <SearchIcon className="w-5 h-5 text-blue-500" />
      <SearchBar
        onSearch={handleSearch}
        placeholder="Buscar no Google..."
      />
    </div>
  );
};

export default GoogleSearch; 
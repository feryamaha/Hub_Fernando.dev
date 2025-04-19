import React from 'react';
import SearchBar from './SearchBar';
import { PlayIcon } from '@heroicons/react/24/outline';

const YouTubeSearch = () => {
  const handleSearch = (query) => {
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    window.open(searchUrl, '_blank');
  };

  return (
    <div className="flex items-center space-x-2">
      <PlayIcon className="w-5 h-5 text-red-500" />
      <SearchBar
        onSearch={handleSearch}
        placeholder="Buscar no YouTube..."
      />
    </div>
  );
};

export default YouTubeSearch; 
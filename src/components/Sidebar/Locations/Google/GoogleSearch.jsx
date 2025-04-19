import React, { useState, useCallback } from 'react';
import { MagnifyingGlassIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../../../hooks/useTheme';
import { searchGoogle } from '../../../../services/googleService';
import debounce from 'lodash/debounce';

const GoogleSearch = () => {
  const [theme] = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const [viewportSize, setViewportSize] = useState('default');
  const [error, setError] = useState(null);

  const debouncedSearch = useCallback(
    debounce(async (term) => {
      if (!term.trim()) return;

      setIsSearching(true);
      setError(null);

      try {
        const results = await searchGoogle(term);
        setSearchResults(results);
      } catch (error) {
        console.error('Erro na pesquisa:', error);
        setError(error.message);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 500),
    []
  );

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      debouncedSearch(searchTerm);
    }
  };

  const handleResultClick = (result) => {
    setSelectedResult(result);
    setViewportSize('default');
  };

  const handleBack = () => {
    setSelectedResult(null);
    setViewportSize('default');
  };

  const handleViewportControl = (action) => {
    switch (action) {
      case 'close':
        setSelectedResult(null);
        setViewportSize('closed');
        break;
      case 'minimize':
        setViewportSize('default');
        break;
      case 'maximize':
        setViewportSize('maximized');
        break;
      default:
        break;
    }
  };

  const getViewportClass = () => {
    switch (viewportSize) {
      case 'maximized':
        return 'fixed inset-0 z-40';
      case 'default':
        return 'w-full h-full';
      default:
        return '';
    }
  };

  const controlButtonsClass = "w-3 h-3 rounded-full transition-colors relative group";
  const controlButtonBg = "absolute inset-0 rounded-full bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity";

  return (
    <div className={`h-full flex flex-col bg-finder-window theme-${theme}`}>
      <div className="bg-finder-sidebar border-b border-finder-border p-2">
        <div className="flex items-center space-x-3">
          {selectedResult && (
            <button
              onClick={handleBack}
              className="p-1 rounded-md hover:bg-finder-hover text-finder-text-secondary hover:text-finder-accent transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
          )}
          <div className="w-8 h-8 rounded-full flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#4285F4" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-finder-text font-medium">Google Search</h2>
            <p className="text-finder-text-secondary text-sm">Pesquise sem sair do portfolio</p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        <form onSubmit={handleSearch} className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar no Google..."
            className="flex-1 px-4 py-2 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-all duration-200"
          />
          <button
            type="submit"
            className="p-2 text-white hover:bg-gray-700 rounded-lg"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </form>
        <div className="flex-1 overflow-hidden">
          {isSearching ? (
            <div className="flex items-center justify-center text-finder-text-secondary h-full">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Pesquisando...
            </div>
          ) : selectedResult ? (
            <>
              {viewportSize === 'maximized' && (
                <div className="fixed top-4 left-4 flex items-center space-x-2 z-50 p-2 rounded-lg bg-black bg-opacity-20">
                  <button onClick={() => handleViewportControl('close')} className={controlButtonsClass} title="Fechar">
                    <div className="bg-[#FF5F57] hover:bg-[#FF5F57]/80 w-full h-full rounded-full" />
                    <div className={controlButtonBg} />
                  </button>
                  <button onClick={() => handleViewportControl('minimize')} className={controlButtonsClass} title="Minimizar">
                    <div className="bg-[#FFBD2E] hover:bg-[#FFBD2E]/80 w-full h-full rounded-full" />
                    <div className={controlButtonBg} />
                  </button>
                  <button onClick={() => handleViewportControl('maximize')} className={controlButtonsClass} title="Maximizar">
                    <div className="bg-[#28C840] hover:bg-[#28C840]/80 w-full h-full rounded-full" />
                    <div className={controlButtonBg} />
                  </button>
                </div>
              )}
              <div className={`bg-finder-window rounded-lg shadow-lg transition-all duration-300 ${getViewportClass()}`}>
                <div className="bg-finder-search rounded-t-lg p-3 flex items-center justify-between">
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="text-finder-accent font-medium truncate">{selectedResult.title}</h3>
                    <p className="text-finder-text-secondary text-sm truncate">{selectedResult.link}</p>
                  </div>
                  {viewportSize !== 'maximized' && (
                    <div className="flex items-center space-x-2 bg-black bg-opacity-20 p-2 rounded-lg">
                      <button onClick={() => handleViewportControl('close')} className={controlButtonsClass} title="Fechar">
                        <div className="bg-[#FF5F57] hover:bg-[#FF5F57]/80 w-full h-full rounded-full" />
                        <div className={controlButtonBg} />
                      </button>
                      <button onClick={() => handleViewportControl('minimize')} className={controlButtonsClass} title="Minimizar">
                        <div className="bg-[#FFBD2E] hover:bg-[#FFBD2E]/80 w-full h-full rounded-full" />
                        <div className={controlButtonBg} />
                      </button>
                      <button onClick={() => handleViewportControl('maximize')} className={controlButtonsClass} title="Maximizar">
                        <div className="bg-[#28C840] hover:bg-[#28C840]/80 w-full h-full rounded-full" />
                        <div className={controlButtonBg} />
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex-1 bg-finder-search" style={{ height: 'calc(100vh - 180px)' }}>
                  <iframe
                    src={selectedResult.link}
                    title={selectedResult.title}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              </div>
            </>
          ) : searchResults ? (
            <div className="space-y-6 max-w-2xl mx-auto">
              {error ? (
                <div className="flex items-center justify-center text-red-500">
                  <p>{error}</p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="flex items-center justify-center text-finder-text-secondary">
                  <p>Nenhum resultado encontrado</p>
                </div>
              ) : (
                searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleResultClick(result)}
                    className="w-full text-left p-4 bg-finder-search rounded-lg hover:bg-finder-hover 
                             transition-colors border border-transparent hover:border-[#4285F4]"
                  >
                    <div className="flex">
                      {result.thumbnail && (
                        <div className="relative w-32 h-24 flex-shrink-0 mr-4">
                          <img src={result.thumbnail} alt={result.title} className="w-full h-full object-cover rounded" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-[#4285F4] font-medium mb-1 hover:underline">{result.title}</h3>
                        <p className="text-finder-text-secondary text-sm mb-2 truncate">{result.link}</p>
                        <p className="text-finder-text line-clamp-2">{result.snippet}</p>
                        {result.date && (
                          <p className="text-finder-text-secondary text-sm mt-2">
                            {new Date(result.date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default GoogleSearch;
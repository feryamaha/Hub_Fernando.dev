import React, { useState, useRef, useCallback } from 'react';
import { FaYoutube } from 'react-icons/fa';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../../../hooks/useTheme';
import { searchVideos } from '../../../../services/youtubeService';
import debounce from 'lodash/debounce';

const Youtube = () => {
    const [theme] = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [viewportSize, setViewportSize] = useState('default');
    const [error, setError] = useState(null);
    const isSearching = useRef(false);

    const debouncedSearch = useCallback(
        debounce(async (term) => {
            if (!term.trim() || isSearching.current) return;

            isSearching.current = true;
            setIsLoading(true);
            setError(null);

            try {
                const results = await searchVideos(term);
                setSearchResults(results);
            } catch (error) {
                console.error('Erro na pesquisa:', error);
                setError(error.message);
                setSearchResults([]);
            } finally {
                setIsLoading(false);
                isSearching.current = false;
            }
        }, 500),
        []
    );

    const handleSearch = (e) => {
        e.preventDefault();
        debouncedSearch(searchTerm);
    };

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
        setViewportSize('default');
    };

    const handleBack = () => {
        setSelectedVideo(null);
        setViewportSize('default');
    };

    const handleViewportControl = (action) => {
        switch (action) {
            case 'close':
                setSelectedVideo(null);
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

    const controlButtonsClass = 'w-3 h-3 rounded-full transition-colors relative group';
    const controlButtonBg = 'absolute inset-0 rounded-full bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity';

    return (
        <div className={`h-full flex flex-col bg-finder-window theme-${theme}`}>
            {/* Header */}
            <div className="bg-finder-sidebar border-b border-finder-border p-2">
                <div className="flex items-center space-x-3">
                    {selectedVideo && (
                        <button
                            onClick={handleBack}
                            className="p-1 rounded-md hover:bg-finder-hover text-finder-text-secondary hover:text-finder-accent transition-colors"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}
                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                        <FaYoutube className="text-2xl text-red-600" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-finder-text font-medium">YouTube</h2>
                        <p className="text-finder-text-secondary text-sm">Assista vídeos sem sair do portfólio</p>
                    </div>
                </div>
            </div>

            {/* Search Area */}
            <div className="flex-1 flex flex-col p-4 overflow-hidden">
                {selectedVideo ? (
                    <>
                        {/* Control buttons for maximized view */}
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
                                    <h3 className="text-finder-accent font-medium truncate">{selectedVideo.title}</h3>
                                    <p className="text-finder-text-secondary text-sm truncate">{selectedVideo.channel}</p>
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
                                <div className="w-full h-full flex flex-col">
                                    <div className="relative w-full h-[calc(100%-200px)]">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                                            className="absolute inset-0 w-full h-full"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            style={{ aspectRatio: '16/9' }}
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h4 className="text-finder-text font-medium text-lg mb-2">{selectedVideo.title}</h4>
                                        <div className="flex items-center text-finder-text-secondary text-sm mb-4">
                                            <span>{selectedVideo.channel}</span>
                                            <span className="mx-2">•</span>
                                            <span>{selectedVideo.views}</span>
                                            <span className="mx-2">•</span>
                                            <span>{selectedVideo.timestamp}</span>
                                        </div>
                                        <p className="text-finder-text">{selectedVideo.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <form onSubmit={handleSearch} className="flex items-center space-x-2 mb-4">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar vídeos..."
                                className="flex-1 px-4 py-2 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-all duration-200"
                            />
                            <button
                                type="submit"
                                className="p-2 text-white hover:bg-gray-700 rounded-lg"
                            >
                                <MagnifyingGlassIcon className="h-5 w-5" />
                            </button>
                        </form>

                        {/* Results Area */}
                        <div className="flex-1 overflow-hidden">
                            {error ? (
                                <div className="flex items-center justify-center text-red-500 h-full">
                                    <p>Erro: {error}</p>
                                </div>
                            ) : isLoading ? (
                                <div className="flex items-center justify-center text-finder-text-secondary h-full">
                                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Pesquisando...
                                </div>
                            ) : searchResults.length > 0 ? (
                                <div className="space-y-4 max-w-2xl mx-auto">
                                    {searchResults.map((video) => (
                                        <button
                                            key={video.id}
                                            onClick={() => handleVideoClick(video)}
                                            className="w-full text-left bg-finder-search rounded-lg hover:bg-finder-hover 
                               transition-colors border border-transparent hover:border-[#FF0000] overflow-hidden"
                                        >
                                            <div className="flex">
                                                <div className="relative w-40 h-24 flex-shrink-0">
                                                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                                                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                                                        {video.duration}
                                                    </div>
                                                </div>
                                                <div className="p-3">
                                                    <h3 className="text-finder-accent font-medium mb-1 line-clamp-2">{video.title}</h3>
                                                    <p className="text-finder-text-secondary text-sm mb-1">{video.channel}</p>
                                                    <div className="flex items-center text-finder-text-secondary text-xs">
                                                        <span>{video.views}</span>
                                                        <span className="mx-1">•</span>
                                                        <span>{video.timestamp}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : searchTerm && !isLoading && !isSearching.current ? (
                                <div className="flex items-center justify-center text-finder-text-secondary h-full">
                                    Nenhum resultado encontrado
                                </div>
                            ) : null}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Youtube; 